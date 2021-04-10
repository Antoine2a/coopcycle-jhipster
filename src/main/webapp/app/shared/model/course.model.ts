import { IBasket } from 'app/shared/model/basket.model';

export interface ICourse {
  id?: number;
  idCourse?: number;
  basket?: IBasket;
}

export class Course implements ICourse {
  constructor(public id?: number, public idCourse?: number, public basket?: IBasket) {}
}
