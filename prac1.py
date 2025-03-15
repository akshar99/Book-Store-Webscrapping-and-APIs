import requests
from fastapi import FastAPI, Depends ,HTTPException
from bs4 import BeautifulSoup
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class Quotes(Base):
    __tablename__ = "quotes"
    id = Column(Integer, primary_key=True)
    author = Column(String, nullable=False)
    quote = Column(String, nullable=False)
    #tags = Column(String)

Base.metadata.create_all(engine)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = sessionLocal()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

class QuoteCreate(BaseModel):
    author: str
    quote: str


url = "https://quotes.toscrape.com/"
page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")
results = soup.find_all("span", class_="text")
text_quotes = [result.text for result in results]
Authors = soup.find_all("small", class_="author")
authors = [author.text for author in Authors]
tags = [t.text for t in soup.find_all("meta", class_="keywords")]
app = FastAPI()

for author, quotes in zip(authors, text_quotes):
    new_quote = Quotes(author=author, quote=quotes)
    db.add(new_quote)
db.commit()


@app.get("/quotes/")
async def showQuotes():
    session = sessionLocal()
    quotes = session.query(Quotes).all()
    session.close()
    return [{"id":q.id, "author":q.author, "quote":q.quote} for q in quotes]

    
@app.get("/quotes/{author_name}")
async def showAuthors(author_name:str):
    session = sessionLocal()
    quotes = session.query(Quotes).filter(Quotes.author==author_name).all()
    session.close()
    return [{"id":q.id, "author":q.author, "quote":q.quote} for q in quotes]

@app.post("/quotes/")
async def updateQuotes(quote_data: QuoteCreate, db: Session=Depends(get_db)):
    new_quote = Quotes(quote = quote_data.quote, author=quote_data.author)
    db.add(new_quote)
    db.commit()
    db.refresh(new_quote)
    
    return {"message": "Quote added successfully", "quote":new_quote}
