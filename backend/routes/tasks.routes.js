// routes/tasks.routes.js
const express = require('express');
const router = express.Router();
const { 
  getTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask,
  uploadAttachment,
  upload
} = require('../controllers/tasks.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.post('/:id/upload', protect, upload.single('attachment'), uploadAttachment);

module.exports = router;