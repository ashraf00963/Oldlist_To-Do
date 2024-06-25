import { useDrag } from 'react-dnd';
import { useState } from 'react';
import TaskModal from './TaskModal/TaskModal';
import './Task.css';

function Task({ task, onUpdate }) {
    // Handles Drag Task
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [task]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // handles state of modal 
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`task-container ${task.status === 'completed' ? 'completed' : ''}`}
                ref={drag}
                style={{ opacity: isDragging ? 0.5 : 1 }}
                onClick={handleOpenModal}
            >
                <span>{task.name}</span>
                {task.status === 'completed' && (
                    <div className="checkmark">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                )}
                {task.status === 'inProgress' && (
                    <div className="dot-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>
            <TaskModal task={task} isOpen={isModalOpen} onClose={handleCloseModal} onUpdate={onUpdate} />
        </>
    );
}

export default Task;
