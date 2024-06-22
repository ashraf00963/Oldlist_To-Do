import { useDragLayer } from 'react-dnd';

function CustomDragLayer() {
    const { isDragging } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
    }));

    return isDragging;
}

export default CustomDragLayer;
