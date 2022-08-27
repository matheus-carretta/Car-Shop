import { expect } from 'chai';
import * as sinon from 'sinon';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { ErrorTypes } from '../../../errors/catalog'
import { carMock, carMockWithId, arrayCarMock } from '../../mocks/carsMock';


describe('Car Service', () => {
  const carModel = new CarsModel();
  const carService = new CarsService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(arrayCarMock);
    sinon.stub(carModel, 'readOne').onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
    sinon.stub(carModel, 'update').onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);
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

  describe('quando usa o método readOne', () => {
    it('e encontra com sucesso', async () => {
      const newCar = await carService.readOne(carMockWithId._id);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('e não encontra', async () => {
      try {
        await carService.readOne(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('e o id é invalido', async () => {
      try {
        await carService.readOne('123');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })

  describe('quando usa o método update', () => {
    it('e altera com sucesso', async () => {
      const newCar = await carService.update('62cf1fc6498565d94eba52cd', carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('e não encontra o id', async () => {
      try {
        await carService.update('62cf1fc6498565d94eba52cd', carMock);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('e o id é invalido', async () => {
      try {
        await carService.update('123456', carMock);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })

  describe('quando usa o método delete', () => {
    it('e deleta com sucesso', async () => {
      const deletedCar = await carService.delete('62cf1fc6498565d94eba52cd');
      expect(deletedCar).to.be.deep.equal(carMockWithId);
    });

    it('e não encontra o id', async () => {
      try {
        await carService.delete('62cf1fc6498565d94eba52cx');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('e o id é invalido', async () => {
      try {
        await carService.delete('123456');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });
  })
});