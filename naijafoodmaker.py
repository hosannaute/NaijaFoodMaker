# ============================================================
#  NIGERIAN FOOD MAKER
#  Select ingredients by category and discover what you can cook!
# ============================================================

# ---------- DATA ----------

CATEGORIES = {
    "1": {
        "name": "Proteins",
        "ingredients": {
            "A": "Beef",
            "B": "Chicken",
            "C": "Goat Meat",
            "D": "Fish (Titus / Mackerel)",
            "E": "Stockfish",
            "F": "Shrimp",
            "G": "Cow Tripe (Shaki)",
            "H": "Turkey",
            "I": "Catfish",
            "J": "Dry Fish",
        },
    },
    "2": {
        "name": "Grains, Tubers & Starches",
        "ingredients": {
            "A": "Rice",
            "B": "Yam",
            "C": "Cassava / Garri",
            "D": "Semolina",
            "E": "Wheat (Swallow)",
            "F": "Oats / Cornmeal",
            "G": "Plantain",
            "H": "Beans",
            "I": "Moi Moi Batter (ground beans)",
            "J": "Corn",
        },
    },
    "3": {
        "name": "Vegetables & Leaves",
        "ingredients": {
            "A": "Spinach / Efo Tete",
            "B": "Bitter Leaf (Onugbu)",
            "C": "Ugu Leaves (Fluted Pumpkin)",
            "D": "Waterleaf",
            "E": "Scent Leaf (Efirin)",
            "F": "Okra",
            "G": "Tomatoes",
            "H": "Pepper (Tatashe / Ata Rodo)",
            "I": "Onion",
            "J": "Garden Egg",
        },
    },
    "4": {
        "name": "Soups & Sauces Base",
        "ingredients": {
            "A": "Palm Oil",
            "B": "Groundnut Oil",
            "C": "Coconut Milk",
            "D": "Crayfish",
            "E": "Locust Beans (Iru / Dawadawa)",
            "F": "Egusi (Melon Seeds)",
            "G": "Ogbono Seeds",
            "H": "Tomato Paste",
            "I": "Stock Cube (Maggi / Knorr)",
            "J": "Salt & Seasoning",
        },
    },
    "5": {
        "name": "Spices & Extras",
        "ingredients": {
            "A": "Uziza Leaves / Seeds",
            "B": "Ehuru (Calabash Nutmeg)",
            "C": "Garlic",
            "D": "Ginger",
            "E": "Curry & Thyme",
            "F": "Bay Leaves",
            "G": "Suya Spice (Yaji)",
            "H": "Scotch Bonnet Pepper",
            "I": "White Pepper",
            "J": "African Nutmeg (Ehuru)",
        },
    },
}

