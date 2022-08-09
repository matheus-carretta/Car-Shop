import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carsMock';

describe('Car Model', () => {
  const carModel = new CarsModel();
  before(async () => {
    sinon
      .stub(Model, 'create').resolves(carMockWithId);
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
});
  