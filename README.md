# React Course Management Application

## Context

This React.js application consumes a REST API developed with Laravel to manage courses, mentors, students, categories, and tags. The goal is to provide a smooth and interactive user experience.

## Objectives

- Develop a Single Page Application (SPA) with React.js.
- Consume the V1 API endpoints to display and manipulate data.
- Create interfaces and components to:
  - List and filter courses.
  - Display course details.
  - Allow mentors to create/edit courses.
  - Ensure error handling and optimized loading.

## Learning Objectives

### Skills Acquired

- Mastering the basics of React.js
- Consuming REST APIs
- Basic routing
- Form handling
- Data filtering and display

## Project Structure

src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── courses/
│   │   ├── CourseCard.jsx
│   │   ├── CourseList.jsx
│   │   └── CourseForm.jsx
│   ├── categories/
│   │   ├── CategoryCard.jsx
│   │   └── CategoryList.jsx
│   ├── tags/
│   │   ├── TagCard.jsx
│   │   └── TagList.jsx
│   └── videos/
│       ├── VideoPlayer.jsx
│       └── VideoList.jsx
├── pages/
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Categories.jsx
│   ├── Tags.jsx
│   └── Stats.jsx
├── services/
│   └── api.js
└── App.jsx

Copy

## Component Details

### 1. Common Components

- **Header**: Navigation bar
- **Footer**: Footer section
- **Loader**: Loading animation
- **ErrorMessage**: Displays API errors

### 2. Course Components

- **CourseCard**: Displays a course (title, description)
- **CourseList**: Lists all courses (uses CourseCard)
- **CourseForm**: Form for creating/editing a course

### 3. Category Components

- **CategoryCard**: Displays a category
- **CategoryList**: Lists all categories

### 4. Tag Components

- **TagCard**: Displays a tag
- **TagList**: Lists all tags

## Endpoints to Use

### Courses

- `GET /api/V1/courses` → List of courses
- `GET /api/V1/courses/{id}` → Course details
- `POST /api/V1/courses` → Create a course
- `PUT /api/V1/courses/{id}` → Edit a course
- `DELETE /api/V1/courses/{id}` → Delete a course

### Categories

- `GET /api/V1/categories` → List of categories
- `GET /api/V1/categories/{id}` → Category details

### Tags

- `GET /api/V1/tags` → List of tags
- `GET /api/V1/tags/{id}` → Tag details

### Statistics

- `GET /api/V1/stats/courses` → Course statistics
- `GET /api/V1/stats/categories` → Category statistics
- `GET /api/V1/stats/tags` → Tag statistics

