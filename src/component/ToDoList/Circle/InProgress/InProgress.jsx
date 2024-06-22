import { useDrop } from 'react-dnd';
import Task from '../Task';
import './InProgress.css';

function InProgressList({ tasks, moveTask }) {
    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => moveTask(item.id, item.status, 'inProgress'),
    }), [moveTask]);

    return (
        <div ref={drop} className="inprogress-page">
            <h3>In Progress</h3>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

export default InProgressList;
