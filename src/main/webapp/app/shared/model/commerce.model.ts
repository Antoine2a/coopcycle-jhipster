import { IBasket } from 'app/shared/model/basket.model';
import { IProduct } from 'app/shared/model/product.model';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { TypeCommerce } from 'app/shared/model/enumerations/type-commerce.model';

export interface ICommerce {
  id?: number;
  adress?: string;
  notationCommerce?: number;
  type?: TypeCommerce;
  baskets?: IBasket[];
  products?: IProduct[];
  userCoopcycle?: IUserCoopcycle;
  cooperatives?: ICooperative[];
}

export class Commerce implements ICommerce {
  constructor(
    public id?: number,
    public adress?: string,
    public notationCommerce?: number,
    public type?: TypeCommerce,
    public baskets?: IBasket[],
    public products?: IProduct[],
    public userCoopcycle?: IUserCoopcycle,
    public cooperatives?: ICooperative[]
  ) {}
}
