import { expect } from 'chai';
import * as sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { ErrorTypes } from '../../../errors/catalog'
import { motorcycleMock, motorcycleMockWithId, arrayMotorcycleMock } from '../../mocks/motorcycleMocks';

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves(arrayMotorcycleMock);
    sinon.stub(motorcycleModel, 'readOne').onCall(0).resolves(motorcycleMockWithId)
    .onCall(1).resolves(null);
    sinon.stub(motorcycleModel, 'update').onCall(0).resolves(motorcycleMockWithId)
    .onCall(1).resolves(null);
    sinon.stub(motorcycleModel, 'delete').onCall(0).resolves(motorcycleMockWithId)
    .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('quando usa o método create', () => {
    it('e cria com sucesso', async () => {
      const motorcycle = await motorcycleService.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  })

  describe('quando usa o método read', () => {
    it('e encontra com sucesso', async () => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.deep.equal(arrayMotorcycleMock);
    });
  })

  describe('quando usa o método readOne', () => {
    it('e encontra com sucesso', async () => {
      const motorcycle = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('e não encontra', async () => {
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('e o id é invalido', async () => {
      try {
        await motorcycleService.readOne('123');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })

  describe('quando usa o método update', () => {
    it('e altera com sucesso', async () => {
      const motorcycle = await motorcycleService.update('62cf1fc6498565d94eba52cd', motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('e não encontra o id', async () => {
      try {
        await motorcycleService.update('62cf1fc6498565d94eba52cd', motorcycleMock);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('e o id é invalido', async () => {
      try {
        await motorcycleService.update('123456', motorcycleMock);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })

  describe('quando usa o método delete', () => {
    it('e deleta com sucesso', async () => {
      const deletedMotorcycle = await motorcycleService.delete('62cf1fc6498565d94eba52cd');
      expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('e não encontra o id', async () => {
      try {
        await motorcycleService.delete('62cf1fc6498565d94eba52cd');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('e o id é invalido', async () => {
      try {
        await motorcycleService.delete('123456');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })
});