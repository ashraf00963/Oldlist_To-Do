import React from 'react';
import './TaskModal.css';

function TaskModal({ task, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{task.name}</h2>
                <textarea value={task.note} readOnly placeholder="No notes available"></textarea>
                {task.attachments && task.attachments.length > 0 ? (
                    <ul>
                        {task.attachments.map((attachment, index) => (
                            <li key={index}><a href={`http://localhost:3001/uploads/${attachment}`} target="_blank" rel="noopener noreferrer">{attachment}</a></li>
                        ))}
                    </ul>
                ) : (
                    <p>No attachments</p>
                )}
            </div>
        </div>
    );
}

export default TaskModal;
