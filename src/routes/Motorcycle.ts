import express from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleController from '../controllers/Motorcycle';
import motorcycleValidate from '../middlewares/motorcycleValidate';

const route = express.Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post(
  '/',
  motorcycleValidate,
  (req, res) => motorcycleController.create(req, res),
);
route.get('/', (req, res) => motorcycleController.read(req, res));
route.get('/:id', (req, res) => motorcycleController.readOne(req, res));

export default route;