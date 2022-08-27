import { expect } from 'chai';
import * as sinon from 'sinon';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/Cars';
import { carMock, carMockWithId, arrayCarMock } from '../../mocks/carsMock';
import { Request, Response } from 'express';

describe('Car Controller', () => {
  const carModel = new CarsModel();
  const carService = new CarsService(carModel);
  const carController = new CarsController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves(arrayCarMock);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockWithId);
    sinon.stub(carService, 'delete').resolves(carMockWithId);

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

  describe('quando usa o método read', () => {
    it('e encontra com sucesso', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(arrayCarMock)).to.be.true;
    });
  })

  describe('quando usa o método readOne', () => {
    it('e encontra com sucesso', async () => {
      req.params = { id: '62cf1fc6498565d94eba52cd' };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(arrayCarMock)).to.be.true;
    });
  })

  describe('quando usa o método update', () => {
    it('e atualiza com sucesso', async () => {
      req.params = { id: '62cf1fc6498565d94eba52cd' };
      req.body = carMock;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })

  describe('quando usa o método delete', () => {
    it('e deleta com sucesso', async () => {
      req.params = { id: '62cf1fc6498565d94eba52cd' };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })
});