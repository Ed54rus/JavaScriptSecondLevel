'use strict';

let str = document.querySelector('.text');
document.querySelector('.btn').addEventListener('click', event => {
	event.preventDefault();
	// str.textContent = str.textContent.replace(/'/g, '"');
	str.textContent = str.textContent.replace(/\B'|'\B/g, '"');
});
