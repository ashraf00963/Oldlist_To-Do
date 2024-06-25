import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { TasksList, InProgressList, CompletedList, GarbageBin, CustomDragLayer } from './Circle';
import './ToDoList.css';
import Loading from "../LoadingSpinner/Loading";
import { backgroundVid } from "../../assets";

function ToDoList() {
    const { listId } = useParams();
    const [tasks, setTasks] = useState({ tasks: [], inProgress: [], completed: [] });
    const [listName, setListName] = useState('');
    const [loading, setLoading] = useState(true);
    const [movingTask, setMovingTask] = useState(false);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');
    const URL = 'https://list-todo.com';

    const isDragging = CustomDragLayer();

    // fetches specific list from server with lists id
    useEffect(() => {
        const getList = async () => {
            try {
                const response = await axios.get(`${URL}/getList.php`, {
                    params: {
                        user_id: userId,
                        list_id: listId
                    }
                });
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
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, [userId, listId, URL]);

    // addes tasks to the specific list
    const handleAddTask = async (newTask) => {
        if (!newTask.name) {
            setError('Task cannot be empty');
            return;
        }

        try {
            const task = { id: uuidv4(), ...newTask, list_id: listId, status: 'tasks' };
            const response = await axios.post(`${URL}/addTask.php`, task);
            setTasks((prevTasks) => ({
                ...prevTasks,
                tasks: [...prevTasks.tasks, response.data]
            }));
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to add task');
        }
    };

    // Deletes task from the specific list
    const handleDeleteTask = async (taskId, status) => {
        console.log('Deleting task ID:', taskId);
        try {
            await axios.delete(`${URL}/deleteTask.php`, { data: { task_id: taskId } });
            setTasks((prevTasks) => ({
                ...prevTasks,
                [status]: prevTasks[status].filter((task) => task.id !== taskId)
            }));
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to delete task');
        }
    };

    // moves tasks either in same part of list like Tasks or to diffrent part like in progress
    const moveTask = async (taskId, sourceStatus, targetStatus, targetIndex) => {
        const taskToMove = tasks[sourceStatus].find(task => task.id === taskId);
        const updatedTask = { ...taskToMove, status: targetStatus };

        setMovingTask(true);
    
        try {
            await axios.put(`${URL}/updateTask.php`, {
                id: taskId,
                name: updatedTask.name,
                status: updatedTask.status,
                note: updatedTask.note
            });
    
            setTasks((prevTasks) => {
                const newState = { ...prevTasks };
                newState[sourceStatus] = newState[sourceStatus].filter(task => task.id !== taskId);
                if (sourceStatus === targetStatus) {
                    newState[targetStatus].splice(targetIndex, 0, updatedTask);
                } else {
                    newState[targetStatus] = [...newState[targetStatus], updatedTask];
                }
    
                return newState;
            });
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to update task status');
        } finally {
            setMovingTask(false);
        }
    };    

    // updates task state
    const updateTask = async (taskId, updatedTask) => {
        try {
            await axios.put(`${URL}/updateTask.php`, updatedTask);
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

    // handles updating the task note
    const handleUpdateTaskNote = async (taskId, newNote) => {
        try {
            const response = await axios.put(`${URL}/updateTask.php`, { id: taskId, note: newNote });
            const updatedTask = response.data;
    
            setTasks((prevTasks) => {
                const newState = { ...prevTasks };
    
                // Find the task in the current state and update its note
                for (const status in newState) {
                    if (newState[status]) {
                        newState[status] = newState[status].map(task =>
                            task.id === taskId ? { ...task, note: newNote } : task
                        );
                    }
                }
    
                return newState;
            });
    
            setError(null);
        } catch (error) {
            setError(error.response?.data || 'Failed to update task');
        }
    };
    

    return (
        <div className="todolist-page">
            <video autoPlay muted loop className="video-background">
                <source src={backgroundVid} type="video/mp4" />
                Your browser does not support the video.
            </video>
            {loading && <Loading />}
            {movingTask && <Loading />}
            <h1>{listName}</h1>
            {error && <p className="error-p">{error}</p>}
            <div className="lists-container">
                <TasksList tasks={tasks.tasks} moveTask={moveTask} addTask={handleAddTask} updateTask={updateTask} deleteTask={handleDeleteTask} onUpdateTaskNote={handleUpdateTaskNote} />
                <InProgressList tasks={tasks.inProgress} moveTask={moveTask} updateTask={updateTask} deleteTask={handleDeleteTask} />
                <CompletedList tasks={tasks.completed} moveTask={moveTask} updateTask={updateTask} deleteTask={handleDeleteTask} />
            </div>
            <GarbageBin deleteTask={handleDeleteTask} isDragging={isDragging} />
        </div>
    );
}

export default ToDoList;
