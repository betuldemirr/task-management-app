import React from 'react';
import TaskBoard from './components/TaskBoard';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import {TaskData} from "./model/TaskData";

const initialTasks: { [key: string]: TaskData[] } = {
    'To-do': [
        { id: 'task-1', title: 'Task 1', description:'Description Example',comments:[] },
        { id: 'task-2', title: 'Task 2' , description:'Description Example', comments:[] },
        { id: 'task-3', title: 'Task 3', description:'Description Example', comments:[] },
    ],
    'In Progress': [],
    'Code Review': [],
    'Test': [],
    'Done': [],
};

const initialColumns: string[] = ['To-do', 'In Progress', 'Code Review', 'Test', 'Done'];

const App: React.FC = () => {
    return (
        <div className="app my-5">
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center'>Task Management App</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TaskBoard initialTasks={initialTasks} initialColumns={initialColumns} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;
