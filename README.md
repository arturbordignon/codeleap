# CodeLeap Test

A simple social network application where users can sign up, create posts, edit and delete them, and browse through a paginated feed.

This project was built as part of a technical challenge, showcasing a **React frontend** consuming a **Django REST Framework backend**.

Take a look at the Project:
[https://codeleap-backend-xkpe.onrender.com](https://codeleap-backend-xkpe.onrender.com)

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

- **Django 5 + Django REST Framework**
- **Pagination: LimitOffsetPagination (10 per page by default)**
- **CORS via django-cors-headers**
- **SQLite locally / PostgreSQL in production (Render)**

---

## 📚 API Documentation

Base path: /careers/ (note the trailing slash is required by DRF)

### Endpoints

- `GET /careers/` → List posts (supports ?limit=10&offset=0).
- `POST /careers/` → Create { username, title, content }.
- `PATCH /careers/{id}/` → Update { title, content }
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
- Python 3.11+
- pip

## Backend Setup (Django API)

1. Clone the repository:

```bash
git clone https://github.com/arturbordignon/codeleap.git
cd codeleap/api
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate   # on Windows: venv\Scripts\activate
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

All the .env Configs have conditions (this is not a good practice, but for this example I made it), so you won't get any problem running locally, but if you want to deploy, add this:
```bash
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=(False for Production, True for Local)

# Example for PostgreSQL (Render provides DATABASE_URL automatically):
# DATABASE_URL=postgresql://user:password@host:5432/dbname
FRONTEND_ORIGIN=http://localhost:3500 (Or Production URL of the Frontend)
```


## Frontend Setup (React app)

1. Move into the client folder:

```bash
cd ../client (if you are at /api)
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

The Production URL's are:

Backend:

```bash
https://codeleap-v15c.onrender.com/careers/
```

Frontend:

```bash
https://codeleap-backend-xkpe.onrender.com
```
