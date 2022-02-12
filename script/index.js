"use strict"

import { renderCart, addToCart, clearCart as clearCartFunc } from "./cart.js"

const openCart = document.getElementById("open-cart")
const cart = document.getElementById("cart")
const clearCart = document.getElementById("clear-cart")
const cartContent = document.getElementById("cart-content")
const cartClose = document.getElementById("cart-close")
const addCart = document.querySelectorAll(".product__add-cart")

cartClose.addEventListener("click", () => cart.style.display = "none")
openCart.addEventListener("click", () => {
    renderCart(cartContent)
    cart.style.display = "flex"
})
for (const btn of addCart) {
    btn.addEventListener("click", (event) => addToCart(event, ".product__tittle", ".product__price"))
}

const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");
document.documentElement.addEventListener("click", (e) => {
    if (e.target === searchIcon || e.target === searchInput) {
        searchIcon.style.display = "none";
        searchInput.style.display = "block";
        searchInput.focus();
    } else {
        searchIcon.style.display = "block";
        searchInput.style.display = "none";
    }
})
clearCart.addEventListener("click", clearCartFunc.bind(this, cartContent))


/* let user = {
    name: "Вася",
    age: 20,
    isStudent: true,
    1: true
}
console.log(Object.keys(user)) */