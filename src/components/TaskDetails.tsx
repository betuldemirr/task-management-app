import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { TaskData } from '../model/TaskData';
import { Comment } from '../model/Comment';


interface TaskDetailsProps {
    task: TaskData;
    onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
    const [newComment, setNewComment] = useState('');

    const onCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const onAddComment = () => {
        if (newComment.trim() !== '') {
            const newCommentData: Comment = {
                content: newComment,
                createdAt: new Date(),
            };

            task.comments.push(newCommentData);
            setNewComment('');
        }
    };

    const getTimeAgoForComment = (createdAt: Date): string => {
        const now = new Date();
        const diffMs = now.getTime() - createdAt.getTime();
        const diffMinutes = Math.round(diffMs / (1000 * 60));

        if (diffMinutes < 1) {
            return 'Just now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} mins ago`;
        } else if (diffMinutes < 1440) {
            const diffHours = Math.floor(diffMinutes / 60);
            return `${diffHours} hours ago`;
        } else {
            const diffDays = Math.floor(diffMinutes / 1440);
            return `${diffDays} days ago`;
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Comments:</strong></p>
                    {task.comments.map((comment, index) => (
                        <Toast>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">Betul Demir</strong>
                                <small>{getTimeAgoForComment(comment.createdAt)}</small>
                            </Toast.Header>
                            <Toast.Body>{comment.content}</Toast.Body>
                        </Toast>
                    ))}
                <Form.Group controlId="formTaskComment">
                    <Form.Control
                        className={"mt-2"}
                        type="text"
                        placeholder="Enter comment"
                        value={newComment}
                        onChange={onCommentChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onAddComment}>
                    Add Comment
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskDetails;