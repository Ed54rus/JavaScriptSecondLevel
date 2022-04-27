"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

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

  constructor(container = '.goods-list') {
    this.container = container;
    this.goods = [];
    this._getGoods()
      .then(data => {
        this.goods = data;
        console.log(data);
        this.render();
      })
  }

  _getGoods() {

    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
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
// list.fetchGoods();
// list.render();
// list.getSum();


class Basket {
  addGood() { }
  removeGood() { }
  changeGood() { }
  render() { }
}

class ItemBasket {
  render() { }
}
