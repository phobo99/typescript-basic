import express from 'express';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';

const router = express.Router();

const initWebRoutes = (app: express.Application) => {
  router.post('/login', userController.handleLogin);
  router.get('/get-all-users', userController.handleGetAllUsers);
  router.post('/create-new-user', userController.handleCreateNewUser);
  router.put('/edit-user', userController.handleEditUser);
  router.delete('/delete-user', userController.handleDeleteUser);
  router.get('/allcode', userController.getAllCode);
  router.get('/top-doctor-home', doctorController.getTopDoctorHome);
  router.get('/get-all-doctors', doctorController.getAllDoctors);
  router.post('/save-info-doctor', doctorController.postInforDoctor);
  router.get('/get-detail-doctor-by-id', doctorController.getDetailDoctorById);

  return app.use('/api', router);
};

export default initWebRoutes;
