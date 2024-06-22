import { useRef, useState, useEffect } from "react";
import axios from "axios";
import './CreateNewList.css';

function NewListPopup({ isOpen, onClose, setLists, lists, error, setError, userId }) {
    const [newListName, setNewListName] = useState('');
    const loginRef = useRef(null);

    const URL = 'http://localhost:3001';

    //useEffect handling click out side to close new list popup
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(loginRef.current && !loginRef.current.contains(event.target)) {
                onClose();
            }
        }

        if(isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    //handle adding list to server and list array
    const handleAddList = async () => {
        if(!newListName) {
            setError('List name can`t be empty');
            return;
        }

        //initial list
        const newList = {
            id: lists.length + 1,
            name: newListName,
            tasks: []
        };

        try {
            await axios.post(`${URL}/users/${userId}/lists`, newList);
            setLists([...lists, newList]);
            setNewListName('');
        } catch (error) {
            setError(error.response?.data || 'failed to add list to server');
        }
    }

    return (
        <div className="newlistpopup-overlay">
            <div className="newlistpopup-content" ref={loginRef}>
                <h2>Create To-Do List</h2>
                {error && <p className="error-p">{error}</p>}
                <form className="newlistpopup-form" onSubmit={handleAddList}>
                    <input
                        type="text"
                        value={newListName}
                        className="newlistpopup-input"
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="List name"
                        required
                    />
                    <button type="submit" className="newlistpopup-btn">Create</button>
                </form>
            </div>
        </div>
    )
}

export default NewListPopup;