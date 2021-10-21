import express from 'express';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';

const router = express.Router();

const initWebRoutes = (app: express.Application) => {
  router.post('/login', userController.handleLogin);
  router.get('/users', userController.handleGetAllUsers);
  router.post('/new-user', userController.handleCreateNewUser);
  router.put('/user', userController.handleEditUser);
  router.delete('/user', userController.handleDeleteUser);
  router.get('/allcode', userController.getAllCode);
  router.get('/top-doctors', doctorController.getTopDoctor);
  router.get('/doctors', doctorController.getAllDoctors);
  router.post('/save-doctor', doctorController.saveInforDoctor);
  router.get('/detail-doctor', doctorController.getDoctorById);

  return app.use('/api', router);
};

export default initWebRoutes;