RECIPES = [
    {
        "name": "Egusi Soup",
        "description": "A rich, hearty Nigerian soup made with ground melon seeds. Usually served with swallow (eba, fufu, or semolina).",
        "required": {"Egusi (Melon Seeds)", "Palm Oil", "Crayfish"},
        "bonus": {"Beef", "Stockfish", "Dry Fish", "Bitter Leaf (Onugbu)", "Ugu Leaves (Fluted Pumpkin)", "Spinach / Efo Tete", "Stock Cube (Maggi / Knorr)"},
        "serve_with": "Eba, Semolina, Wheat Swallow, or Pounded Yam",
    },
    {
        "name": "Ogbono Soup",
        "description": "A thick, draw soup made from ground ogbono seeds with a distinctive slimy texture. Very popular across Nigeria.",
        "required": {"Ogbono Seeds", "Palm Oil", "Crayfish"},
        "bonus": {"Beef", "Goat Meat", "Stockfish", "Dry Fish", "Bitter Leaf (Onugbu)", "Ugu Leaves (Fluted Pumpkin)"},
        "serve_with": "Eba, Fufu, or Pounded Yam",
    },
    {
        "name": "Jollof Rice",
        "description": "The king of Nigerian parties! Rice cooked in a rich tomato-pepper sauce. Always a crowd favourite.",
        "required": {"Rice", "Tomatoes", "Pepper (Tatashe / Ata Rodo)", "Onion", "Tomato Paste"},
        "bonus": {"Chicken", "Turkey", "Beef", "Curry & Thyme", "Stock Cube (Maggi / Knorr)", "Groundnut Oil"},
        "serve_with": "Fried Plantain (Dodo) and Coleslaw",
    },
    {
        "name": "Pepper Soup",
        "description": "A light but deeply spicy broth -- great as a starter or remedy for cold weather. Common at buka joints.",
        "required": {"Pepper (Tatashe / Ata Rodo)", "Crayfish"},
        "bonus": {"Catfish", "Goat Meat", "Chicken", "Cow Tripe (Shaki)", "Uziza Leaves / Seeds", "African Nutmeg (Ehuru)", "Ehuru (Calabash Nutmeg)"},
        "serve_with": "Agidi (corn pudding) or plain white rice",
    },
    {
        "name": "Fried Plantain (Dodo)",
        "description": "Sweet ripe plantains sliced and fried until golden and caramelised. A beloved Nigerian side dish.",
        "required": {"Plantain", "Groundnut Oil"},
        "bonus": {"Salt & Seasoning"},
        "serve_with": "Jollof Rice, Beans, or Fried Egg",
    },
    {
        "name": "Moi Moi",
        "description": "Steamed bean pudding made from blended beans mixed with peppers and spices. Nutritious and delicious.",
        "required": {"Moi Moi Batter (ground beans)", "Pepper (Tatashe / Ata Rodo)", "Onion"},
        "bonus": {"Crayfish", "Fish (Titus / Mackerel)", "Shrimp", "Groundnut Oil", "Salt & Seasoning", "Stock Cube (Maggi / Knorr)"},
        "serve_with": "Pap (Akamu) or Jollof Rice",
    },
    {
        "name": "Efo Riro",
        "description": "A Yoruba vegetable soup made with leafy greens in a rich tomato-palm oil base. Very nutritious.",
        "required": {"Spinach / Efo Tete", "Palm Oil", "Tomatoes", "Pepper (Tatashe / Ata Rodo)"},
        "bonus": {"Beef", "Cow Tripe (Shaki)", "Stockfish", "Crayfish", "Locust Beans (Iru / Dawadawa)", "Onion"},
        "serve_with": "Eba, Amala, Semolina, or Rice",
    },
    {
        "name": "Ofe Onugbu (Bitter Leaf Soup)",
        "description": "A classic Igbo soup with washed bitter leaves, cocoyam thickener, and assorted meats.",
        "required": {"Bitter Leaf (Onugbu)", "Palm Oil", "Crayfish"},
        "bonus": {"Beef", "Goat Meat", "Stockfish", "Dry Fish", "Egusi (Melon Seeds)", "Stock Cube (Maggi / Knorr)"},
        "serve_with": "Fufu or Pounded Yam",
    },
    {
        "name": "Suya",
        "description": "Spicy grilled meat skewers -- Nigeria's street food icon. The suya spice (yaji) is everything.",
        "required": {"Beef", "Suya Spice (Yaji)"},
        "bonus": {"Onion", "Tomatoes", "Garlic", "Ginger"},
        "serve_with": "Sliced onion rings and fresh tomato",
    },
    {
        "name": "Eba (Garri Swallow)",
        "description": "A simple staple made by pouring garri into hot water and stirring until firm. Goes with virtually any soup.",
        "required": {"Cassava / Garri"},
        "bonus": {},
        "serve_with": "Any Nigerian soup -- egusi, ogbono, okra, etc.",
    },
    {
        "name": "Okra Soup",
        "description": "A slimy, flavourful soup made with chopped okra. Can be made plain or combined with egusi or ogbono.",
        "required": {"Okra", "Palm Oil", "Crayfish"},
        "bonus": {"Beef", "Shrimp", "Stockfish", "Dry Fish", "Onion", "Pepper (Tatashe / Ata Rodo)"},
        "serve_with": "Eba, Fufu, or Semolina",
    },
    {
        "name": "Yam Porridge (Asaro)",
        "description": "Soft, spicy yam cooked down in a palm oil and tomato stew until it becomes a rich porridge.",
        "required": {"Yam", "Palm Oil", "Tomatoes"},
        "bonus": {"Stockfish", "Dry Fish", "Spinach / Efo Tete", "Onion", "Pepper (Tatashe / Ata Rodo)", "Crayfish"},
        "serve_with": "Can be eaten on its own or with fried fish",
    },
    {
        "name": "Beans & Plantain (Ewa Agoyin style)",
        "description": "Soft cooked beans served with a spicy palm oil pepper sauce -- a Lagos street food staple.",
        "required": {"Beans", "Palm Oil", "Pepper (Tatashe / Ata Rodo)"},
        "bonus": {"Plantain", "Onion", "Crayfish", "Locust Beans (Iru / Dawadawa)"},
        "serve_with": "Fried Plantain (Dodo) or Agege bread",
    },
    {
        "name": "Coconut Rice",
        "description": "Fragrant rice cooked in coconut milk -- popular in coastal areas of Nigeria. Slightly sweet and aromatic.",
        "required": {"Rice", "Coconut Milk"},
        "bonus": {"Chicken", "Shrimp", "Onion", "Curry & Thyme", "Stock Cube (Maggi / Knorr)"},
        "serve_with": "Fried chicken or peppered fish",
    },
    {
        "name": "Afang Soup",
        "description": "A Cross River / Efik delicacy made with afang leaves and waterleaf. Rich and nutrient-dense.",
        "required": {"Waterleaf", "Palm Oil", "Crayfish"},
        "bonus": {"Beef", "Cow Tripe (Shaki)", "Stockfish", "Dry Fish", "Shrimp", "Locust Beans (Iru / Dawadawa)"},
        "serve_with": "Fufu, Eba, or Pounded Yam",
    },
    {
        "name": "Fried Rice",
        "description": "Nigerian-style fried rice packed with mixed vegetables, liver, and seasoning. A party must-have.",
        "required": {"Rice", "Groundnut Oil", "Onion"},
        "bonus": {"Chicken", "Shrimp", "Curry & Thyme", "Garlic", "Ginger", "Stock Cube (Maggi / Knorr)"},
        "serve_with": "Chicken, Moi Moi, and Coleslaw",
    },
]


