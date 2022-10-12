import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = ['Notes to summary', 'Advanced tweet classifier'];
const PRODUCT_PRICE = ['$0.8', '$0.09'];
const PRODUCT_COLOR = ['#00AB55', '#000000'];
const PRODUCT_STATUS = ['New', 'Coming Soon'];

// ----------------------------------------------------------------------

const products = [...Array(2)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/static/mock-images/products/product_${2}.jpg`,
    name: PRODUCT_NAME[index],
    price: PRODUCT_PRICE[index],
    priceSale: null,
    colors: (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) || PRODUCT_COLOR,
    status: PRODUCT_STATUS[index],
  };
});

export default products;
