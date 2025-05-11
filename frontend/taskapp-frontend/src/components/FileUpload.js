import React, { useState } from 'react';
import api from '../services/api';

const FileUpload = ({ taskId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('attachment', file);
    
    setUploading(true);
    
    try {
      const response = await api.post(`/tasks/${taskId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setUploading(false);
      setFile(null);
      
      // Reset file input
      e.target.reset();
      
      // Call onSuccess callback with updated task
      onSuccess(response.data);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      setUploading(false);
      console.error(err);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Upload Attachment</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="attachment" className="form-label">Select File</label>
            <input 
              type="file" 
              className="form-control" 
              id="attachment"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={uploading || !file}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;