# Cloud-Based Task Management Application

A task management application deployed on AWS infrastructure, featuring a React frontend and Node.js backend.

## Live Demo

- Frontend: [http://taskapp-frontend-prod-env.eba-vupzncxu.ap-southeast-1.elasticbeanstalk.com/](http://taskapp-frontend-prod-env.eba-vupzncxu.ap-southeast-1.elasticbeanstalk.com/)
- Backend API: [http://122.248.202.13:5000/api](http://122.248.202.13:5000/api)

## Architecture

This application follows a modern cloud-native architecture with the following components:

- **Frontend**: React application deployed on AWS Elastic Beanstalk
- **Backend**: Node.js/Express API running in a Docker container on EC2
- **Database**: PostgreSQL database on Amazon RDS
- **Storage**: Amazon S3 for file uploads
- **Security**: IAM roles, security groups, and JWT authentication

## Features

- User authentication (register, login, profile)
- Task management (create, read, update, delete)
- File upload capability for task attachments
- Responsive design for all device sizes

## Technology Stack

- **Frontend**: React, Bootstrap, Axios, React Router
- **Backend**: Node.js, Express, Sequelize ORM, JWT
- **Database**: PostgreSQL
- **Cloud**: AWS (EC2, RDS, S3, Elastic Beanstalk, VPC, IAM)
- **Containerization**: Docker

## Deployment Guide

See the [documentation](I210469_i200816_CloudProject.pdf) for detailed deployment instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details." 
