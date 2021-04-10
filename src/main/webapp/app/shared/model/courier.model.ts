import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';

export interface ICourier {
  id?: number;
  notation?: number;
  latitude?: number;
  longitude?: number;
  userCoopcycle?: IUserCoopcycle;
}

export class Courier implements ICourier {
  constructor(
    public id?: number,
    public notation?: number,
    public latitude?: number,
    public longitude?: number,
    public userCoopcycle?: IUserCoopcycle
  ) {}
}
