import { useDrop } from 'react-dnd';
import Task from '../Task';
import './Completed.css';

function CompletedList({ tasks, moveTask }) {
    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => moveTask(item.id, item.status, 'completed'),
    }), [moveTask]);

    return (
        <div ref={drop} className="completed-page">
            <h3>Completed</h3>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

export default CompletedList;
