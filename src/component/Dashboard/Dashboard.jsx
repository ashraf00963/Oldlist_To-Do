import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewListPopup from "./CreateNewList";
import Loading from "../LoadingSpinner/Loading";
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import './Dashboard.css';

function Dashboard() {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState(null);
    const [isListPopupOpen, setIsListPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);

    const userId = localStorage.getItem('userId');
    const URL = 'https://list-todo.com';
    const navigate = useNavigate();

    // Fetching user lists on mount
    useEffect(() => {
        const getLists = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${URL}/getLists.php`, {
                    params: {
                        user_id: userId
                    }
                });
                setLists(response.data);
            } catch (error) {
                setError(error.response.data || 'failed to fetch data from server');
            } finally {
                setLoading(false);
            }
        }
        getLists();
    }, [userId, URL]);

    const handleAddListPopup = () => {
        setIsListPopupOpen(true);
    }

    const handleDeleteList = async () => {
        setLoading(true);
        try {
            await axios.post(`${URL}/deleteList.php`, { list_id: listToDelete });
            setLists(lists.filter(list => list.id !== listToDelete));
            setError(null);
            setIsDeletePopupOpen(false);
        } catch (error) {
            setError(error.response?.data || 'failed to delete list');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="dashboard">
            {loading && <Loading />}
            <h1 className="dash-h1">Dashboard</h1>
            <div className="dashboard-listoflists">
                <div className="listoflists-header">
                    <h2>To-Do lists</h2>
                    <button onClick={handleAddListPopup} className="add-list-btn">Create New List</button>
                </div>
                <div className="listoflists-lists">
                    {lists.map((list) => (
                        <div className="listoflists-list" key={list.id} onClick={() => navigate(`/list/${list.id}`)}>
                            <span>{list.name}</span>
                            <FaTrash
                                className="delete-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setListToDelete(list.id);
                                    setIsDeletePopupOpen(true);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <NewListPopup
                    isOpen={isListPopupOpen}
                    onClose={() => setIsListPopupOpen(false)}
                    setLists={setLists}
                    lists={lists}
                    error={error}
                    setError={setError}
                />
                {isDeletePopupOpen && 
                    <div className="confirm-delete-overlay">
                        <div className="confirm-delete-content">
                            <p>Are you sure you want to delete this list?</p>
                            <button onClick={handleDeleteList}>Delete</button>
                            <button onClick={() => setIsDeletePopupOpen(false)}>Cancel</button>
                        </div>
                    </div>
                }
             </div>
        </div>
    )
}

export default Dashboard;