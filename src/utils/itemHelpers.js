/**
 * Checks if an item already exists in a store's inventory.
 * @param {Array} stores - The array of all stores.
 * @param {string} storeName - The name of the store to check.
 * @param {string} newItem - The item to check for duplicates.
 * @returns {boolean} True if the item is a duplicate, false otherwise.
 */
export const isDuplicateItem = (stores, storeName, newItem) => {
    const store = stores.find(s => s.name === storeName);
    if (!store) return false;

    // Combine regular and seasonal items for checking
    const allItems = [
        ...store.items.regular,
        ...Object.values(store.items.seasonal).flat()
    ];

    return allItems.some(item => item.toLowerCase() === newItem.toLowerCase());
};