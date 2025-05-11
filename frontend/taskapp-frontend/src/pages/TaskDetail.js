// src/pages/TaskDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import FileUpload from '../components/FileUpload';
import api from '../services/api';

const TaskDetail = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Define fetchTask function
  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call fetchTask when component mounts or id changes
    fetchTask();
  }, [id]); // Include id in the dependency array

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTask(response.data);
      alert('Task updated successfully!');
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error(err);
    }
  };

  const handleUploadSuccess = (updatedTask) => {
    setTask(updatedTask);
    alert('File uploaded successfully!');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
        <button 
          className="btn btn-primary ms-3" 
          onClick={handleBack}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="alert alert-warning">
        Task not found.
        <button 
          className="btn btn-primary ms-3" 
          onClick={handleBack}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Task</h1>
        <button 
          className="btn btn-secondary" 
          onClick={handleBack}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Task Details</h5>
        </div>
        <div className="card-body">
          <TaskForm 
            onSubmit={handleUpdateTask} 
            initialData={task} 
          />
        </div>
      </div>

      {task.attachment && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Current Attachment</h5>
          </div>
          <div className="card-body">
            <p>You already have an attachment for this task:</p>
            <a 
              href={task.attachment} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              View Attachment
            </a>
          </div>
        </div>
      )}

      <FileUpload taskId={id} onSuccess={handleUploadSuccess} />
    </div>
  );
};

export default TaskDetail;