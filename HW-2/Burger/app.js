"use strict";

window.onload = () => {
  document.querySelector('#makeBurger').addEventListener('click', (event) => {
    event.preventDefault();
    const burger = new Burger('size', 'add', 'toping');
    burger.showSum("#price", "#calories");
  });
}