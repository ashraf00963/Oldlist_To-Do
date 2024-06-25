# To-Do List Application

## Project Description
**list-todo.com** is a comprehensive web application designed to help users organize their daily tasks or break down large projects into manageable steps with detailed notes for each task. This application emphasizes user-friendly design and smooth interactions, ensuring a seamless experience for task management.

## Features
- **Secure Authentication:** Robust user authentication to ensure each user has access to their personal lists and tasks.
- **List Management:** Create, update, and delete task lists effortlessly.
- **Task Management:** Add, edit, delete, and categorize tasks into different statuses (To-Do, In Progress, Completed).
- **Drag-and-Drop Functionality:** Smooth drag-and-drop movement for tasks between categories.
- **Responsive Design:** Optimized for both desktop and mobile views, ensuring accessibility on any device.
- **Popups:** User-friendly popups for various actions like creating tasks, lists, and managing user authentication.
- **Real-Time Updates:** Immediate feedback and updates without needing to refresh the page.

## Tech Stack
- **Frontend:** React, Vite
- **Backend:** PHP, MySQL
- **Others:** CUID for unique IDs, CSS for styling, Video background

## Live Site
Visit the live application at [list-todo.com](https://list-todo.com)

## Usage
- **Register and Log In:** Create a new account or log in with existing credentials.
- **Dashboard:** Manage your task lists, create new ones, and delete old ones.
- **Task Management:** Within each list, create, edit, delete, and move tasks across different statuses.

## API Endpoints
- `POST /register.php`: Register a new user
- `POST /login.php`: User login
- `GET /getLists.php`: Fetch user lists
- `POST /addList.php`: Add a new list
- `POST /deleteList.php`: Delete a list
- `GET /getList.php`: Fetch tasks for a specific list
- `POST /addTask.php`: Add a new task
- `DELETE /deleteTask.php`: Delete a task
- `PUT /updateTask.php`: Update a task

## Thought Process

### 1. Authentication
The project started with setting up secure authentication to ensure that every user has their own lists and tasks. A mock server was created using Express.js and JSON with register and login endpoints. Components for login and registration were implemented, ensuring a smooth user experience. Successful registration triggers an automatic opening of the login popup after two seconds, while successful login stores the userId in local storage.

### 2. Introduction Page
A welcoming introduction page was designed to introduce visitors to the website's purpose and functionalities, featuring a login button for easy access.

### 3. Dashboard
The dashboard fetches all lists from the server using the userId, maps through them, and displays the list names. The fetched lists are stored in an array to minimize server calls. Hovering over a list reveals a garbage bin icon for deletion, and clicking on a list navigates to the detailed view of that list.

### 4. To-Do List
The detailed view of a list displays the list name and three categorized lists: Tasks, In Progress, and Completed. It fetches tasks using the userId and saves them locally to reduce server calls. Users can create, delete, and update tasks within this view, with all necessary data and functions passed to the categorized lists.

### 5. Three Lists
Each categorized list (Tasks, In Progress, Completed) handles specific tasks, allowing users to create new tasks and move them between categories using smooth drag-and-drop functionality.

### 6. Task
Each task displays its name and notes and is draggable between the categorized lists. Clicking on a task opens a popup showing detailed information.

### 7. Popups
Various user-friendly popups enhance the experience, including popups for creating new tasks or lists, and for managing user authentication (login, register). Task details are also displayed in popups for easy viewing and editing.

## Future Improvements
- **Attachments:** Allow users to add attachments (PDF, Word documents, photos) to tasks.
- **Responsive Design Enhancements:** Implement different designs for smaller screen sizes, such as a "lite" version of the website.
- **Advanced Filtering:** Introduce advanced filtering and sorting options for tasks.

## Contributing
Currently, contributions are managed by a single developer. If you have suggestions or find issues, please feel free to contact me.

## License
This project is licensed for viewing the code only. Usage beyond viewing is restricted.

## Contact Information
- **Email:** [attallahashraf@gmail.com](mailto:attallahashraf@gmail.com)
- **LinkedIn:** [Ashraf Attallah](https://www.linkedin.com/in/ashraf-attallah-a36330219)

