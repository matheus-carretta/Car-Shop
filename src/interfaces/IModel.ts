export interface IModel<T> {
  create(payload: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(id: string): Promise<T | null>,
  update(id: string, payload: T): Promise<T | null>,
  delete(id: string): Promise<T | null>
}