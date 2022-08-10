import { expect } from 'chai';
import * as sinon from 'sinon';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carMock, carMockWithId, arrayCarMock } from '../../mocks/carsMock';


describe('Car Service', () => {
  const carModel = new CarsModel();
  const carService = new CarsService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(arrayCarMock);
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

  describe('quando usa o método read', () => {
    it('e encontra com sucesso', async () => {
      const newCars = await carService.read();
      expect(newCars).to.be.deep.equal(arrayCarMock);
    });
  })
});