// src/components/TaskItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'in-progress':
        return 'bg-info';
      case 'completed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{task.title}</h5>
          <span className={`badge ${getStatusBadge(task.status)}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
        <p className="card-text">{task.description}</p>
        <p className="card-text"><small className="text-muted">Due: {formatDate(task.dueDate)}</small></p>
        
        {task.attachment && (
          <div className="mb-3">
            <a href={task.attachment} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
              View Attachment
            </a>
          </div>
        )}
        
        <div className="d-flex justify-content-end">
          <Link to={`/tasks/${task.id}`} className="btn btn-sm btn-primary me-2">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(task.id)} 
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;