import { expect } from 'chai';
import * as sinon from 'sinon';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/Cars';
import { carMock, carMockWithId } from '../../mocks/carsMock';
import { Request, Response } from 'express';

describe('Car Controller', () => {
  const carModel = new CarsModel();
  const carService = new CarsService(carModel);
  const carController = new CarsController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando usa o método create', () => {
    it('e cria com sucesso', async () => {
      req.body = carMock;

      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

  })
});