import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';

export interface IClient {
  id?: number;
  adress?: string;
  userCoopcycle?: IUserCoopcycle;
}

export class Client implements IClient {
  constructor(public id?: number, public adress?: string, public userCoopcycle?: IUserCoopcycle) {}
}
