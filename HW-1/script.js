"use strict";

const goods = [
  { title: 'Shirt', price: 150, img: 'https://picsum.photos/id/237/200/300' },
  { title: 'Socks', price: 50, img: 'https://picsum.photos/id/238/200/300' },
  { title: 'Jacket', price: 350, img: 'https://picsum.photos/id/235/200/300' },
  { title: 'Shoes', price: 250, img: 'https://picsum.photos/id/232/200/300' },
  { title: 'Shoes', price: 250, img: 'https://picsum.photos/id/231/200/300' },
];

const renderGoodsItem = item => {
  return `<div class="goods-item">
  <img class="item-img" src="${item.img}" alt="product photo">
  <h3 class="item-title">${item.title}</h3>
  <p class="item-price">${item.price}</p>
  <button class="item-btn">Добавить</button></div>`;
};
const renderGoodsList = list => {
  document.querySelector('.goods-list').innerHTML = list
    .map(item => renderGoodsItem(item)).join('');
}
renderGoodsList(goods);