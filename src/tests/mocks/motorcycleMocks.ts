import { IMotorcycle } from "../../interfaces/IMotorcycle";

export const motorcycleMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const arrayMotorcycleMock: IMotorcycle[] & { _id: string }[] = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  },
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 150
  }
]

export const motorcycleMockForChange: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3200,
  category: "Street",
  engineCapacity: 125
};

export const motorcycleMockForChangeWithId: IMotorcycle & { _id: string } = {
	_id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3200,
  category: "Street",
  engineCapacity: 125
};