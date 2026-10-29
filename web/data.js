export const categories = [
  {
    "id": "1",
    "name": "Proteins",
    "ingredients": [
      "Beef",
      "Chicken",
      "Goat Meat",
      "Fish (Titus / Mackerel)",
      "Stockfish",
      "Shrimp",
      "Cow Tripe (Shaki)",
      "Turkey",
      "Catfish",
      "Dry Fish"
    ]
  },
  {
    "id": "2",
    "name": "Grains, Tubers & Starches",
    "ingredients": [
      "Rice",
      "Yam",
      "Cassava / Garri",
      "Semolina",
      "Wheat (Swallow)",
      "Oats / Cornmeal",
      "Plantain",
      "Beans",
      "Moi Moi Batter (ground beans)",
      "Corn"
    ]
  },
  {
    "id": "3",
    "name": "Vegetables & Leaves",
    "ingredients": [
      "Spinach / Efo Tete",
      "Bitter Leaf (Onugbu)",
      "Ugu Leaves (Fluted Pumpkin)",
      "Waterleaf",
      "Scent Leaf (Efirin)",
      "Okra",
      "Tomatoes",
      "Pepper (Tatashe / Ata Rodo)",
      "Onion",
      "Garden Egg"
    ]
  },
  {
    "id": "4",
    "name": "Soups & Sauces Base",
    "ingredients": [
      "Palm Oil",
      "Groundnut Oil",
      "Coconut Milk",
      "Crayfish",
      "Locust Beans (Iru / Dawadawa)",
      "Egusi (Melon Seeds)",
      "Ogbono Seeds",
      "Tomato Paste",
      "Stock Cube (Maggi / Knorr)",
      "Salt & Seasoning"
    ]
  },
  {
    "id": "5",
    "name": "Spices & Extras",
    "ingredients": [
      "Uziza Leaves / Seeds",
      "Ehuru (Calabash Nutmeg)",
      "Garlic",
      "Ginger",
      "Curry & Thyme",
      "Bay Leaves",
      "Suya Spice (Yaji)",
      "Scotch Bonnet Pepper",
      "White Pepper",
      "African Nutmeg (Ehuru)"
    ]
  }
];
export const recipes = [
  {
    "name": "Egusi Soup",
    "description": "A rich, hearty Nigerian soup made with ground melon seeds. Usually served with swallow (eba, fufu, or semolina).",
    "required": [
      "Crayfish",
      "Egusi (Melon Seeds)",
      "Palm Oil"
    ],
    "bonus": [
      "Beef",
      "Bitter Leaf (Onugbu)",
      "Dry Fish",
      "Spinach / Efo Tete",
      "Stock Cube (Maggi / Knorr)",
      "Stockfish",
      "Ugu Leaves (Fluted Pumpkin)"
    ],
    "serve_with": "Eba, Semolina, Wheat Swallow, or Pounded Yam",
    "id": "1"
  },
  {
    "name": "Ogbono Soup",
    "description": "A thick, draw soup made from ground ogbono seeds with a distinctive slimy texture. Very popular across Nigeria.",
    "required": [
      "Crayfish",
      "Ogbono Seeds",
      "Palm Oil"
    ],
    "bonus": [
      "Beef",
      "Bitter Leaf (Onugbu)",
      "Dry Fish",
      "Goat Meat",
      "Stockfish",
      "Ugu Leaves (Fluted Pumpkin)"
    ],
    "serve_with": "Eba, Fufu, or Pounded Yam",
    "id": "2"
  },
  {
    "name": "Jollof Rice",
    "description": "The king of Nigerian parties! Rice cooked in a rich tomato-pepper sauce. Always a crowd favourite.",
    "required": [
      "Onion",
      "Pepper (Tatashe / Ata Rodo)",
      "Rice",
      "Tomato Paste",
      "Tomatoes"
    ],
    "bonus": [
      "Beef",
      "Chicken",
      "Curry & Thyme",
      "Groundnut Oil",
      "Stock Cube (Maggi / Knorr)",
      "Turkey"
    ],
    "serve_with": "Fried Plantain (Dodo) and Coleslaw",
    "id": "3"
  },
  {
    "name": "Pepper Soup",
    "description": "A light but deeply spicy broth -- great as a starter or remedy for cold weather. Common at buka joints.",
    "required": [
      "Crayfish",
      "Pepper (Tatashe / Ata Rodo)"
    ],
    "bonus": [
      "African Nutmeg (Ehuru)",
      "Catfish",
      "Chicken",
      "Cow Tripe (Shaki)",
      "Ehuru (Calabash Nutmeg)",
      "Goat Meat",
      "Uziza Leaves / Seeds"
    ],
    "serve_with": "Agidi (corn pudding) or plain white rice",
    "id": "4"
  },
  {
    "name": "Fried Plantain (Dodo)",
    "description": "Sweet ripe plantains sliced and fried until golden and caramelised. A beloved Nigerian side dish.",
    "required": [
      "Groundnut Oil",
      "Plantain"
    ],
    "bonus": [
      "Salt & Seasoning"
    ],
    "serve_with": "Jollof Rice, Beans, or Fried Egg",
    "id": "5"
  },
  {
    "name": "Moi Moi",
    "description": "Steamed bean pudding made from blended beans mixed with peppers and spices. Nutritious and delicious.",
    "required": [
      "Moi Moi Batter (ground beans)",
      "Onion",
      "Pepper (Tatashe / Ata Rodo)"
    ],
    "bonus": [
      "Crayfish",
      "Fish (Titus / Mackerel)",
      "Groundnut Oil",
      "Salt & Seasoning",
      "Shrimp",
      "Stock Cube (Maggi / Knorr)"
    ],
    "serve_with": "Pap (Akamu) or Jollof Rice",
    "id": "6"
  },
  {
    "name": "Efo Riro",
    "description": "A Yoruba vegetable soup made with leafy greens in a rich tomato-palm oil base. Very nutritious.",
    "required": [
      "Palm Oil",
      "Pepper (Tatashe / Ata Rodo)",
      "Spinach / Efo Tete",
      "Tomatoes"
    ],
    "bonus": [
      "Beef",
      "Cow Tripe (Shaki)",
      "Crayfish",
      "Locust Beans (Iru / Dawadawa)",
      "Onion",
      "Stockfish"
    ],
    "serve_with": "Eba, Amala, Semolina, or Rice",
    "id": "7"
  },
  {
    "name": "Ofe Onugbu (Bitter Leaf Soup)",
    "description": "A classic Igbo soup with washed bitter leaves, cocoyam thickener, and assorted meats.",
    "required": [
      "Bitter Leaf (Onugbu)",
      "Crayfish",
      "Palm Oil"
    ],
    "bonus": [
      "Beef",
      "Dry Fish",
      "Egusi (Melon Seeds)",
      "Goat Meat",
      "Stock Cube (Maggi / Knorr)",
      "Stockfish"
    ],
    "serve_with": "Fufu or Pounded Yam",
    "id": "8"
  },
  {
    "name": "Suya",
    "description": "Spicy grilled meat skewers -- Nigeria's street food icon. The suya spice (yaji) is everything.",
    "required": [
      "Beef",
      "Suya Spice (Yaji)"
    ],
    "bonus": [
      "Garlic",
      "Ginger",
      "Onion",
      "Tomatoes"
    ],
    "serve_with": "Sliced onion rings and fresh tomato",
    "id": "9"
  },
  {
    "name": "Eba (Garri Swallow)",
    "description": "A simple staple made by pouring garri into hot water and stirring until firm. Goes with virtually any soup.",
    "required": [
      "Cassava / Garri"
    ],
    "bonus": [],
    "serve_with": "Any Nigerian soup -- egusi, ogbono, okra, etc.",
    "id": "10"
  },
  {
    "name": "Okra Soup",
    "description": "A slimy, flavourful soup made with chopped okra. Can be made plain or combined with egusi or ogbono.",
    "required": [
      "Crayfish",
      "Okra",
      "Palm Oil"
    ],
    "bonus": [
      "Beef",
      "Dry Fish",
      "Onion",
      "Pepper (Tatashe / Ata Rodo)",
      "Shrimp",
      "Stockfish"
    ],
    "serve_with": "Eba, Fufu, or Semolina",
    "id": "11"
  },
  {
    "name": "Yam Porridge (Asaro)",
    "description": "Soft, spicy yam cooked down in a palm oil and tomato stew until it becomes a rich porridge.",
    "required": [
      "Palm Oil",
      "Tomatoes",
      "Yam"
    ],
    "bonus": [
      "Crayfish",
      "Dry Fish",
      "Onion",
      "Pepper (Tatashe / Ata Rodo)",
      "Spinach / Efo Tete",
      "Stockfish"
    ],
    "serve_with": "Can be eaten on its own or with fried fish",
    "id": "12"
  },
  {
    "name": "Beans & Plantain (Ewa Agoyin style)",
    "description": "Soft cooked beans served with a spicy palm oil pepper sauce -- a Lagos street food staple.",
    "required": [
      "Beans",
      "Palm Oil",
      "Pepper (Tatashe / Ata Rodo)"
    ],
    "bonus": [
      "Crayfish",
      "Locust Beans (Iru / Dawadawa)",
      "Onion",
      "Plantain"
    ],
    "serve_with": "Fried Plantain (Dodo) or Agege bread",
    "id": "13"
  },
  {
    "name": "Coconut Rice",
    "description": "Fragrant rice cooked in coconut milk -- popular in coastal areas of Nigeria. Slightly sweet and aromatic.",
    "required": [
      "Coconut Milk",
      "Rice"
    ],
    "bonus": [
      "Chicken",
      "Curry & Thyme",
      "Onion",
      "Shrimp",
      "Stock Cube (Maggi / Knorr)"
    ],
    "serve_with": "Fried chicken or peppered fish",
    "id": "14"
  },
  {
    "name": "Afang Soup",
    "description": "A Cross River / Efik delicacy made with afang leaves and waterleaf. Rich and nutrient-dense.",
    "required": [
      "Crayfish",
      "Palm Oil",
      "Waterleaf"
    ],
    "bonus": [
      "Beef",
      "Cow Tripe (Shaki)",
      "Dry Fish",
      "Locust Beans (Iru / Dawadawa)",
      "Shrimp",
      "Stockfish"
    ],
    "serve_with": "Fufu, Eba, or Pounded Yam",
    "id": "15"
  },
  {
    "name": "Fried Rice",
    "description": "Nigerian-style fried rice packed with mixed vegetables, liver, and seasoning. A party must-have.",
    "required": [
      "Groundnut Oil",
      "Onion",
      "Rice"
    ],
    "bonus": [
      "Chicken",
      "Curry & Thyme",
      "Garlic",
      "Ginger",
      "Shrimp",
      "Stock Cube (Maggi / Knorr)"
    ],
    "serve_with": "Chicken, Moi Moi, and Coleslaw",
    "id": "16"
  }
];
