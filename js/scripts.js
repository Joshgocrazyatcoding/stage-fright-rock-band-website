/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

alert("Thank You for visiting the website!");

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

const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function prevSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Optional: Auto slide every 5 seconds
        setInterval(nextSlide, 5000);

function updateClock() {
    const now = new Date();
    const targetDate = new Date("February 3, 2025 00:00:00");
    const difference = targetDate - now;

    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;

    // Highlight current day
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    days.forEach(day => document.getElementById(day).classList.remove('active'));
    document.getElementById(days[now.getDay()]).classList.add('active');

    // Countdown calculation
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(d).padStart(2, '0');
    document.getElementById('hours-countdown').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes-countdown').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds-countdown').textContent = String(s).padStart(2, '0');
}

// Update every second
setInterval(updateClock, 1000);
// Initial call to prevent delay
updateClock();