import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId, arrayMotorcycleMock, motorcycleMockForChange, motorcycleMockForChangeWithId } from '../../mocks/motorcycleMocks';

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves(arrayMotorcycleMock);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockForChangeWithId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando usa o método create', () => {
    it('e cria com sucesso', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  })

  describe('quando executa o método read', () => {
    it('e encontra com sucesso', async () => {
      const motorcyecles = await motorcycleModel.read();
      expect(motorcyecles).to.be.deep.equal(arrayMotorcycleMock);
    });
  })

  describe('quando executa o método readOne', () => {
		it('e encontra com sucesso', async () => {
			const motorcycle = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
			expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	})

  describe('quando executa o método update', () => {
		it('e encontra com sucesso', async () => {
			const motorcycle = await motorcycleModel.update('62cf1fc6498565d94eba52cd', motorcycleMockForChange);
			expect(motorcycle).to.be.deep.equal(motorcycleMockForChangeWithId);
		});
	})

  describe('quando executa o método delete', () => {
		it('e encontra com sucesso', async () => {
			const motorcycle = await motorcycleModel.delete('62cf1fc6498565d94eba52cd');
			expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	})
});
  