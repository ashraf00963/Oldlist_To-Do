import { useDrop } from 'react-dnd';
import Task from '../Task';
import { useRef, useState, useEffect } from 'react';
import './Tasks.css';

function TasksList({ tasks, moveTask, addTask }) {
    const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [note, setNote] = useState('');
    const loginRef = useRef(null);

    // handles drop func
    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => moveTask(item.id, item.status, 'tasks'),
    }), [moveTask]);

    const handleTaskAdding = (e) => {
        e.preventDefault();
        const task = {
            name: newTask,
            note
        };
        addTask(task);
        setNewTask('');
        setNote('');
        setIsAddTaskPopupOpen(false);
    };

    // handles the click out side to close popup
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                setIsAddTaskPopupOpen(false);
            }
        };

        if (isAddTaskPopupOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isAddTaskPopupOpen]);

    return (
        <div ref={drop} className='tasklist-page'>
            <div className='tasklist-content'>
                <div className='tasklist-header'>
                    <h3>Tasks</h3>
                    <button className='tasklist-popup-btn' onClick={() => setIsAddTaskPopupOpen(true)}>+</button>
                </div>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
            {isAddTaskPopupOpen &&
                <div className='addtask-popup-overlay'>
                    <div className='addtask-popup-content' ref={loginRef}>
                        <h2>Create New Task</h2>
                        <form className='addtask-popup-form' onSubmit={handleTaskAdding}>
                            <input
                                type='text'
                                value={newTask}
                                className='addtask-popup-input'
                                onChange={(e) => setNewTask(e.target.value)}
                                maxLength={30}
                                placeholder='Task Name'
                                required
                            />
                            <textarea
                                value={note}
                                className='addtask-popup-input'
                                onChange={(e) => setNote(e.target.value)}
                                placeholder='Notes'
                                required
                            />
                            <button type='submit' className='addtask-popup-btn'>Create Task</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default TasksList;
