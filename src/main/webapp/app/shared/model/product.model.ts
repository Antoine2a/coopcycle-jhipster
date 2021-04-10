import { IBasket } from 'app/shared/model/basket.model';
import { ICommerce } from 'app/shared/model/commerce.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  baskets?: IBasket[];
  commerce?: ICommerce[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public baskets?: IBasket[],
    public commerce?: ICommerce[]
  ) {}
}
