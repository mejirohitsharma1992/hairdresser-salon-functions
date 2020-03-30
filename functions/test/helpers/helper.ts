import {IMock, Mock} from 'moq.ts';
import {ProductRepository} from '../../src/products/product.repository';
import {Product} from '../../src/models/product';
import {StockRepository} from '../../src/stock/stock.repository';
import {Stock} from '../../src/models/stock';
import {OrderRepository} from '../../src/orders/order.repository';
import {Order} from '../../src/models/order';
import {Orderline} from '../../src/models/orderline';

export class TestHelper {

  getProductRepositoryMock(): IMock<ProductRepository> {
    return new Mock<ProductRepository>()
      .setup(repo => repo.create(this.getProduct1()))
      .returns(Promise.resolve(this.getProduct1()));
  }

  getOrderRepositoryMock(): IMock<OrderRepository> {
    return new Mock<OrderRepository>();
  }

  getStockRepositoryMock(): IMock<StockRepository> {
    return new Mock<StockRepository>()
      .setup(stockRepo => stockRepo.create(this.getProduct1(), 5))
      .returns(Promise.resolve(this.getStock1()))
      .setup(stockRepo => stockRepo.lowerStock(this.getProduct1(), 1))
      .returns(Promise.resolve());
  }

  getProduct1(): Product {
    return this.product1;
  }

  getProduct2(): Product {
    return this.product2;
  }

  getStock1(): Stock {
    return this.stock1;
  }

  getOrder1(): Order {
    return this.order1;
  }

  getOrderLine1(): Orderline {
    return this.ol1;
  }

  stock1: Stock = {
    count: 1,
    product: this.getProduct1()
  };

  product1: Product = {
    name: 'Product 1',
    uId: 'p1',
    url: 'somewhere.com',
    price: 22,
    timesPurchased: 0
  };

  product2: Product = {
    name: 'Product 2',
    uId: 'p2',
    url: 'somewhereelse.com',
    price: 23,
    timesPurchased: 0
  };

  ol1: Orderline = {
    uId: 'ol1',
    product: this.getProduct1(),
    amount: 1
  }

   order1: Order = {
    uId: 'o1',
    date: Date.now(),
    orderLines: [this.getOrderLine1()],
    visible: false
   };

}
