import { putProduct } from './put-product';
import { getProducts } from './get-products';

export default {
  Query: {
    products: getProducts
  },
  Mutation: {
    putProduct
  }
};
