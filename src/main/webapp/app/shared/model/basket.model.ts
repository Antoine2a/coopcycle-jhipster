import { ICourse } from 'app/shared/model/course.model';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { ICommerce } from 'app/shared/model/commerce.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IBasket {
  id?: number;
  totalprice?: number;
  destination?: string;
  courses?: ICourse[];
  userCoopcycle?: IUserCoopcycle;
  commerce?: ICommerce;
  products?: IProduct[];
}

export class Basket implements IBasket {
  constructor(
    public id?: number,
    public totalprice?: number,
    public destination?: string,
    public courses?: ICourse[],
    public userCoopcycle?: IUserCoopcycle,
    public commerce?: ICommerce,
    public products?: IProduct[]
  ) {}
}
