import express from 'express';
import CarsModel from '../models/Cars';
import CarsService from '../services/Cars';
import CarsController from '../controllers/Cars';

const route = express.Router();

const carModel = new CarsModel();
const carService = new CarsService(carModel);
const carController = new CarsController(carService);

route.post('/', (req, res) => carController.create(req, res));

export default route;