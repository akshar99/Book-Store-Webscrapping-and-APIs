import requests
from bs4 import BeautifulSoup
import json
from fastapi import FastAPI

# Step 1: Web Scraping Function
def scrape_quotes():
    url = "http://quotes.toscrape.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    quotes_data = []
    quotes = soup.find_all("div", class_="quote")
    for quote in quotes:
        text = quote.find("span", class_="text").get_text()
        author = quote.find("small", class_="author").get_text()
        quotes_data.append({"text": text, "author": author})
    
    # Save to JSON file
    with open("quotes.json", "w") as f:
        json.dump(quotes_data, f, indent=4)

# Run scraper once before starting API
scrape_quotes()

# Step 2: FastAPI Setup
app = FastAPI()

# Load data
with open("quotes.json", "r") as f:
    quotes = json.load(f)

# API Endpoints
@app.get("/quotes")
def get_quotes():
    return quotes

@app.get("/quotes/{author}")
def get_quotes_by_author(author: str):
    filtered_quotes = [q for q in quotes if q["author"].lower() == author.lower()]
    return filtered_quotes if filtered_quotes else {"message": "No quotes found for this author."}
