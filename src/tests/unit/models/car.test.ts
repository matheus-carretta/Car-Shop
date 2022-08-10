import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId, arrayCarMock } from '../../mocks/carsMock';

describe('Car Model', () => {
  const carModel = new CarsModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(arrayCarMock)
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando usa o método create', () => {
    it('e cria com sucesso', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  })

  describe('quando executa o método read', () => {
    it('e encontra com sucesso com sucesso', async () => {
      const newCars = await carModel.read();
      expect(newCars).to.be.deep.equal(arrayCarMock);
    });
  })
});
  