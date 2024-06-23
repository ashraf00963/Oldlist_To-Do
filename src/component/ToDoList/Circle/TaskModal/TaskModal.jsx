import React from 'react';
import './TaskModal.css';

function TaskModal({ task, isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{task.name}</h2>
                <textarea value={task.note} readOnly placeholder="No notes available"></textarea>
                <div className='attachments'>
                    {task.attachments && task.attachments.length > 0 ? (
                        task.attachments.map((attachment, index) => (
                            <div key={index}>
                                <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
                            </div> 
                        ))
                    ) : (
                        <p className='attach-p'>No attachments</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskModal;
