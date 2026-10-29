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
      "Corn",
      "Cocoyam"
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
      "Garden Egg",
      "Afang Leaves",
      "Carrot",
      "Green Peas",
      "Green Beans"
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
      "Salt",
      "Sunflower Oil",
      "Vegetable Stock",
      "Water"
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
      "African Nutmeg (Ehuru)",
      "Pepper Soup Spice"
    ]
  }
];

// Original home-style adaptations; estimates vary with equipment and ingredients.
export const recipes = [
  {
    "name": "Egusi Soup",
    "description": "A rich, hearty Nigerian soup made with ground melon seeds. Usually served with swallow (eba, fufu, or semolina).",
    "required": [
      "Egusi (Melon Seeds)",
      "Palm Oil",
      "Crayfish",
      "Beef",
      "Spinach / Efo Tete",
      "Onion",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Eba, Semolina, Wheat Swallow, or Pounded Yam",
    "id": "1",
    "art": "soup",
    "label": "Soup & swallow",
    "servings": 4,
    "prepMinutes": 20,
    "cookMinutes": 80,
    "ingredients": [
      {
        "name": "Egusi (Melon Seeds)",
        "quantity": 200,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Palm Oil",
        "quantity": 80,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Crayfish",
        "quantity": 30,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Beef",
        "quantity": 400,
        "unit": "g",
        "preparation": "cut into bite-size pieces"
      },
      {
        "name": "Spinach / Efo Tete",
        "quantity": 150,
        "unit": "g",
        "preparation": "washed and chopped"
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Water",
        "quantity": 1000,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Place the beef, half the onion, half the salt, and three quarters of the measured water in a pot. Cover and simmer for about 40–50 minutes until the beef is tender, topping up with water as needed. Keep the cooking liquid.",
      "Mix the ground egusi with the remaining quarter of the measured water to form a thick paste. Warm palm oil in a second pot over medium-low heat and soften the remaining onion for 3 minutes.",
      "Spoon the egusi paste into the oil. Cook gently for 8–10 minutes, stirring occasionally to break up the lumps without scorching.",
      "Add the beef with its cooking liquid and the crayfish. Simmer for 15 minutes, stirring and adding a little water if the soup is too thick.",
      "Stir in the spinach and remaining salt. Simmer for 3–5 minutes until the leaves are tender and the egusi is fully cooked. Taste before adding more salt."
    ],
    "diet": "omnivore",
    "notes": "A spinach-and-beef version. Egusi soup varies by household and region."
  },
  {
    "name": "Ogbono Soup",
    "description": "A thick, draw soup made from ground ogbono seeds with a distinctive slimy texture. Very popular across Nigeria.",
    "required": [
      "Ogbono Seeds",
      "Palm Oil",
      "Crayfish",
      "Beef",
      "Ugu Leaves (Fluted Pumpkin)",
      "Onion",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Eba, Fufu, or Pounded Yam",
    "id": "2",
    "art": "soup",
    "label": "Soup & swallow",
    "servings": 4,
    "prepMinutes": 15,
    "cookMinutes": 65,
    "ingredients": [
      {
        "name": "Ogbono Seeds",
        "quantity": 120,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Palm Oil",
        "quantity": 60,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Crayfish",
        "quantity": 30,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Beef",
        "quantity": 400,
        "unit": "g",
        "preparation": "cubed"
      },
      {
        "name": "Ugu Leaves (Fluted Pumpkin)",
        "quantity": 100,
        "unit": "g",
        "preparation": "chopped"
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Water",
        "quantity": 1200,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Simmer beef, onion, half the salt, and most of the measured water, covered, for about 40–50 minutes until tender. Retain the broth.",
      "Warm palm oil gently in a small pan, remove from the heat, and stir in ground ogbono until smooth. Do not fry the ogbono at high heat.",
      "Stir the ogbono mixture into the hot beef broth a little at a time. Add crayfish and simmer gently for 10 minutes, stirring frequently.",
      "Add ugu, the remaining salt, and up to the remaining water to adjust the consistency. Simmer for another 3–5 minutes and serve hot."
    ],
    "diet": "omnivore",
    "notes": ""
  },
  {
    "name": "Jollof Rice",
    "description": "The king of Nigerian parties! Rice cooked in a rich tomato-pepper sauce. Always a crowd favourite.",
    "required": [
      "Rice",
      "Tomatoes",
      "Pepper (Tatashe / Ata Rodo)",
      "Onion",
      "Tomato Paste",
      "Sunflower Oil",
      "Vegetable Stock",
      "Curry & Thyme",
      "Bay Leaves",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Fried Plantain (Dodo) and Coleslaw",
    "id": "3",
    "art": "jollof",
    "label": "A party favourite",
    "servings": 4,
    "prepMinutes": 15,
    "cookMinutes": 60,
    "ingredients": [
      {
        "name": "Rice",
        "quantity": 400,
        "unit": "g",
        "preparation": "long-grain parboiled, rinsed"
      },
      {
        "name": "Tomatoes",
        "quantity": 500,
        "unit": "g",
        "preparation": "chopped"
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 2,
        "unit": "piece",
        "preparation": "deseeded for less heat"
      },
      {
        "name": "Onion",
        "quantity": 2,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Tomato Paste",
        "quantity": 70,
        "unit": "g",
        "preparation": ""
      },
      {
        "name": "Sunflower Oil",
        "quantity": 80,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Vegetable Stock",
        "quantity": 750,
        "unit": "ml",
        "preparation": "use a vegan stock for this version"
      },
      {
        "name": "Curry & Thyme",
        "quantity": 2,
        "unit": "tsp",
        "preparation": ""
      },
      {
        "name": "Bay Leaves",
        "quantity": 2,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Blend the tomatoes, peppers, and half the onion until smooth. Slice the remaining onion. Have the measured hot vegetable stock ready.",
      "Heat sunflower oil in a heavy pot. Soften sliced onion for 5 minutes. Add tomato paste and fry, stirring, for 3 minutes.",
      "Add the blended mixture and cook uncovered for 12–15 minutes until reduced. Stir often to prevent burning.",
      "Add rice, curry and thyme, bay leaves, salt, and the hot stock. Stir once and bring to a gentle simmer.",
      "Cover tightly and cook on low for 25–30 minutes until the rice is tender and the liquid absorbed. If still firm, add a splash of hot water and steam longer. Rest off the heat for 5 minutes; remove bay leaves and fluff."
    ],
    "diet": "vegan",
    "notes": "A vegetable-stock version of Nigerian jollof. Rice brands absorb different amounts of liquid; check tenderness before serving."
  },
  {
    "name": "Pepper Soup",
    "description": "A light but deeply spicy broth -- great as a starter or remedy for cold weather. Common at buka joints.",
    "required": [
      "Catfish",
      "Pepper (Tatashe / Ata Rodo)",
      "Crayfish",
      "Onion",
      "Pepper Soup Spice",
      "Scent Leaf (Efirin)",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Agidi (corn pudding) or plain white rice",
    "id": "4",
    "art": "soup",
    "label": "Comfort in a bowl",
    "servings": 4,
    "prepMinutes": 15,
    "cookMinutes": 30,
    "ingredients": [
      {
        "name": "Catfish",
        "quantity": 800,
        "unit": "g",
        "preparation": "cleaned, cut into steaks"
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Crayfish",
        "quantity": 20,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Pepper Soup Spice",
        "quantity": 2,
        "unit": "tsp",
        "preparation": ""
      },
      {
        "name": "Scent Leaf (Efirin)",
        "quantity": 10,
        "unit": "g",
        "preparation": "chopped"
      },
      {
        "name": "Water",
        "quantity": 1500,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Rinse prepared catfish carefully. Put onion, chopped pepper, pepper soup spice, crayfish, salt, and water into a wide pot. Bring to a simmer for 5 minutes.",
      "Lower the catfish pieces into the broth. Cover and simmer gently for about 15–20 minutes. Swirl the pot instead of stirring vigorously so the fish stays intact.",
      "Check the fish reaches 63°C in its thickest part and flakes easily. Add scent leaf and simmer for 2 minutes. Taste and adjust the seasoning before serving."
    ],
    "diet": "omnivore",
    "notes": "This recipe uses catfish. A goat-meat version needs a substantially longer cooking time."
  },
  {
    "name": "Fried Plantain (Dodo)",
    "description": "Sweet ripe plantains sliced and fried until golden and caramelised. A beloved Nigerian side dish.",
    "required": [
      "Plantain",
      "Groundnut Oil",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Jollof Rice, Beans, or Fried Egg",
    "id": "5",
    "art": "plantain",
    "label": "A golden little extra",
    "servings": 4,
    "prepMinutes": 10,
    "cookMinutes": 15,
    "ingredients": [
      {
        "name": "Plantain",
        "quantity": 3,
        "unit": "piece",
        "preparation": "ripe, with yellow-and-black skin"
      },
      {
        "name": "Groundnut Oil",
        "quantity": 250,
        "unit": "ml",
        "preparation": "for shallow frying"
      },
      {
        "name": "Salt",
        "quantity": 0.25,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Peel the ripe plantains and cut diagonally into 1 cm slices. Pat dry and toss with the salt.",
      "Heat the groundnut oil in a deep frying pan over medium heat. Add a single layer of plantain carefully; do not crowd the pan.",
      "Fry for 2–3 minutes on each side until golden and tender. Lift onto a rack or kitchen paper. Repeat with the remaining slices."
    ],
    "diet": "vegan",
    "notes": "Groundnut oil is peanut-derived. Use a suitable alternative oil for a peanut-free adaptation; the allergy filter conservatively excludes this version. Frying oil listed is the amount needed in the pan, not the amount eaten."
  },
  {
    "name": "Moi Moi",
    "description": "Steamed bean pudding made from blended beans mixed with peppers and spices. Nutritious and delicious.",
    "required": [
      "Moi Moi Batter (ground beans)",
      "Pepper (Tatashe / Ata Rodo)",
      "Onion",
      "Sunflower Oil",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Pap (Akamu) or Jollof Rice",
    "id": "6",
    "art": "soup",
    "label": "A steamed favourite",
    "servings": 4,
    "prepMinutes": 20,
    "cookMinutes": 50,
    "ingredients": [
      {
        "name": "Moi Moi Batter (ground beans)",
        "quantity": 500,
        "unit": "g",
        "preparation": "plain, peeled-bean batter"
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 1,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Sunflower Oil",
        "quantity": 60,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Water",
        "quantity": 300,
        "unit": "ml",
        "preparation": "for batter; extra water for the steamer"
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Blend the plain bean batter with pepper, onion, and two thirds of the measured water until very smooth. Stir in oil and salt. Add up to the remaining water for a pourable, thick-cream consistency.",
      "Divide between individual lightly oiled, heat-safe steaming moulds, leaving room for expansion. Cover the moulds with their lids or foil.",
      "Put a rack in a large pot and add water below rack level. Bring to a simmer. Set the moulds on the rack, cover, and steam gently for 40–50 minutes.",
      "Check the steamer regularly and top up with hot water before it dries out. The moi moi should be firm and a skewer inserted into the centre should come out without wet batter. Rest for 5 minutes before unmoulding."
    ],
    "diet": "vegan",
    "notes": "A plain, plant-based version without egg or fish. Use heat-safe food containers; do not steam in ordinary plastic bags."
  },
  {
    "name": "Efo Riro",
    "description": "A Yoruba vegetable soup made with leafy greens in a rich tomato-palm oil base. Very nutritious.",
    "required": [
      "Spinach / Efo Tete",
      "Palm Oil",
      "Tomatoes",
      "Pepper (Tatashe / Ata Rodo)",
      "Onion",
      "Crayfish",
      "Locust Beans (Iru / Dawadawa)",
      "Stockfish",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Eba, Amala, Semolina, or Rice",
    "id": "7",
    "art": "soup",
    "label": "A Yoruba favourite",
    "servings": 4,
    "prepMinutes": 20,
    "cookMinutes": 30,
    "ingredients": [
      {
        "name": "Spinach / Efo Tete",
        "quantity": 600,
        "unit": "g",
        "preparation": "washed"
      },
      {
        "name": "Palm Oil",
        "quantity": 80,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Tomatoes",
        "quantity": 300,
        "unit": "g",
        "preparation": ""
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 2,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Crayfish",
        "quantity": 25,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Locust Beans (Iru / Dawadawa)",
        "quantity": 1,
        "unit": "tbsp",
        "preparation": ""
      },
      {
        "name": "Stockfish",
        "quantity": 150,
        "unit": "g",
        "preparation": "already soaked, deboned, and cooked"
      },
      {
        "name": "Water",
        "quantity": 150,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 0.75,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Blanch spinach in boiling water for 1 minute, drain, cool, squeeze out excess water, and chop. Roughly blend tomatoes, peppers, and half the onion.",
      "Heat palm oil and soften the remaining sliced onion for 3 minutes. Add iru and the blended sauce. Cook for 12–15 minutes until thickened.",
      "Add cooked stockfish, crayfish, salt, and the measured water. Simmer for 5 minutes.",
      "Fold in the drained greens and simmer for 3–5 minutes. Taste and serve. If starting with dried stockfish, allow separate soaking and cooking time before this recipe."
    ],
    "diet": "omnivore",
    "notes": ""
  },
  {
    "name": "Ofe Onugbu (Bitter Leaf Soup)",
    "description": "A classic Igbo soup with washed bitter leaves, cocoyam thickener, and assorted meats.",
    "required": [
      "Bitter Leaf (Onugbu)",
      "Cocoyam",
      "Palm Oil",
      "Crayfish",
      "Stockfish",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Fufu or Pounded Yam",
    "id": "8",
    "art": "soup",
    "label": "An Igbo classic",
    "servings": 4,
    "prepMinutes": 25,
    "cookMinutes": 50,
    "ingredients": [
      {
        "name": "Bitter Leaf (Onugbu)",
        "quantity": 150,
        "unit": "g",
        "preparation": "washed thoroughly to reduce bitterness"
      },
      {
        "name": "Cocoyam",
        "quantity": 300,
        "unit": "g",
        "preparation": "peeled weight"
      },
      {
        "name": "Palm Oil",
        "quantity": 70,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Crayfish",
        "quantity": 25,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Stockfish",
        "quantity": 200,
        "unit": "g",
        "preparation": "soaked, deboned, and cooked"
      },
      {
        "name": "Water",
        "quantity": 1200,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Boil the peeled cocoyam in water until soft, about 15–20 minutes. Drain and pound or mash very smoothly.",
      "Put the prepared stockfish, crayfish, salt, palm oil, and the measured water in a pot. Bring to a simmer for 10 minutes.",
      "Add small spoonfuls of cocoyam paste and simmer, stirring gently, until they dissolve and thicken the soup, about 10 minutes.",
      "Add the well-washed bitter leaves and simmer for another 5–10 minutes. Adjust thickness with hot water and taste before serving."
    ],
    "diet": "omnivore",
    "notes": "Cocoyam is part of this measured version and is included in pantry matching. Prepared stockfish requires prior soaking and cooking."
  },
  {
    "name": "Suya",
    "description": "Spicy grilled meat skewers -- Nigeria's street food icon. The suya spice (yaji) is everything.",
    "required": [
      "Beef",
      "Suya Spice (Yaji)",
      "Sunflower Oil",
      "Onion",
      "Tomatoes"
    ],
    "bonus": [],
    "serve_with": "Sliced onion rings and fresh tomato",
    "id": "9",
    "art": "suya",
    "label": "Straight from the grill",
    "servings": 4,
    "prepMinutes": 20,
    "cookMinutes": 15,
    "ingredients": [
      {
        "name": "Beef",
        "quantity": 600,
        "unit": "g",
        "preparation": "boneless, thinly sliced"
      },
      {
        "name": "Suya Spice (Yaji)",
        "quantity": 4,
        "unit": "tbsp",
        "preparation": ""
      },
      {
        "name": "Sunflower Oil",
        "quantity": 30,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "sliced, to serve"
      },
      {
        "name": "Tomatoes",
        "quantity": 200,
        "unit": "g",
        "preparation": "sliced, to serve"
      }
    ],
    "steps": [
      "If using wooden skewers, soak them in water for 30 minutes before grilling. Pat the beef dry and slice thinly across the grain.",
      "Mix yaji with sunflower oil. Coat the beef, then thread onto skewers without bunching the slices tightly.",
      "Heat a grill or grill pan to medium-high. Grill for about 8–12 minutes, turning several times, until the beef is fully cooked; aim for 71°C in this well-done version.",
      "Rest for 3 minutes and serve with sliced onion and tomato. Use fresh utensils for cooked meat."
    ],
    "diet": "omnivore",
    "notes": "Yaji usually contains ground peanuts. Check the spice mix for salt before adding any extra. Optional marinating and skewer-soaking time is not included in the estimate."
  },
  {
    "name": "Eba (Garri Swallow)",
    "description": "A simple staple made by pouring garri into hot water and stirring until firm. Goes with virtually any soup.",
    "required": [
      "Cassava / Garri",
      "Water"
    ],
    "bonus": [],
    "serve_with": "Any Nigerian soup -- egusi, ogbono, okra, etc.",
    "id": "10",
    "art": "coconut",
    "label": "The perfect companion",
    "servings": 4,
    "prepMinutes": 2,
    "cookMinutes": 8,
    "ingredients": [
      {
        "name": "Cassava / Garri",
        "quantity": 300,
        "unit": "g",
        "preparation": ""
      },
      {
        "name": "Water",
        "quantity": 650,
        "unit": "ml",
        "preparation": ""
      }
    ],
    "steps": [
      "Bring the measured water to a rolling boil in a sturdy pot, then reduce the heat to low.",
      "Gradually sprinkle in the garri while stirring continuously with a wooden spoon. Keep stirring and folding until no dry patches remain.",
      "Cook and turn for 2–3 minutes until smooth and firm. If too stiff, work in a small splash of boiling water. Let stand for 2 minutes and portion with a wet spoon."
    ],
    "diet": "vegan",
    "notes": "The amount of water varies with garri grind and brand. Adjust in small amounts to your preferred texture."
  },
  {
    "name": "Okra Soup",
    "description": "A slimy, flavourful soup made with chopped okra. Can be made plain or combined with egusi or ogbono.",
    "required": [
      "Okra",
      "Palm Oil",
      "Crayfish",
      "Shrimp",
      "Onion",
      "Pepper (Tatashe / Ata Rodo)",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Eba, Fufu, or Semolina",
    "id": "11",
    "art": "soup",
    "label": "Soup & swallow",
    "servings": 4,
    "prepMinutes": 15,
    "cookMinutes": 20,
    "ingredients": [
      {
        "name": "Okra",
        "quantity": 500,
        "unit": "g",
        "preparation": "washed, finely chopped"
      },
      {
        "name": "Palm Oil",
        "quantity": 50,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Crayfish",
        "quantity": 25,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Shrimp",
        "quantity": 300,
        "unit": "g",
        "preparation": "peeled and deveined"
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Water",
        "quantity": 600,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 0.75,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Bring water, onion, pepper, crayfish, and salt to a simmer. Cook for 5 minutes.",
      "Add palm oil and chopped okra. Stir gently and simmer for 5–7 minutes until the okra is tender and draws.",
      "Add the shrimp and simmer for 3–5 minutes until opaque, firm, and cooked through. Avoid overcooking the okra. Taste and serve hot."
    ],
    "diet": "omnivore",
    "notes": ""
  },
  {
    "name": "Yam Porridge (Asaro)",
    "description": "Soft, spicy yam cooked down in a palm oil and tomato stew until it becomes a rich porridge.",
    "required": [
      "Yam",
      "Palm Oil",
      "Tomatoes",
      "Onion",
      "Pepper (Tatashe / Ata Rodo)",
      "Spinach / Efo Tete",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Can be eaten on its own or with fried fish",
    "id": "12",
    "art": "jollof",
    "label": "One-pot comfort",
    "servings": 4,
    "prepMinutes": 15,
    "cookMinutes": 30,
    "ingredients": [
      {
        "name": "Yam",
        "quantity": 1000,
        "unit": "g",
        "preparation": "peeled, cubed"
      },
      {
        "name": "Palm Oil",
        "quantity": 70,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Tomatoes",
        "quantity": 300,
        "unit": "g",
        "preparation": "chopped"
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Spinach / Efo Tete",
        "quantity": 100,
        "unit": "g",
        "preparation": "chopped"
      },
      {
        "name": "Water",
        "quantity": 1000,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Rinse the yam cubes and place in a pot with tomatoes, onion, pepper, palm oil, salt, and the measured water.",
      "Bring to a boil, reduce the heat, cover, and simmer for 20–25 minutes until the yam is easily pierced with a fork. Add a little water if the pot gets dry.",
      "Mash a few yam pieces into the liquid to thicken it. Fold in spinach and simmer for 3–5 minutes, stirring gently. Taste before serving."
    ],
    "diet": "vegan",
    "notes": ""
  },
  {
    "name": "Beans & Plantain (Ewa Agoyin style)",
    "description": "Soft cooked beans served with a spicy palm oil pepper sauce -- a Lagos street food staple.",
    "required": [
      "Beans",
      "Palm Oil",
      "Pepper (Tatashe / Ata Rodo)",
      "Onion",
      "Plantain",
      "Sunflower Oil",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Fried Plantain (Dodo) or Agege bread",
    "id": "13",
    "art": "plantain",
    "label": "A Lagos favourite",
    "servings": 4,
    "prepMinutes": 15,
    "cookMinutes": 90,
    "ingredients": [
      {
        "name": "Beans",
        "quantity": 400,
        "unit": "g",
        "preparation": "dried black-eyed beans, picked and rinsed"
      },
      {
        "name": "Palm Oil",
        "quantity": 100,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Pepper (Tatashe / Ata Rodo)",
        "quantity": 4,
        "unit": "piece",
        "preparation": "use a mild mix if preferred"
      },
      {
        "name": "Onion",
        "quantity": 2,
        "unit": "piece",
        "preparation": ""
      },
      {
        "name": "Plantain",
        "quantity": 2,
        "unit": "piece",
        "preparation": "ripe"
      },
      {
        "name": "Sunflower Oil",
        "quantity": 100,
        "unit": "ml",
        "preparation": "for shallow frying"
      },
      {
        "name": "Water",
        "quantity": 2000,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Place beans in a large pot with the measured water. Bring to a boil, reduce the heat, and simmer until very soft, about 60–90 minutes. Top up with hot water as needed. Add half the salt near the end and mash lightly.",
      "While the beans cook, roughly blend the peppers with half the onion. Slice the remaining onion. Warm palm oil over medium-low heat; do not bleach it or let it smoke.",
      "Slowly fry the sliced onion until golden. Add the pepper mixture and remaining salt. Cook over low heat for 20–30 minutes, stirring often, until reduced and fragrant.",
      "Peel and slice plantains. Fry in sunflower oil for 2–3 minutes per side until golden, then drain. Spoon sauce over the soft beans and serve with plantain."
    ],
    "diet": "vegan",
    "notes": "A home-style Ewa Agoyin-inspired version using fresh peppers. Traditional sauces often use dried peppers. Dried bean age affects cooking time; optional soaking is not included."
  },
  {
    "name": "Coconut Rice",
    "description": "Fragrant rice cooked in coconut milk -- popular in coastal areas of Nigeria. Slightly sweet and aromatic.",
    "required": [
      "Rice",
      "Coconut Milk",
      "Water",
      "Onion",
      "Sunflower Oil",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Fried chicken or peppered fish",
    "id": "14",
    "art": "coconut",
    "label": "Coastal comfort",
    "servings": 4,
    "prepMinutes": 10,
    "cookMinutes": 35,
    "ingredients": [
      {
        "name": "Rice",
        "quantity": 400,
        "unit": "g",
        "preparation": "long-grain, rinsed"
      },
      {
        "name": "Coconut Milk",
        "quantity": 400,
        "unit": "ml",
        "preparation": "unsweetened"
      },
      {
        "name": "Water",
        "quantity": 350,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "finely chopped"
      },
      {
        "name": "Sunflower Oil",
        "quantity": 20,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 0.75,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Heat sunflower oil in a heavy pot. Soften the chopped onion for 3–4 minutes.",
      "Add rinsed rice, coconut milk, water, and salt. Stir once and bring to a gentle simmer.",
      "Cover tightly and cook on low heat for 20–25 minutes until the liquid is absorbed and rice is tender. If needed, add a splash of hot water and cook a little longer.",
      "Take off the heat and rest, covered, for 5 minutes. Fluff gently and serve."
    ],
    "diet": "vegan",
    "notes": "Use unsweetened coconut milk. Cooking liquid may need small adjustments depending on your rice."
  },
  {
    "name": "Afang Soup",
    "description": "A Cross River / Efik delicacy made with afang leaves and waterleaf. Rich and nutrient-dense.",
    "required": [
      "Afang Leaves",
      "Waterleaf",
      "Palm Oil",
      "Crayfish",
      "Stockfish",
      "Dry Fish",
      "Onion",
      "Water",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Fufu, Eba, or Pounded Yam",
    "id": "15",
    "art": "soup",
    "label": "From the South-South",
    "servings": 4,
    "prepMinutes": 25,
    "cookMinutes": 30,
    "ingredients": [
      {
        "name": "Afang Leaves",
        "quantity": 200,
        "unit": "g",
        "preparation": "finely shredded and pounded"
      },
      {
        "name": "Waterleaf",
        "quantity": 400,
        "unit": "g",
        "preparation": "washed and chopped"
      },
      {
        "name": "Palm Oil",
        "quantity": 100,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Crayfish",
        "quantity": 30,
        "unit": "g",
        "preparation": "ground"
      },
      {
        "name": "Stockfish",
        "quantity": 200,
        "unit": "g",
        "preparation": "soaked, deboned, and cooked"
      },
      {
        "name": "Dry Fish",
        "quantity": 150,
        "unit": "g",
        "preparation": "cleaned and deboned"
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Water",
        "quantity": 500,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Salt",
        "quantity": 0.75,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Wash and drain both greens well. Finely shred and pound the afang leaves. Check the fish carefully for bones.",
      "Simmer cooked stockfish, dry fish, onion, crayfish, salt, and the measured water for 10 minutes.",
      "Add palm oil and waterleaf. Simmer for 5 minutes; waterleaf will release more liquid.",
      "Stir in the prepared afang. Cover and simmer for 10–15 minutes until the leaves are tender. Adjust consistency with a little hot water if needed."
    ],
    "diet": "omnivore",
    "notes": "Afang leaves are essential to this version and are now included in the pantry. Prepared stockfish requires prior soaking and cooking."
  },
  {
    "name": "Fried Rice",
    "description": "Nigerian-style fried rice packed with mixed vegetables, liver, and seasoning. A party must-have.",
    "required": [
      "Rice",
      "Sunflower Oil",
      "Onion",
      "Carrot",
      "Green Peas",
      "Green Beans",
      "Curry & Thyme",
      "Vegetable Stock",
      "Salt"
    ],
    "bonus": [],
    "serve_with": "Chicken, Moi Moi, and Coleslaw",
    "id": "16",
    "art": "coconut",
    "label": "A celebration staple",
    "servings": 4,
    "prepMinutes": 20,
    "cookMinutes": 35,
    "ingredients": [
      {
        "name": "Rice",
        "quantity": 400,
        "unit": "g",
        "preparation": "long-grain, rinsed"
      },
      {
        "name": "Sunflower Oil",
        "quantity": 60,
        "unit": "ml",
        "preparation": ""
      },
      {
        "name": "Onion",
        "quantity": 1,
        "unit": "piece",
        "preparation": "chopped"
      },
      {
        "name": "Carrot",
        "quantity": 150,
        "unit": "g",
        "preparation": "diced small"
      },
      {
        "name": "Green Peas",
        "quantity": 100,
        "unit": "g",
        "preparation": ""
      },
      {
        "name": "Green Beans",
        "quantity": 100,
        "unit": "g",
        "preparation": "chopped small"
      },
      {
        "name": "Curry & Thyme",
        "quantity": 2,
        "unit": "tsp",
        "preparation": ""
      },
      {
        "name": "Vegetable Stock",
        "quantity": 750,
        "unit": "ml",
        "preparation": "vegan stock"
      },
      {
        "name": "Salt",
        "quantity": 0.75,
        "unit": "tsp",
        "preparation": ""
      }
    ],
    "steps": [
      "Bring vegetable stock, curry and thyme, and half the salt to a boil. Add rice, cover, and simmer on low for about 20 minutes until just tender. Spread on a clean tray to release steam.",
      "Heat sunflower oil in a large frying pan. Stir-fry onion and carrot for 4 minutes. Add green beans and peas and cook for 3–4 minutes until tender-crisp.",
      "Add the rice in batches and toss over medium-high heat until hot throughout. Season with the remaining salt to taste.",
      "Serve promptly. Cool leftovers quickly in shallow containers, refrigerate within 1 hour where possible, and reheat until steaming hot; do not leave cooked rice at room temperature."
    ],
    "diet": "vegan",
    "notes": "A vegetable-only Nigerian fried rice. Adding liver, chicken, egg, or shrimp changes the dietary and allergen information."
  }
];
