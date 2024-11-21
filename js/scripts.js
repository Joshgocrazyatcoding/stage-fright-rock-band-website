/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Function to add items to the cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update the cart display (cart page)
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
}

// Function to load the cart page when it is visited
function loadCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        document.getElementById('cart').style.display = 'block';
        updateCartDisplay();
    } else {
        alert('Your cart is empty!');
    }
}

// Function to display the checkout page
function loadCheckoutPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsList = document.getElementById('order-items');
    const totalSpan = document.getElementById('order-total');
    orderItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
        orderItemsList.appendChild(li);
        total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
    document.getElementById('checkout-page').style.display = 'block';
}

// Proceed to Payment (mock function for now)
function proceedToPayment() {
    alert('Proceeding to payment...');
}

// Load the cart or checkout pages when necessary
window.onload = function () {
    if (window.location.pathname.includes('cart')) {
        loadCartPage();
    } else if (window.location.pathname.includes('checkout')) {
        loadCheckoutPage();
    }
};
