import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carMock, carMockWithId } from '../../mocks/carsMock';


describe('Car Service', () => {
  const carModel = new CarsModel();
  const carService = new CarsService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando usa o método create', () => {
    it('e cria com sucesso', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

  })
});