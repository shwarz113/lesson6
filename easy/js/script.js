//открыть магаз
let open_btn = document.getElementById('open-btn');

//меню магазина
let name = document.getElementsByClassName('name');
let name_value = document.getElementsByClassName('name-value')[0];
let budget = document.getElementsByClassName('budget');
let budget_value = document.getElementsByClassName('budget-value')[0];
let goods = document.getElementsByClassName('goods');
let goods_value = document.getElementsByClassName('goods-value')[0];
let items = document.getElementsByClassName('items');
let items_value = document.getElementsByClassName('items-value')[0];
let employers = document.getElementsByClassName('employers');
let employers_value = document.getElementsByClassName('employers-value')[0];
let discount = document.getElementsByClassName('discount');
let discount_value = document.getElementsByClassName('discount-value')[0];
let isopen = document.getElementsByClassName('isopen');
let isopen_value = document.getElementsByClassName('isopen-value')[0];

//категории товаров
let goods_item = document.getElementsByClassName('goods-item');

//кнопки
let goods_btn = document.getElementsByTagName('button')[1],
	budget_btn = document.getElementsByTagName('button')[2],
	employers_btn = document.getElementsByTagName('button')[3];

//поля ввода товаров, времени и расчета бюджета 
let choose_item = document.querySelector('.choose-item');
let time_value = document.querySelector('.time-value');
let count_budget_value = document.querySelector('.count-budget-value');
//поля имен сотрудников
let hire_employers_item = document.querySelectorAll('.hire-employers-item');

let money,
	price;

goods_btn.disabled = true;
budget_btn.disabled = true;
employers_btn.disabled = true;
count_budget_value.disabled = true;

open_btn.addEventListener('click', () => {
	money = prompt("Ваш бюджет на месяц?", '');
	mainList.open = true;
	while ((isNaN(money)) || money == "" || money == null) {
		money = prompt("Ваш бюджет на месяц?", '');
	}
	budget_value.textContent = money;
	name_value.textContent = prompt("Название вашего магазина?", 'Foxbone');
	goods_btn.disabled = false;
	budget_btn.disabled = false;
	employers_btn.disabled = false;
});

goods_btn.addEventListener('click', () => {
	for (let i = 0; i < goods_item.length; i++) {
		let a = goods_item[i].value;
		if ((typeof(a)) === 'string' && (typeof(a)) != null && a.length < 50) {
			console.log('Все верно!');
			mainList.shopGoods[i] = a;
			goods_value.textContent = mainList.shopGoods;
		} else {
			--i;
		}
	}
});

choose_item.addEventListener('change', () => {
	let items = choose_item.value;
	if (isNaN(items) && items != '') {
		mainList.shopItems = items.split(', ');
		mainList.shopItems.sort();

		items_value.textContent = mainList.shopItems;
	}
});

time_value.addEventListener('change', () => {
	let time = time_value.value;
	if (time < 0) {
		console.log('Такого просто не может быть');
		mainList.open = false;
		} else if (time > 8 && time < 20) {
			console.log('Время работать!');
			mainList.open = true;
			} else if (time < 24) {
				console.log('Уже слишком поздно');
				mainList.open = false;
				} else {
					console.log('В сутках только 24 часа!');
					mainList.open = false;
					}
	if (mainList.open == true) {
		isopen_value.style.backgroundColor = 'green';
	} else {
		isopen_value.style.backgroundColor = 'red';
	}
});

budget_btn.addEventListener('click', () => 
{
	count_budget_value.value = (money/30);
	
	//скидка
	
	let discount1 = prompt ('У вас есть скидочная карта (20%)? да/нет', 'да');
	console.log(discount1);
	console.log(typeof(discount1));
	if (discount1 == "да") {
		discount_value.style.backgroundColor = "green";
		discount_value.textContent = "У вас 20% скидка!"
		price = +prompt('Напишите стоимость: ', '1000');
		discount_value.textContent = "Старая цена: " + price + ". Новая цена: " + price*0.8;
	} else {
		discount_value.style.backgroundColor = "red";
		discount_value.textContent = "У вас нет скидки!"
	}
});

employers_btn.addEventListener ('click', () => {
	for (let i = 0; i < hire_employers_item.length; i++) {
		let nameMan = hire_employers_item[i].value;
		mainList.employers[i] = nameMan;
		employers_value.textContent += mainList.employers[i] + ', ';
	}
});

mainList = {
	budget: money,
	shopName: name,
	shopGoods: [],
	employers: {},
	open: false,
	discount: false,
	shopItems: [],
}