import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId, arrayCarMock, carMockForChange, carMockForChangeWithId } from '../../mocks/carsMock';

describe('Car Model', () => {
  const carModel = new CarsModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(arrayCarMock);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(carMockWithId);
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
    it('e encontra com sucesso', async () => {
      const newCars = await carModel.read();
      expect(newCars).to.be.deep.equal(arrayCarMock);
    });
  })

  describe('quando executa o método readOne', () => {
		it('e encontra com sucesso', async () => {
			const car = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(car).to.be.deep.equal(carMockWithId);
		});
	})

  describe('quando executa o método update', () => {
		it('e encontra com sucesso', async () => {
			const car = await carModel.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(car).to.be.deep.equal(carMockForChangeWithId);
		});
	})

  describe('quando executa o método delete', () => {
		it('e encontra com sucesso', async () => {
			const car = await carModel.delete('62cf1fc6498565d94eba52cd');
			expect(car).to.be.deep.equal(carMockWithId);
		});
	})
});
  