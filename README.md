# 📚 Library Management API

A RESTful API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing books and borrow operations in a digital library.

---

## 🔧 Features

- CRUD operations for books
- Borrowing books with quantity control
- Automatic availability tracking
- Aggregated borrow summaries
- Schema validation and error handling
- Mongoose instance methods, middleware, and aggregation

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB Atlas or local MongoDB
- npm
  
## Running Locally
```
npm run dev
```
### For production
```
npm run build

npm start

```
# API Endpoints
##  Books

### Create Book
```
POST /api/books
```

### Get All Books

```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

```

### Get Book by ID

```
GET /api/books/:bookId

```

### Update Book

```
PUT /api/books/:bookId

```

### Delete Book

```
DELETE /api/books/:bookId

```
## Borrow

### Borrow a Book

```
POST /api/borrow

```
```
{
  "book": "REPLACE_WITH_BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```

### Borrow Summary

```
GET /api/borrow

```
- Output
```
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]

```

# 👨‍💻 Author
Made with ❤️ by Nissan [API Docs](https://assignment-3-tan-two.vercel.app/api)
