document.getElementById('form').addEventListener('submit', event => {
	let valid = new Validator('form');
	if (!valid.valid) {
		event.preventDefault();
	}
});

class Validator {
	constructor(form) {
		this.patterns = {
			name: /^[a-zа-яё]+$/i,
			phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
			email: /^[\w.-]+@\w+\.[a-z]{2,4}$/i,
		};
		this.errors = {
			name: 'Имя состоит только из букв',
			phone: 'Шаблон ввода +7(123)456-7890',
			email: 'Шаблон ввода mymail@mail.ru',
		};
		this.errorClass = 'error';
		this.form = form;
		this.valid = false;
		this._validateForm();
	}
	validate(regexp, value) {
		regexp.test(value);
	}
	_validateForm() {
		let errors = [
			...document
				.getElementById(this.form)
				.querySelectorAll(`.${this.errorClass}`),
		];
		for (let error of errors) {
			error.remove();
		}
		let formInputs = [
			...document
				.getElementById(this.form)
				.getElementsByClassName('form__input'),
		];
		for (let input of formInputs) {
			this._validate(input);
		}
		if (
			![...document.getElementById(this.form).querySelectorAll('.invalid')]
				.length
		) {
			this.valid = true;
		}
	}
	_validate(input) {
		if (this.patterns[input.name]) {
			if (!this.patterns[input.name].test(input.value)) {
				input.classList.add('invalid');
				this._addErrorMsg(input);
				this._watchInput(input);
			}
		}
	}
	_addErrorMsg(input) {
		let error = `<div class='${this.errorClass}'>${
			this.errors[input.name]
		}</div>`;
		input.parentNode.insertAdjacentHTML('beforeend', error);
	}
	_watchInput(input) {
		input.addEventListener('input', () => {
			let error = input.parentNode.querySelectorAll(`.${this.errorClass}`);
			if (this.patterns[input.name].test(input.value)) {
				input.classList.remove('invalid');
				input.classList.add('valid');
				if (!error) {
					error.remove();
				}
			} else {
				input.classList.remove('valid');
				input.classList.add('invalid');
				if (!error) {
					this._addErrorMsg(input);
				}
			}
		});
	}
}
