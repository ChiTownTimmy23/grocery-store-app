import React, { useState } from 'react';
import { Box, VStack, HStack, Heading, Input, Button, Image, Text, Divider, useToast, useColorModeValue, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Badge, IconButton } from '@chakra-ui/react';
import { FaPrint } from 'react-icons/fa';
import ItemList from './ItemList';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

function StoreCard({ store, addItem, currentSeason, nameColor, handlePrintCard }) {
  const [newItem, setNewItem] = useState('');
  const toast = useToast();
  const fallbackColor = useColorModeValue("gray.700", "gray.200");

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      addItem(store.name, newItem.trim());
      setNewItem('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };

  const renderVendorItems = (vendor) => {
    return (
      <AccordionItem key={vendor.name}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {vendor.emoji} {vendor.name}
            </Box>
            <Badge colorScheme="blue" mr={2}>Budget: {formatCurrency(vendor.budget)}</Badge>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold">Regular Items:</Text>
            <ItemList items={vendor.items.regular} />
            <Text fontWeight="bold">{currentSeason} Items:</Text>
            <ItemList items={vendor.items.seasonal[currentSeason]} />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    );
  };

  const renderRegularStore = () => {
    const regularItems = store.items.regular;
    const seasonalItems = store.items.seasonal[currentSeason];

    return (
      <HStack align="start" spacing={8}>
        <VStack align="start" flex={1}>
          <Text fontWeight="bold">Regular Items:</Text>
          <ItemList items={regularItems} />
        </VStack>
        <VStack align="start" flex={1}>
          <Text fontWeight="bold">{currentSeason} Items:</Text>
          <ItemList items={seasonalItems} />
        </VStack>
      </HStack>
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} shadow="md" bg="white">
      <VStack spacing={4} align="stretch">
        {store.logo && (
          <Image
            src={store.logo}
            alt={`${store.name} logo`}
            maxHeight="100px"
            objectFit="contain"
            marginBottom="2"
          />
        )}
        <HStack justify="space-between" align="center" width="100%" mb={2}>
          <Heading as="h2" size="md" color={nameColor || fallbackColor}>{store.name}</Heading>
          <HStack>
            <Badge colorScheme="green" fontSize="md">Budget: {formatCurrency(store.budget)}</Badge>
            <IconButton
              icon={<FaPrint />}
              aria-label="Print store list"
              onClick={() => handlePrintCard(store)}
              size="sm"
            />
          </HStack>
        </HStack>
        <div>
          {store.vendors && store.vendors.length > 0 ? (
            <Accordion allowMultiple>
              {store.vendors.map(renderVendorItems)}
            </Accordion>
          ) : (
            renderRegularStore()
          )}
        </div>
        <Input
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button colorScheme="blue" onClick={handleAddItem}>Add Item</Button>
      </VStack>
    </Box>
  );
}

export default StoreCard;