import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Intro from './component/Intro/Intro';
import Dashboard from './component/Dashboard/Dashboard';
import './App.css';
import ToDoList from './component/ToDoList/ToDoList';

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path='/' element={<Intro />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/list/:listId' element={<ToDoList />} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  )
}

export default App;
