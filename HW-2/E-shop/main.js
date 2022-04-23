"use strict";

class GoodsItem {
  constructor(title, price, id, img = 'https://via.placeholder.com/200x150') {
    this.title = title;
    this.price = price;
    this.id = id;
    this.img = img;
  }

  render() {
    return `<div class="goods-item" data-id="${this.id}">
    <img class="item-img" src="${this.img}" alt="Product pic">
    <h3 class="item-title">${this.title}</h3>
    <p class="item-price">${this.price}</p>
    <button class="item-btn">Добавить</button></div>`;
  }
}

class GoodsList {

  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Shirt', price: 150 },
      { id: 2, title: 'Socks', price: 50 },
      { id: 3, title: 'Jacket', price: 350 },
      { id: 4, title: 'Shoes', price: 250 },
      { id: 5, title: 'Shoes', price: 250 },
      { id: 6, title: 'Shirt', price: 150 },
      { id: 7, title: 'Socks', price: 50 },
      { id: 8, title: 'Jacket', price: 350 },
      { id: 9, title: 'Shoes', price: 250 },
      { id: 10, title: 'Shoes', price: 250 },
    ];
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.id);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  getSum() {
    let sum = this.goods.reduce((acc, good) => acc + good.price, 0);
    alert(sum)
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.getSum();


class Basket {
  addGood() { }
  removeGood() { }
  changeGood() { }
  render() { }
}

class ItemBasket {
  render() { }
}
