import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskData } from '../model/TaskData';
import TaskDetails from "./TaskDetails";
import {Card} from "react-bootstrap";

interface TaskProps {
    task: TaskData;
    index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {

    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

    const onTaskClick = () => {
        setSelectedTask(task);
        setShowTaskDetails(true);
    };

    const onCloseTaskDetailsPopup = () => {
        setShowTaskDetails(false);
        setSelectedTask(null);
    };

    return (
        <div>
            <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                    <Card
                        onClick={onTaskClick}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: 'none',
                            marginBottom: '8px',
                            backgroundColor: '#343a40',
                            color: 'white',
                            borderRadius: '8px',
                            ...provided.draggableProps.style,
                        }}
                    >
                        <Card.Body>{task.title}</Card.Body>
                    </Card>
                )}
            </Draggable>
            {showTaskDetails && selectedTask && (
                <TaskDetails task={selectedTask} onClose={onCloseTaskDetailsPopup}/>
            )}
        </div>
    );
};

export default Task;