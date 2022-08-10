import express from 'express';
import CarsModel from '../models/Cars';
import CarsService from '../services/Cars';
import CarsController from '../controllers/Cars';

import carValidate from '../middlewares/carValidate';

const route = express.Router();

const carModel = new CarsModel();
const carService = new CarsService(carModel);
const carController = new CarsController(carService);

route.post('/', carValidate, (req, res) => carController.create(req, res));
route.get('/', (req, res) => carController.read(req, res));

export default route;