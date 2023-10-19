var orderButtons = document.getElementsByClassName('order-button');
var cartItems = document.getElementById('cart-items');
var totalPrice = document.getElementById('total-price');
var orderCount = document.getElementById('order-count');
var confirmOrderButton = document.getElementById('confirm-order-button');

var cart = [];
var totalCost = 0;

for (var i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener('click', function() {
        var pizzaItem = this.parentElement;
        pizzaItem.classList.add('ordered');
        this.textContent = 'В кошику';

        var pizzaName = pizzaItem.getElementsByTagName('h2')[0].textContent;
        var pizzaPrice = 10; 

        cart.push({ name: pizzaName, price: pizzaPrice });
        updateCart();
    });
}

confirmOrderButton.addEventListener('click', function() {
    if (cart.length > 0) {
        alert('Дякую за ваше замовлення!');
        cart = [];
        for(var j = 0; j < orderButtons.length; j++){
            orderButtons[j].textContent = 'Замовити';
            orderButtons[j].parentElement.classList.remove('ordered');
        }
        updateCart();
    } else {
        alert('Ваш кошик порожній. Замовлення не може бути підтверджене.');
    }
});

function updateCart() {
    cartItems.innerHTML = '';
    totalCost = 0;

    for (var i = 0; i < cart.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = cart[i].name + ' - $' + cart[i].price;
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        (function(index) {
            removeButton.addEventListener('click', function() {
                removeFromCart(index);
                for(var j = 0; j < orderButtons.length; j++){
                    orderButtons[j].textContent = 'Замовити';
                    orderButtons[j].parentElement.classList.remove('ordered');
                }
            });
        })(i);
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
        totalCost += cart[i].price;
    }

    totalPrice.textContent = 'Загальна вартість: $' + totalCost;
    orderCount.textContent = 'Піц в кошику: ' + cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
