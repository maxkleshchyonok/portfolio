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

export type EachCar = {
    id: number,
    velocity: number,
    distance: number,
}

export type WinnersStat = {
    id: number,
    time: number,
    wins: number,
}
