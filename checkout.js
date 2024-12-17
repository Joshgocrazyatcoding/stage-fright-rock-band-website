let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}

checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.buttonCheckout');
    
    checkoutButton.addEventListener('click', (e) => {
        // Prevent default form submission
        e.preventDefault();

        // Get form input values
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        const countryInput = document.getElementById('country');
        const cityInput = document.getElementById('city');
        
        // Collect input values
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();
        const country = countryInput.value;
        const city = cityInput.value;
        
        // Basic validation
        if (!nameInput || !phoneInput || !addressInput || !countryInput || !cityInput) {
            alert('Please fill in all fields before checkout');
            return;
        }
        
        // Prepare order summary from existing page elements
        const totalQuantity = document.querySelector('.totalQuantity').textContent;
        const totalPrice = document.querySelector('.totalPrice').textContent;
        
        // Prepare order data object
        const orderData = {
            customerName: name,
            phone: phone,
            address: address,
            country: country,
            city: city,
            totalQuantity: totalQuantity,
            totalPrice: totalPrice,
            items: [] // You could populate this with cart items if needed
        };
        
        // Simulate sending data to server (replace with actual API call)
        try {
            // Simulated server send - in real-world, this would be an actual fetch/ajax call
            console.log('Sending order:', orderData);
            
            // Clear the form
            nameInput.value = '';
            phoneInput.value = '';
            addressInput.value = '';
            countryInput.selectedIndex = 0;
            cityInput.selectedIndex = 0;
            
            // Create a thank you page redirect
            const confirmationPage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Order Confirmation</title>
                <style>
                    body {
                        font-family: monospace;
                        background: linear-gradient(45deg, #8b0000, #c21807);
                        color: yellow;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                    }
                    .confirmation {
                        background-color: rgba(0,0,0,0.7);
                        padding: 30px;
                        border-radius: 20px;
                        max-width: 500px;
                    }
                </style>
            </head>
            <body>
                <div class="confirmation">
                    <h1>Thank You for Your Purchase!</h1>
                    <p>Order Details:</p>
                    <p>Name: ${name}</p>
                    <p>Total Quantity: ${totalQuantity}</p>
                    <p>Total Price: ${totalPrice}</p>
                    <p>Your order is being processed.</p>
                    <a href="cart.html" style="color: yellow;">Return to Shop</a>
                </div>
            </body>
            </html>
            `;
            
            // Open the confirmation page
            const confirmationWindow = window.open('', '_blank');
            confirmationWindow.document.write(confirmationPage);
            
        } catch (error) {
            console.error('Checkout error:', error);
            alert('There was an error processing your order. Please try again.');
        }
    });
});