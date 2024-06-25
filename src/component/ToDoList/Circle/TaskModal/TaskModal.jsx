import { useRef, useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import './TaskModal.css';

function TaskModal({ task, isOpen, onClose, onUpdate }) {
    const modalRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState(task.note);

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

    useEffect(() => {
        setEditedNote(task.note);
    }, [task]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = () => {
        onUpdate(task.id, editedNote);
        setIsEditing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <h2>{task.name}</h2>
                {isEditing ? (
                    <textarea
                        value={editedNote}
                        onChange={(e) => setEditedNote(e.target.value)}
                        placeholder='Edit your note here'
                    />
                ) : (
                    <textarea 
                        value={task.note}
                        readOnly
                        placeholder='No notes available'
                    />
                )}
                {isEditing ? (
                    <button onClick={handleUpdateClick}>update</button>
                ) : (
                    <MdModeEdit onClick={handleEditClick} className='edit-icon' />
                )}
            </div>
        </div>
    );
}

export default TaskModal;
