import { useDrop } from 'react-dnd';
import './GarbageBin.css';

function GarbageBin({ deleteTask, isDragging }) {
    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => deleteTask(item.id, item.status),
    }), [deleteTask]);

    if (!isDragging) return null;

    return (
        <div ref={drop} className="garbage-bin">
            <div className='garabage-content'>
                <p>🗑️ <span style={{textDecoration:'underline'}}>Drop task here to delete</span></p>
            </div>
        </div>
    );
}

export default GarbageBin;
