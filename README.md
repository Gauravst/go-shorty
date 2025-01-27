# URL Shortener REST API in Go

![Go](https://img.shields.io/badge/Go-1.23-blue)
![REST API](https://img.shields.io/badge/REST-API-brightgreen)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

A simple REST API for shortening URLs, built with Go (Golang). This project is designed for beginners to learn and practice backend development concepts.

---

## Features

- **CRUD Operations**:
  - Create, read, and delete shortened URLs.
- **HTTP Handling**:
  - Uses Go's `net/http` package to handle HTTP requests and responses.
- **Database Integration**:
  - Stores URLs in a PostgreSQL database.
- **JSON Support**:
  - Uses JSON for request and response payloads.
- **Structured Code**:
  - Follows clean and modular project structure.

---

## Skills Practiced

- Handling HTTP requests and responses in Go.
- Structuring a Go project for scalability and maintainability.
- Working with JSON for data serialization and deserialization.
- Integrating and interacting with a PostgreSQL database in Go.

---

## API Endpoints

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `api/url`             | Create a new shortened URL.   |
| GET    | `api/url/{shortCode}` | Redirect to the original URL. |
| GET    | `api/url`             | Get all shortened URLs.       |
| DELETE | `api/url/{id}`        | Delete a shortened URL by ID. |

---
