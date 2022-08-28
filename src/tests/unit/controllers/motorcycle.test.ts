import { expect } from 'chai';
import * as sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import MotorcycleController from '../../../controllers/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, arrayMotorcycleMock } from '../../mocks/motorcycleMocks';
import { Request, Response } from 'express';

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);
  const req = {} as Request; 
  const res = {} as Response;

  before(async () => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'read').resolves(arrayMotorcycleMock);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'delete').resolves(motorcycleMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando usa o método create', () => {
    it('e cria com sucesso', async () => {
      req.body = motorcycleMock;

      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })

  describe('quando usa o método read', () => {
    it('e encontra com sucesso', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(arrayMotorcycleMock)).to.be.true;
    });
  })

  describe('quando usa o método readOne', () => {
    it('e encontra com sucesso', async () => {
      req.params = { id: '62cf1fc6498565d94eba52cd' };
      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })

  describe('quando usa o método update', () => {
    it('e atualiza com sucesso', async () => {
      req.params = { id: '62cf1fc6498565d94eba52cd' };
      req.body = motorcycleMock;
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })

  describe('quando usa o método delete', () => {
    it('e deleta com sucesso', async () => {
      req.params = { id: '62cf1fc6498565d94eba52cd' };
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })
});