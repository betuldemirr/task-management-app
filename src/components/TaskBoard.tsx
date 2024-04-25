import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {TaskData} from "../model/TaskData";
import Task from "./Task"

interface TaskBoardProps {
    initialTasks: { [key: string]: TaskData[] };
    initialColumns: string[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ initialTasks, initialColumns }) => {
    const [columns, setColumns] = useState<{ [key: string]: TaskData[] }>(initialTasks);
    const [showCreateTaskModal, setshowCreateTaskModalStatus] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const onCloseCreateTaskModal = () => setshowCreateTaskModalStatus(false);
    const onShowCreateTaskModal = () => setshowCreateTaskModalStatus(true);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];

        const movedTask = sourceColumn[source.index];
        const newSourceColumn = [...sourceColumn];
        newSourceColumn.splice(source.index, 1);

        const newDestinationColumn = [...destinationColumn];
        newDestinationColumn.splice(destination.index, 0, movedTask);

        setColumns({
            ...columns,
            [source.droppableId]: newSourceColumn,
            [destination.droppableId]: newDestinationColumn,
        });
    };

    const onAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            const allTaskIds = Object.keys(columns).reduce((ids: string[], columnId: string) => {
                return ids.concat(columns[columnId].map(task => task.id));
            }, []);

            let newTaskId = 1;
            while (allTaskIds.includes(`task-${newTaskId}`)) {
                newTaskId++;
            }

            const newTask: TaskData = { id: `task-${newTaskId}`, title: newTaskTitle, description: newTaskDescription, comments: [] };
            const newTasks = [...columns['To-do'], newTask];

            setColumns({
                ...columns,
                'To-do': newTasks,
            });

            onCloseCreateTaskModal();
            setNewTaskTitle('');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <Button  variant="primary" onClick={onShowCreateTaskModal} style={{ marginBottom: '16px' }}>
                    Create Task
                </Button>
            </div>
            <Modal show={showCreateTaskModal} onHide={onCloseCreateTaskModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        className={"mb-2"}
                        type="text"
                        placeholder="Enter task name"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter task description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseCreateTaskModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onAddTask}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <Row>
                        {Object.entries(columns).map(([columnId, columnTasks]) => (
                            <Col key={columnId} className="text-center">
                                <Card style={{ marginBottom: '16px' }}>
                                    <Card.Header style={{ backgroundColor: getColorForColumnHeaders(columnId), color: '#fff', borderRadius: '8px 8px 0 0' }}>{columnId}</Card.Header>
                                    <Card.Body>
                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {columns[columnId].map((task, index) => (
                                                        <Task key={task.id} task={task} index={index} /> // Task bileşenini burada kullanıyoruz
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </DragDropContext>
        </div>
    );
};

const getColorForColumnHeaders = (columnId: string): string => {
    switch (columnId) {
        case 'To-do':
            return '#dc3545';
        case 'In Progress':
            return '#ffc107';
        case 'Code Review':
            return '#ffc107';
        case 'Test':
            return '#ffc107';
        case 'Done':
            return '#28a745';
        default:
            return '#333';
    }

};

export default TaskBoard;
