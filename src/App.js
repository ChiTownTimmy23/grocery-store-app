import React, { useState, useRef } from 'react';
import { Box, Flex, SimpleGrid, useToast, useColorModeValue, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import StoreCard from './components/store/StoreCard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { seasons } from './constants/seasons';
import { initialStores } from './data/stores';
import { isDuplicateItem } from './utils/itemHelpers';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const [stores, setStores] = useState(initialStores);
  const [currentSeason, setCurrentSeason] = useState('Spring');
  const [estimatedBudget, setEstimatedBudget] = useState(1000);
  const [currentCardToPrint, setCurrentCardToPrint] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const toast = useToast();
  const allCardsRef = useRef();

  const storeColors = [
    useColorModeValue('blue.600', 'blue.300'),
    useColorModeValue('blue.600', 'blue.300'),
    useColorModeValue('blue.600', 'blue.300'),
    useColorModeValue('blue.600', 'blue.300'),
    useColorModeValue('blue.600', 'blue.300'),
  ];

  const addItem = (storeName, item) => {
    setStores(stores.map(store => {
      if (store.name !== storeName) return store;

      if (isDuplicateItem(store, item)) {
        toast({
          title: "Duplicate item",
          description: `${item} is already in the list for ${storeName}`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return store;
      }

      try {
        if (store.vendors) {
          const updatedVendors = [...store.vendors];
          updatedVendors[0].items.regular.push(item);
          return { ...store, vendors: updatedVendors };
        } else {
          return {
            ...store,
            items: {
              ...store.items,
              regular: [...(store.items?.regular || []), item]
            }
          };
        }
      } catch (error) {
        console.error('Error adding item:', error);
        toast({
          title: "Error",
          description: `Failed to add ${item} to ${storeName}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return store;
      }
    }));

    toast({
      title: "Item added",
      description: `${item} has been added to ${storeName}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePrint = useReactToPrint({
    content: () => currentCardToPrint ? currentCardToPrint.ref.current : allCardsRef.current,
    onAfterPrint: () => {
      setIsPrintModalOpen(false);
      setCurrentCardToPrint(null);
    },
  });

  const handlePrintCard = (store) => {
    if (store) {
      console.log('Printing store:', store);
      setCurrentCardToPrint({ store: store });
      setIsPrintModalOpen(true);
    } else {
      console.error('Invalid store');
      toast({
        title: "Error",
        description: "Unable to print card due to missing data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const PrintableCard = React.forwardRef(({ store, currentSeason }, ref) => (
    <Box ref={ref} p={5} border="1px solid" borderColor="gray.200" borderRadius="md" m={2}>
      <Heading size="md">{store?.name || 'Store'}</Heading>
      <Text mt={2}>Season: {currentSeason || 'Unknown'}</Text>
      {store.vendors ? (
        store.vendors.map((vendor, vendorIndex) => (
          <Box key={vendorIndex} mt={4}>
            <Heading size="sm">{vendor.name}</Heading>
            <Text mt={2}>Regular Items:</Text>
            <UnorderedList>
              {vendor.items?.regular?.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              )) || <ListItem>No regular items</ListItem>}
            </UnorderedList>
            <Text mt={2}>Seasonal Items:</Text>
            <UnorderedList>
              {vendor.items?.seasonal?.[currentSeason?.toLowerCase()]?.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              )) || <ListItem>No seasonal items</ListItem>}
            </UnorderedList>
          </Box>
        ))
      ) : (
        <>
          <Text mt={2}>Regular Items:</Text>
          <UnorderedList>
            {store?.items?.regular?.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            )) || <ListItem>No regular items</ListItem>}
          </UnorderedList>
          <Text mt={2}>Seasonal Items:</Text>
          <UnorderedList>
            {store?.items?.seasonal?.[currentSeason?.toLowerCase()]?.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            )) || <ListItem>No seasonal items</ListItem>}
          </UnorderedList>
        </>
      )}
    </Box>
  ));

  const ErrorFallback = ({ error }) => (
    <Box role="alert" p={4} bg="red.100" color="red.800" borderRadius="md">
      <Heading size="md" mb={2}>Something went wrong:</Heading>
      <Text>{error.message}</Text>
    </Box>
  );

  return (
    <Box>
      <style>
        {`
          @media print {
            @page { size: auto; margin: 20mm; }
            body { margin: 0; padding: 0; }
            .chakra-modal__content-container { display: none; }
            #printable-content { display: block !important; }
          }
        `}
      </style>
      <Navbar />
      <Flex>
        <Sidebar 
          seasons={seasons} 
          currentSeason={currentSeason} 
          setCurrentSeason={setCurrentSeason}
          estimatedBudget={estimatedBudget}
        >
          <Button
            leftIcon={<FaPrint />}
            onClick={() => {
              setCurrentCardToPrint(null);
              setIsPrintModalOpen(true);
            }}
            size="md"
            mt={4}
          >
            Print All Cards
          </Button>
        </Sidebar>
        <Box flex={1} p={5} id="printable-content">
          <Box ref={allCardsRef}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {stores.map((store, index) => (
                <StoreCard
                  key={store.name}
                  store={store}
                  addItem={addItem}
                  currentSeason={currentSeason}
                  nameColor={storeColors[index % storeColors.length]}
                  handlePrintCard={handlePrintCard}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {currentCardToPrint?.store ? (
                <PrintableCard ref={currentCardToPrint.ref} store={currentCardToPrint.store} currentSeason={currentSeason} />
              ) : (
                <Box ref={allCardsRef}>
                  {stores.map((store, index) => (
                    <PrintableCard key={store.name} store={store} currentSeason={currentSeason} />
                  ))}
                </Box>
              )}
            </ErrorBoundary>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;