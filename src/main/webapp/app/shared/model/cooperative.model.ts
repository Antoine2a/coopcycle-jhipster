import { ICommerce } from 'app/shared/model/commerce.model';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';

export interface ICooperative {
  id?: number;
  adress?: string;
  commerce?: ICommerce[];
  userCoopcycle?: IUserCoopcycle;
}

export class Cooperative implements ICooperative {
  constructor(public id?: number, public adress?: string, public commerce?: ICommerce[], public userCoopcycle?: IUserCoopcycle) {}
}
