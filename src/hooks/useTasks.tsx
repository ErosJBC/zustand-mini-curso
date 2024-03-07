import { DragEvent, useState } from 'react'
import Swal from 'sweetalert2';
import { useTaskStore } from '../store';
import { TaskStatus } from '../interfaces';

interface Options {
    status: TaskStatus
}

const useTasks = ({ status }: Options) => {
    const isDragging = useTaskStore(state => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const addTask = useTaskStore(state => state.addTask);
    const [onDragOver, setOnDragOver] = useState(false);

    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: 'Nueva Tarea',
            input: 'text',
            inputLabel: 'Nombre de la tarea',
            inputPlaceholder: 'Ingrese el nombre de la tarea',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return '¡El nombre de la tarea es obligatorio!';
                }
            }
        });

        if(!isConfirmed) return;
        addTask(value, status);
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(true);
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status);
    }
    
    return {
        isDragging,
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    }
}

export default useTasks