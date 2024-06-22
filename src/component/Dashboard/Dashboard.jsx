import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewListPopup from "./CreateNewList";
import axios from "axios";
import './Dashboard.css';


function Dashboard() {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState(null);
    const [isListPopupOpen, setIsListPopupOpen] = useState(false);

    const userId = localStorage.getItem('userId');
    const URL = 'http://localhost:3001';
    const navigate = useNavigate();


    //fetching user lists on mount
    useEffect(() => {
        
        console.log(userId)
        const getLists = async () => {
            try {
                const response = await axios.get(`${URL}/users/${userId}/lists`);
                setLists(response.data);
            } catch (error) {
                setError(error.response.data || 'failed to fetch data from server');
            }
        } 
 
        getLists();
    }, [userId, URL]);

    const handleAddListPopup = () => {
        setIsListPopupOpen(true);
    }

    return (
        <div className="dashboard">
            <h1 className="dash-h1">Dashboard</h1>
            <div className="dashboard-listoflists">
                <div className="listoflists-header">
                    <h2>To-Do lists</h2>
                    <button onClick={handleAddListPopup} className="add-list-btn">Create New List</button>
                </div>
                <div className="listoflists-lists">
                    {lists.map((list) => (
                        <div className="listoflists-list" key={list.id} onClick={() => navigate(`/list/${list.id}`)}>
                            {list.name}
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
                    userId={userId}
                />
             </div>   
        </div>
    )

}

export default Dashboard;