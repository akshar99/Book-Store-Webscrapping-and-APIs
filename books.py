from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
import requests

#defining db config
DB_URL = "sqlite:///./test.db"
engine = create_engine(DB_URL)
Base = declarative_base()


#defining db schema table for books
class Books(Base):
    __tablename__="Books"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    rating= Column(String, nullable=False)
    price = Column(String, nullable=False)
    status= Column(String, nullable=False)

Base.metadata.create_all(engine)
sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = sessionlocal()

def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()

#class for creating entry for Update option        
class createBook(BaseModel):
    name: str
    rating: str
    price: str
    status: str
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (simplified for development)
    allow_credentials=True,  # Allow cookies/auth headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

#moving to scrape 
url = "https://books.toscrape.com/"
page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")
names = [n.a.get("title") for n in soup.find_all("h3")]
ratings =[p.get("class")[1] for p in soup.find_all("p", class_="star-rating")]
prices = [p.text.strip() for p in soup.find_all("p", class_="price_color")] 
statuses = [s.text.strip() for s in soup.find_all("p", class_="instock availability")]

session=sessionlocal()
for name, rating, price, status in zip(names, ratings, prices, statuses):
    new_book = Books(name=name, rating=rating, price=price, status=status)
    session.add(new_book)
session.commit()
session.close()

#API to fetch all books
@app.get("/books/")
async def showBooks(db: Session = Depends(get_db)):
    session = sessionlocal()
    books = session.query(Books).all()
    session.close()
    return [{"id": b.id, "name":b.name, "rating":b.rating, "price":b.price, "status":b.status} for b in books]

#API to fetch a book by its name
@app.get("/books/{book_name}")  
async def showBookbyName(book_name: str, db: Session = Depends(get_db)):
    books = db.query(Books).filter(Books.name.ilike(f"%{book_name}")).all()
    if not books:
        raise HTTPException(status_code=400, detail="book not found")
    return books

#API to create a Book
@app.post("/books/create/")
async def createBooks(book_data:createBook, db:Session = Depends(get_db)):
    new_book = Books(name = book_data.name,rating=book_data.rating, price=book_data.price, status=book_data.status )
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return {"message": "Book has been updated", "book":new_book}

#API to update a Book
@app.put("/books/{book_name}")
def updateBooks(book_name:str, book_data:createBook, db:Session = Depends(get_db)):
    book = db.query(Books).filter(Books.name.ilike(book_name)).first()
    if not book:
        return HTTPException(status_code=400, detail="Book does not exist")
    book.name = book_data.name
    book.rating = book_data.rating
    book.price = book_data.price
    book.status = book_data.status
    db.commit()
    db.refresh(book)
    return {"message": "Book updated successfully", "book": book}    

#API to delete a book
@app.delete("/books/{book_name}")
async def deleteBook(book_name:str, db: Session = Depends(get_db)):
    existing_book = db.query(Books).filter(Books.name.ilike(f"%{book_name}")).first()

    if not existing_book:
        raise HTTPException(status_code=400, detail="Book not exist")
    db.delete(existing_book)
    db.commit()
    return {"message":f"{existing_book} has been deleted"}
