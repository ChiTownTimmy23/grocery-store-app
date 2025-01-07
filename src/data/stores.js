const sortItems = (a, b) => {
  if (a.length !== b.length) {
    return a.length - b.length;
  }
  return a.localeCompare(b);
};

const getSortedItems = (items) => {
  if (Array.isArray(items)) {
    return items.sort(sortItems);
  }
  if (typeof items === 'object') {
    return Object.fromEntries(
      Object.entries(items).map(([season, seasonalItems]) => [
        season,
        getSortedItems(seasonalItems)
      ])
    );
  }
  return items;
};

const applySorting = (store) => {
  if (store.vendors) {
    store.vendors = store.vendors.map(vendor => ({
      ...vendor,
      items: {
        regular: getSortedItems(vendor.items.regular),
        seasonal: getSortedItems(vendor.items.seasonal)
      }
    }));
  } else {
    store.items = {
      regular: getSortedItems(store.items.regular),
      seasonal: getSortedItems(store.items.seasonal)
    };
  }
  return store;
};

const calculateTotalBudget = (vendors) => {
  return vendors.reduce((total, vendor) => total + vendor.budget, 0);
};

export const initialStores = [
    {
        name: "Marietta Square Farmer's Market",
        logo: "https://www.mariettasquarefarmersmarket.com/uploads/8/3/5/5/83557464/farmers-market-logo_1_orig.png",
        get budget() {
          return calculateTotalBudget(this.vendors);
        },
        vendors: [
            {
                name: "Mama J's Produce",
                emoji: "🥬",
                budget: 25,
                items: {
                    regular: ["Arugala", "Spinach", "Red Leaf Lettuce", "Kale"],
                    seasonal: {
                        Spring: [],
                        Summer: [],
                        Fall: [],
                        Winter: ["Kale", "Collard Greens"]
                    }
                }
            },
            {
                name: "Edengate Farm",
                emoji: "🍠",
                budget: 30,
                items: {
                    regular: ["Sweet Potatoes", "Celery", "Carrots"],
                    seasonal: {
                        Spring: ["Cauliflower", "Broccoli"],
                        Summer: ["Peaches"],
                        Fall: ["Apples"],
                        Winter: []
                    }
                }
            },
            {
                name: "Alan Jorgensen",
                emoji: "🥚",
                budget: 20,
                items: {
                    regular: ["Fresh Eggs"],
                    seasonal: {
                        Spring: [],
                        Summer: [],
                        Fall: [],
                        Winter: []
                    }
                }
            },
            {
                name: "Chicken Lady",
                emoji: "🐔",
                budget: 50,
                items: {
                    regular: ["Regular Ground Chicken", "Savory Ground Chicken", "Italian Ground Chicken"],
                    seasonal: {
                        Spring: [],
                        Summer: [],
                        Fall: ["Bone Broth", "Chicken Feet", "Chicken Backs"],
                        Winter: ["Bone Broth", "Chicken Feet", "Chicken Backs"],
                    }
                }
            },
            {
                name: "Pinewood Springs Farm",
                emoji: "🍅",
                budget: 20,
                items: {
                    regular: ["Radishes", "Zucchini", "Squash"],
                    seasonal: {
                        Spring: ["Asparagus", "Spring Onions"],
                        Summer: ["Tomatoes", "Cucumbers"],
                        Fall: [],
                        Winter: ["Kale", "Collard Greens"]
                    }
                }
            },
            {
                name: "Eden Pure Beef",
                emoji: "🥩",
                budget: 50,
                items: {
                    regular: ["Ground Beef", "Fajita Strips"],
                    seasonal: {
                        Spring: [],
                        Summer: [],
                        Fall: [],
                        Winter: []
                    }
                }
            },
            {
                name: "Bela Vita Mushrooms",
                emoji: "🍄",
                budget: 30,
                items: {
                    regular: ["Oyster Mushrooms (1/2 lb)", "Lion's Mane (1/4 lb)"],
                    seasonal: {
                        Spring: [],
                        Summer: [],
                        Fall: [],
                        Winter: []
                    }
                }
            },
            {
                name: "Tuesday Coffee Roasters",
                emoji: "🍞",
                budget: 15,
                items: {
                    regular: ["Sourdough Bread"],
                    seasonal: {
                        Spring: [],
                        Summer: [],
                        Fall: [],
                        Winter: []
                    }
                }
            }
        ]
    },
    {
        name: "Sprouts",
        logo: "https://about.sprouts.com/wp-content/uploads/2022/08/Sprouts_Logo_4C-640x166.png",
        budget: 200,
        items: {
            regular: ["Bean Packets"],
            seasonal: {
                Spring: [],
                Summer: [],
                Fall: [],
                Winter: []
            }
        }
    },
    {
        name: "Walmart",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
        budget: 40,
        items: {
            regular: ["Rice", "Beans"],
            seasonal: {
                Spring: [],
                Summer: ["Canned Corn"],
                Fall: [],
                Winter: []
            }
        }
    },
    {
        name: "Costco",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/1280px-Costco_Wholesale_logo_2010-10-26.svg.png",
        budget: 200,
        items: {
            regular: ["Baby Wipes", "Rao's Pasta Sauce", "Feta Blocks", "Chicken Nuggets", "Egg Whites", "Bitchin' Sauce", "Vital Proteins Collagen", "Rotisserie Chicken", "Egg Bites", "Ground Beef", "Ground Bison", "Bellweather Farmers A2 Yogurt"],
            seasonal: {
                Spring: [],
                Summer: ["Uber Greens Juice", "Blueberries", "Strawberries"],
                Fall: [],
                Winter: ["Clementines"]
            }
        }
    },
    {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Amazon_PNG6.png",
        budget: 250,
        items: {
            regular: ["Organic Produce", "Bulk Foods", "Vitamins"],
            seasonal: {
                Spring: [],
                Summer: [],
                Fall: [],
                Winter: []
            }
        }
    },
    {
        name: "Whole Foods",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Whole_Foods_Market_logo.svg/2560px-Whole_Foods_Market_logo.svg.png",
        budget: 40,
        items: {
            regular: ["White and Red Quinoa Packets"],
            seasonal: {
                Spring: [],
                Summer: [],
                Fall: [],
                Winter: []
            }
        }
    }
].map(applySorting);