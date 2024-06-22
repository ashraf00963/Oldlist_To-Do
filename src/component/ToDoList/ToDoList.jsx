import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { TasksList, InProgressList, CompletedList, GarbageBin, CustomDragLayer} from './Circle';
import './ToDoList.css';

function ToDoList() {
    const { listId } = useParams();
    const [tasks, setTasks] = useState({ tasks: [], inProgress: [], completed: [] });
    const [listName, setListName] = useState('');
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');
    const URL = 'https://list-todo.com';

    const isDragging = CustomDragLayer();

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await axios.get(`${URL}/getList.php`, { userId, listId });
                const { name, tasks } = response.data;
                const taskCategorized = {
                    tasks: tasks.filter((task) => task.status === 'tasks'),
                    inProgress: tasks.filter((task) => task.status === 'inProgress'),
                    completed: tasks.filter((task) => task.status === 'completed')
                };
                setTasks(taskCategorized);
                setListName(name);
                setError(null);
            } catch (error) {
                setError(error.response?.data || 'Failed to fetch tasks from server');
            }
        };

        getList();
    }, [userId, listId, URL]);

    const handleAddTask = async (newTask) => {
        if (!newTask.name) {
            setError('Task cannot be empty');
            return;
        }

        try {
            const task = { id: uuidv4(), ...newTask, status: 'tasks' };
            const response = await axios.post(`${URL}/users/${userId}/lists/${listId}/tasks`, task);
            setTasks((prevTasks) => ({
                ...prevTasks,
                tasks: [...prevTasks.tasks, response.data]
            }));
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to add task');
        }
    };

    const handleDeleteTask = async (taskId, status) => {
        console.log('Deleting task ID:', taskId);
        try {
            await axios.delete(`${URL}/users/${userId}/lists/${listId}/tasks/${taskId}`);
            setTasks((prevTasks) => ({
                ...prevTasks,
                [status]: prevTasks[status].filter((task) => task.id !== taskId)
            }));
            setError(null);
        } catch (error) {
            console.error('Delete error:', error);
            setError(error.response?.data || 'Failed to delete task');
        }
    };

    const moveTask = async (taskId, sourceStatus, targetStatus) => {
        const taskToMove = tasks[sourceStatus].find(task => task.id === taskId);
        const updatedTask = { ...taskToMove, status: targetStatus };

        try {
            await axios.put(`${URL}/users/${userId}/lists/${listId}/tasks/${taskId}`, updatedTask);

            setTasks((prevTasks) => {
                const newState = { ...prevTasks };
                newState[sourceStatus] = newState[sourceStatus].filter(task => task.id !== taskId);
                newState[targetStatus] = [...newState[targetStatus], updatedTask];
                return newState;
            });
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to update task status');
        }
    };

    const updateTask = async (taskId, updatedTask) => {
        try {
            await axios.put(`${URL}/users/${userId}/lists/${listId}/tasks/${taskId}`, updatedTask);
            setTasks((prevTasks) => {
                const newState = { ...prevTasks };
                newState[updatedTask.status] = newState[updatedTask.status].map(task =>
                    task.id === taskId ? updatedTask : task
                );
                return newState;
            });
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to update task');
        }
    };

    return (
        <div className="todolist-page">
            <h1>{listName}</h1>
            {error && <p className="error-p">{error}</p>}
            <div className="lists-container">
                <TasksList tasks={tasks.tasks} moveTask={moveTask} addTask={handleAddTask} updateTask={updateTask} deleteTask={handleDeleteTask} />
                <InProgressList tasks={tasks.inProgress} moveTask={moveTask} updateTask={updateTask} deleteTask={handleDeleteTask} />
                <CompletedList tasks={tasks.completed} moveTask={moveTask} updateTask={updateTask} deleteTask={handleDeleteTask} />
            </div>
            <GarbageBin deleteTask={handleDeleteTask} isDragging={isDragging} />
        </div>
    );
}

export default ToDoList;