import { isValidObjectId } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';

class MotorcycleService implements IService<IMotorcycle> { 
  private _motorcycle:IModel<IMotorcycle>;
  constructor(model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:IMotorcycle):Promise<IMotorcycle> {
    return this._motorcycle.create(obj);
  }

  public async read():Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(id: string):Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);
    const motorcycle = await this._motorcycle.readOne(id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    return motorcycle;
  }

  public async update(
    id: string, 
    payload: IMotorcycle,
  ):Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._motorcycle.update(id, payload);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async delete(id: string):Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._motorcycle.delete(id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }
}

export default MotorcycleService;