# ---------- HELPERS ----------

def print_line(char="=", length=55):
    print(char * length)

def print_header(text):
    print()
    print_line("=")
    print(f"  {text}")
    print_line("=")

def print_subheader(text):
    print()
    print_line("-")
    print(f"  {text}")
    print_line("-")

def pause():
    input("\n  Press ENTER to continue...")

def match_recipes(selected_ingredients):
    matched = []
    for recipe in RECIPES:
        if recipe["required"].issubset(selected_ingredients):
            bonus_present = recipe["bonus"] & selected_ingredients
            matched.append((recipe, bonus_present))
    matched.sort(key=lambda x: len(x[1]), reverse=True)
    return matched


# ---------- MAIN FLOW ----------

def pick_ingredients():
    all_chosen = set()

    print_header("CHOOSE YOUR INGREDIENTS")
    print("""
  You will go through each category one by one.
  In each category, type the LETTERS of the ingredients
  you have (e.g.  A C F  or  ALL  for everything).
  Type SKIP to skip a category.
    """)
    pause()

    for cat_key in sorted(CATEGORIES.keys()):
        cat = CATEGORIES[cat_key]
        print_subheader(f"Category {cat_key} of {len(CATEGORIES)}: {cat['name']}")

        for letter, item in cat["ingredients"].items():
            print(f"    [{letter}]  {item}")

        print()
        while True:
            raw = input("  Your choice (letters / ALL / SKIP): ").strip().upper()

            if raw == "SKIP":
                print("  Skipped.")
                break

            if raw == "ALL":
                chosen_letters = list(cat["ingredients"].keys())
            else:
                chosen_letters = [ch for ch in raw if ch in cat["ingredients"]]
                invalid = [ch for ch in raw.replace(" ", "") if ch not in cat["ingredients"] and ch.isalpha()]
                if invalid:
                    print(f"  Unrecognised: {', '.join(invalid)}. Please try again.")
                    continue

            for letter in chosen_letters:
                all_chosen.add(cat["ingredients"][letter])

            if chosen_letters:
                names = ", ".join(cat["ingredients"][l] for l in chosen_letters)
                print(f"  Added: {names}")
            else:
                print("  (Nothing selected for this category.)")
            break

    return all_chosen


def show_selected(ingredients):
    print_header("YOUR SELECTED INGREDIENTS")
    if not ingredients:
        print("  (none selected)")
    else:
        for i, ing in enumerate(sorted(ingredients), 1):
            print(f"  {i:>2}. {ing}")


def show_results(ingredients):
    matches = match_recipes(ingredients)

    print_header("FOODS YOU CAN MAKE")

    if not matches:
        print("""
  No complete recipe match found with your ingredients.

  Tips:
  - Try adding Palm Oil, Crayfish, or Tomatoes -- they appear
    in many Nigerian recipes.
  - Make sure you selected at least one protein or vegetable.
        """)
        return

    print(f"\n  You can make {len(matches)} dish(es)!\n")

    for idx, (recipe, bonus_present) in enumerate(matches, 1):
        print_line("-")
        print(f"  {idx}. {recipe['name']}")
        print(f"     {recipe['description']}")
        print(f"\n     Key ingredients you have:")
        for req in sorted(recipe["required"]):
            print(f"        - {req}")
        if bonus_present:
            print(f"\n     Bonus ingredients you have ({len(bonus_present)}):")
            for b in sorted(bonus_present):
                print(f"        + {b}")
        print(f"\n     Serve with: {recipe['serve_with']}")

    print_line("=")


def main():
    print_header("WELCOME TO THE NIGERIAN FOOD MAKER")
    print("""
  This app helps you discover Nigerian dishes you can cook
  based on the ingredients you already have at home.

  We have 16 recipes spanning soups, rice dishes, snacks,
  and swallows -- all Nigerian classics!
    """)
    pause()

    while True:
        chosen = pick_ingredients()
        show_selected(chosen)

        print()
        confirm = input("  Are these correct? (Y to continue / R to redo): ").strip().upper()
        if confirm != "Y":
            print("\n  Starting over...\n")
            continue

        show_results(chosen)

        print()
        again = input("  Want to try with different ingredients? (Y / N): ").strip().upper()
        if again != "Y":
            print()
            print_line("=")
            print("  Happy cooking! Enjoy your food!")
            print_line("=")
            print()
            break
        else:
            print("\n  Starting over!\n")


if __name__ == "__main__":
    main()
