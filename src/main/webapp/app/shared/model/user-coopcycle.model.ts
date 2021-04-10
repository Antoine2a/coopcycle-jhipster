import { ICommerce } from 'app/shared/model/commerce.model';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { IBasket } from 'app/shared/model/basket.model';
import { ICourier } from 'app/shared/model/courier.model';
import { IClient } from 'app/shared/model/client.model';
import { IMerchant } from 'app/shared/model/merchant.model';

export interface IUserCoopcycle {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  commerce?: ICommerce;
  cooperative?: ICooperative;
  baskets?: IBasket[];
  courier?: ICourier;
  client?: IClient;
  merchant?: IMerchant;
}

export class UserCoopcycle implements IUserCoopcycle {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public email?: string,
    public phone?: string,
    public commerce?: ICommerce,
    public cooperative?: ICooperative,
    public baskets?: IBasket[],
    public courier?: ICourier,
    public client?: IClient,
    public merchant?: IMerchant
  ) {}
}
