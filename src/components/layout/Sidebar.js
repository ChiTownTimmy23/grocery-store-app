import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

/**
 * Sidebar component for displaying estimated budget and selecting seasons.
 * @param {Object} props - Component props
 * @param {number} props.estimatedBudget - The estimated budget value
 * @param {string[]} props.seasons - Array of available seasons
 * @param {string} props.currentSeason - The currently selected season
 * @param {Function} props.setCurrentSeason - Function to update the current season
 */
function Sidebar({ estimatedBudget, seasons, currentSeason, setCurrentSeason }) {
  return (
    <Box width="200px" bg="gray.100" p={4} height="100vh">
      <VStack spacing={4} align="stretch">
        <Box borderWidth="1px" borderRadius="lg" p={3} bg="white">
          <Text fontWeight="bold" mb={2}>Estimated Budget</Text>
          <Text fontSize="xl" color="green.500">
            ${estimatedBudget.toFixed(2)}
          </Text>
        </Box>
        <Text fontWeight="bold">Seasons</Text>
        {seasons.map((season) => (
          <Button
            key={season}
            onClick={() => setCurrentSeason(season)}
            colorScheme={currentSeason === season ? "blue" : "gray"}
          >
            {season}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}

export default Sidebar;