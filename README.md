# CodeLeap Network

A simple social network application where users can sign up, create posts, edit and delete them, and browse through a paginated feed.

This project was built as part of a technical challenge, showcasing a **React frontend** consuming a **Django REST Framework backend**.

---

## ✨ Features

- Sign up with a username (stored locally in the browser).
- Create, edit, and delete posts.
- Paginated feed with newest posts first.
- Responsive design (desktop and mobile).
- Simple modals for editing, deleting, and signing up.

---

## 🛠️ Technologies Used

### Frontend

- **React (Vite)**
- **CSS Modules**
- **Fetch API**

### Backend

- **Django 5**
- **Django REST Framework**
- **SQLite** (default DB, can be swapped)

---

## 📚 API Documentation

The backend uses Django REST Framework’s router.  
Base endpoint: /careers/

### Example Endpoints

- `GET /careers/` → List posts (paginated, supports `limit` and `offset`).
- `POST /careers/` → Create a post.
- `PATCH /careers/{id}/` → Update a post.
- `DELETE /careers/{id}/` → Delete a post.

Example response:

```json
{
  "count": 42,
  "next": "http://localhost:8000/careers/?limit=10&offset=10",
  "previous": null,
  "results": [
    {
      "id": 1,
      "username": "JohnDoe",
      "created_datetime": "2025-09-06T18:26:56.152039Z",
      "title": "My first post",
      "content": "Hello, CodeLeap!"
    }
  ]
}
```

⚙️ Installation

Prerequisites

- Node.js (version 14 or later)
- Python 3.10+
- pip

## Backend Setup (Django API)

1. Clone the repository:

```bash
git clone https://github.com/your-username/codeleap-network.git
cd codeleap/server
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # on Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Start the backend server:

```bash
python manage.py runserver
```

By default, the API will be available at:
👉 http://localhost:8000/careers/

## Frontend Setup (React app)

1. Move into the client folder:

```bash
cd ../client
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the client/ folder:

```bash
VITE_BACKEND_URL=http://localhost:8000/careers/
```

4. Start the frontend:

```bash
npm run dev
```

By default, the app runs at:
👉 http://localhost:3500/
