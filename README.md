NIGERIAN FOOD MAKER - RECIPE RECOMMENDATION ENGINE

A Python-based CLI application that utilizes set theory and structured data to recommend traditional Nigerian dishes based on a user's available ingredients.

PROJECT OVERVIEW
Developed as a technical showcase for my SIWES engineering portfolio, this application acts as a smart kitchen assistant. Instead of simply listing recipes, it acts as a recommendation engine. By analyzing the ingredients a user currently has across five categories (Proteins, Grains, Vegetables, Soups, and Spices), it mathematically determines which complete meals can be prepared.

KEY FEATURES

Algorithmic Recipe Matching: Uses Python's built-in Set data structures to efficiently calculate missing and matching ingredients (issubset logic) without heavy loop iteration.

Smart Filtering: Ranks recommended dishes based on the number of bonus ingredients the user possesses, prioritizing the richest possible meal.

Robust Input Handling: Gracefully handles invalid user inputs, strips unrecognized characters, and supports batch selection commands like ALL or SKIP to improve user experience.

Modular Design: Clean separation of data (Dictionaries/Sets) from application logic and UI rendering functions.

TECHNICAL STACK

Language: Python 3.x

Core Concepts: Data Structures (Sets, Nested Dictionaries), Modular Programming, Command-Line Interface (CLI) Design, Input Sanitization.

Dependencies: None (Uses standard Python libraries).

INSTALLATION AND USAGE

Clone the Repository
git clone https://github.com/yourusername/naija-food-maker.git
cd naija-food-maker

Run the Application
python food_maker.py

How to Use:

The app will guide you through 5 ingredient categories.

Type the letter corresponding to the ingredients you have (e.g., A C F).

Use ALL to select everything in a category, or SKIP to bypass it.

The engine will calculate and display every full recipe you can cook!

CODE ARCHITECTURE HIGHLIGHTS
The core of the recommendation engine relies on efficient set operations rather than brute-force list comparisons:

if recipe["required"].issubset(selected_ingredients):
bonus_present = recipe["bonus"] & selected_ingredients

This demonstrates an understanding of Big-O efficiency and the practical application of data structures in solving real-world logical problems.

Status: SIWES Portfolio Project (2026)
