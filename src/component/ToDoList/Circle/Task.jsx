import { useDrag, useDrop } from 'react-dnd';
import { useState, useRef } from 'react';
import TaskModal from './TaskModal/TaskModal';
import './Task.css';

function Task({ task, index, moveTask }) {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'TASK',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveTask(item.id, item.status, item.status, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, index, status: task.status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                ref={ref}
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
            <TaskModal task={task} isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}

export default Task;
