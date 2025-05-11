// controllers/tasks.controller.js
const Task = require('../models/task.model');
const s3 = require('../utils/s3');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      userId: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // If task has an attachment, delete it from S3
    if (task.attachment) {
      const key = task.attachment.split('/').pop();
      await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
      }).promise();
    }

    await task.destroy();

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload attachment for a task
const uploadAttachment = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Upload file to S3
    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const uploadResult = await s3.upload(params).promise();
    
    // Update task with attachment URL
    task.attachment = uploadResult.Location;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  uploadAttachment,
  upload
};