import { useRef, useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import './TaskModal.css';
import axios from 'axios';
import Loading from '../../../LoadingSpinner/Loading';

function TaskModal({ task, isOpen, onClose, updateTaskInParent }) {
    const modalRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState(task.note);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const URL = 'https://list-todo.com';

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

    const handleUpdateClick = async () => {
        setLoading(true);

        try {
            const response = await axios.put(`${URL}/updateTaskNote.php`, { id: task.id, note: editedNote });
            const updatedTask = response.data;
            updateTaskInParent(updatedTask);
            setError(null);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            setError(error.response?.data || 'Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <h2>{task.name}</h2>
                {error && <p className='error-p'>{error}</p>}
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
                {loading && <Loading />}
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
