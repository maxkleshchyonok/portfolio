export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type CreateCar = {
  name: string;
  color: string;
}

export type UpdateCar = {
  name: string;
  color: string;
}

export type CarsInfo = {
    name: string;
    image: string;
    color: string;
    id: number;
}

export type WinArr = {
    velocity: number;
    id: number;
}
