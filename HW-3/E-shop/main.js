"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cart-button')
  .addEventListener('click', () => {
    cart.classList.toggle('active');
  });

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

  constructor(container = '.cart') {
    this.container = container;
    this.items = [];
    this._getItems()
      .then(data => {
        this.items = data.contents;
        this.render();
      });
  }

  _getItems() {

    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    let listHtml = '';
    this.items.forEach(item => {
      const itemBasket = new ItemBasket(item.id_product,
        item.product_name, item.price, item.quantity);
      listHtml += itemBasket.render();
    });
    document.querySelector('.cart').innerHTML = listHtml;
  }


  addGood(idx) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item['id_product'] === idx) {
        item['quantity']++;
        console.log(item);
        
      }
    }
  }


  removeGood(idx) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item['id_product'] === idx) {
        if (item['quantity'] > 1) {
          item['quantity']--;
          console.log(this.items[i]);
        } else {
          console.log('удаляем');
        }

      }
    }
  }

  deleteItem() {
    console.log('удаляем');
  }
}



class ItemBasket {
  constructor(id, title, price, quantity,
    img = 'https://via.placeholder.com/120x80') {

    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.img = img;
  }

  render() {

    return `<div class="cart__item" data-id="${this.id}">
    <button class="cart__item-btn delete-btn">X</button>
    <img class="cart__item-img" src="${this.img}" alt="Product pic">
    <span class="cart__item-name">${this.title}</span>
    <span class="cart__item-price">${this.price}</span>
    <button class="cart__item-btn remove-btn" data-id="${this.id}">-</button>
    <span class="cart__item-quan">${this.quantity}</span>
    <button class="cart__item-btn add-btn" data-id="${this.id}">+</button>
    </div>`;
  }
}
const item = new Basket();


const plus = document.querySelector('.cart').addEventListener('click', event => {
  if (!event.target.classList.contains('add-btn')) {
    return;
  }
  const idx = +event.target.dataset.id;
 
  item.addGood(idx);
});

const minus = document.addEventListener('click', event => {
  if (!event.target.classList.contains('remove-btn')) {
    return;
  }
  const idx = +event.target.dataset.id;
  item.removeGood(idx);
});


