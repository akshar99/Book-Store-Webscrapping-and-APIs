Book Store App

This is a full-stack Book Store application built with React (Frontend) and FastAPI (Backend).

Features

📚 View all books from the database

➕ Add new books with name, rating, price, and status

❌ Delete books by name

🔄 Fetch books dynamically from the FastAPI backend

Tech Stack

Frontend:

React.js

Axios (for API requests)

Tailwind CSS (for styling)

ShadCN UI (for UI components)

Backend:

FastAPI

SQLite (or any preferred database)

Getting Started

Prerequisites

Node.js installed

Python 3.9+ installed

Clone the Repository

  git clone https://github.com/yourusername/book-store.git
  cd book-store

Backend Setup (FastAPI)

Create and activate a virtual environment:

python -m venv env
source env/bin/activate  # On Mac/Linux
env\Scripts\activate     # On Windows

Install dependencies:

pip install fastapi uvicorn sqlalchemy sqlite3 pydantic

Run the backend:

uvicorn main:app --reload

The API will be available at http://127.0.0.1:8000.

Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

cd book-store
npm install

Start the React app:

npm start

The frontend will be available at http://localhost:3000.

API Endpoints

GET /books/ - Fetch all books

POST /books/create/ - Add a new book

DELETE /books/{name} - Delete a book by name

Contributing

Pull requests are welcome! If you find any bugs or have feature requests, please open an issue.

License

This project is licensed under the MIT License.

Happy Coding! 🚀
