import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';

export interface IMerchant {
  id?: number;
  userCoopcycle?: IUserCoopcycle;
}

export class Merchant implements IMerchant {
  constructor(public id?: number, public userCoopcycle?: IUserCoopcycle) {}
}
