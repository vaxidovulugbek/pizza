const menuList = document.querySelector(".menu__list");
const cartList = document.querySelector(".cart__list");
const subtotal = document.querySelector(".subtotal");
const tax = document.querySelector(".tax")
const eltotal = document.querySelector(".total")
let newPizzaArray = [];
let total = 0;

pizzaArray.forEach((item) => {
  let li = document.createElement("li");
  li.className = "menu__item pizza";
  li.innerHTML = `
  <img class="pizza__img" src=${item.imgUrl} alt="pizza" />
  <div class="pizza__name">
    <p class="pizza__p">${item.name}</p>
    <span class="pizza__price">$${item.price}</span>
    <button class="pizza__btn" onclick="addItemArray(${item.id})">
      Add to Cart
    </button>
  </div>
  `;

  menuList.appendChild(li);
});

function addItemArray(listId) {
  newPizzaArray.push(pizzaArray.filter((item) => item.id === listId)[0]);
  addCart(newPizzaArray);
}

function addCart(cartPizzaArray) {
  let arr = cartPizzaArray;
  let topArr = [];

  arr.forEach((item) => {
    if (arr != "") topArr.push(arr[0]);
    arr = arr.filter((el) => {
      return arr[0].id != el.id;
    });
  });

  let li = 0;
  let listArr = [];
  total = 0;

  topArr.forEach((item) => {
    let count = cartPizzaArray.filter((element) => {
      return element.id == item.id;
    });
    li = `
    <li class="menu__item pizza cart__item">
      <img class="pizza__img" src=${item.imgUrl} alt="pizza" />
      <div class="pizza__name">
        <p class="pizza__p">${item.name}</p>
        <span id="total" class="count">
          ${count.length}
        </span>
        <span class="pizza__price">$${item.price}</span>
        <div class="btn-group">
          <button class="pizza__btn remove" onclick="addItemArray(${item.id})">
            +
          </button>
          <button class="pizza__btn remove" onclick="remove(${item.id})">
            -
          </button>
        </div>
      </div>
    </li>
    `;

    listArr.push(li);
    cartList.innerHTML = listArr.join("");
  });

  cartPizzaArray.forEach((item) => {
    total += item.price;
  });

  subtotal.innerHTML = total.toFixed(2);
  tax.innerHTML = ((total * 10) / 100).toFixed(2)
  eltotal.textContent = (eval( subtotal.innerHTML) + eval( tax.innerHTML)).toFixed(2)
}

function remove(elId) {
  let count = 0;
  let a = [];

  newPizzaArray.forEach((element) => {
    if (element.id === elId && count === 0) {
      count++;
    } else {
      a.push(element);
    }
  });

  newPizzaArray = a;
  if (newPizzaArray.length === 0) {
    cartList.innerHTML = "";
  }
  addCart(newPizzaArray);
}