import React from 'react';
import { UnorderedList, ListItem, Text } from '@chakra-ui/react';

/**
 * ItemList component for displaying a list of items.
 * @param {Object} props - Component props
 * @param {string[]} props.items - Array of items to display
 */
function ItemList({ items }) {
  // Display a message if there are no items
  if (items.length === 0) {
    return <Text color="gray.500" fontSize="sm" fontStyle="italic">No items to display</Text>;
  }

  return (
    <UnorderedList>
      {items.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </UnorderedList>
  );
}

export default ItemList;