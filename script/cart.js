"use strict"
//ключ для названия обьекта корзины
const KEY = "cart95$@_3"

//записываем данные в хранилище
function setCartData(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj))
    return false
}

//получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem(KEY))
}

//очищаем корзину
export function clearCart(cartContent) {
    localStorage.removeItem(KEY)
    renderCart(cartContent)
}

//добавляем товар в корзину
export function addToCart(event, title, price) {
    let target = event.target
    target.disabled = true
    let cartData = getCartData() || {};
    let itemId = target.dataset.id
    let itemParent = target.parentElement
    let itemTitle = itemParent.querySelector(title).textContent;
    let itemPrice = itemParent.querySelector(price).textContent;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice]
    }
    if (setCartData(cartData)) {
        target.disabled = false
    }

}

//выовдим корзину на экран
export function renderCart(cartContent) {
    let cartData = getCartData()
    let totalItems;
    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = "Корзина пуста"
    } else {
        totalItems = "<table class='cart__table'><thead><tr><th>Название</th><th>Цена</th></tr></thead><tbody>";
        for (const id in cartData) {
            totalItems += "<tr>";
            for (const item of cartData[id]) {
                // totalItems += "<td>" + item + "</td>"
                totalItems += `<td>${item}</td>`
            }
            totalItems += `<td><button class="product__delete" data-id=${id}>Удалить</button></td></tr>`
        }
        totalItems += "</tbody></table>"
    }
    cartContent.innerHTML = totalItems
    addEventDeleteItemCart(cartContent)
}

//удаляем товар
function deleteItemCart(e, cartContent) {
    const itemId = e.target.dataset.id
    let cartData = getCartData();
    delete cartData[itemId]
    setCartData(cartData)
    renderCart(cartContent)

}

//добавляем событие для удаления товара
function addEventDeleteItemCart(cartContent) {
    const deleteItem = document.querySelectorAll(".product__delete")
    deleteItem.forEach((btn) => {
        btn.addEventListener("click", (e) => deleteItemCart(e, cartContent))
    })
}
// let cartData = {
//     1: [3,4]
// }
// console.log(cartData.hasOwnProperty(1))
// cartData["2"] = [1,2]

//let x = null || {}
//console.log(x)

//CART.clearCart()

/* let cartData = {
    itemId: [itemTitle, itemPrice]
} */
//CART.setCartData(obj)
//console.log(CART.getCartData())//null

