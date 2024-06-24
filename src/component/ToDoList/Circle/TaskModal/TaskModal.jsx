import { useRef, useEffect } from 'react';
import './TaskModal.css';

function TaskModal({ task, isOpen, onClose }) {
    const modalRef = useRef(null);

    // handles the click out side to close popup
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <h2>{task.name}</h2>
                <textarea value={task.note} readOnly placeholder="No notes available"></textarea>
            </div>
        </div>
    );
}

export default TaskModal;
