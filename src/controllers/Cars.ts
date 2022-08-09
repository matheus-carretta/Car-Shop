import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    console.log(req.body)
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }
}

export default CarsController;