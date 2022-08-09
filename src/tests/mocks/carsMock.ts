import { ICar } from "../../interfaces/ICar";

export const carMock: ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
}

export const carMockWithId: ICar & { _id: string } = {
    _id: "62f2dbbf99be89a8ca48bae0",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
}