// Combined JavaScript File (LunarKeiCombinedJavaScript.js)

// Cart Items
const cartItems = [];

// Dark and Light Gallery Item Buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemInfo = button.parentElement.querySelector('.item-info');
    const itemName = itemInfo.querySelector('h3').textContent;
    const itemPrice = parseFloat(itemInfo.querySelector('p').textContent.replace('€', ''));
    const itemImage = button.parentElement.querySelector('.gallery-image').src;

    const cartItem = {
      name: itemName,
      price: itemPrice,
      image: itemImage
    };

    cartItems.push(cartItem);
    updateCartIndicator();
  });
});

// Update Cart Indicator
function updateCartIndicator() {
  const cartIndicator = document.querySelector('.cart-indicator');
  cartIndicator.textContent = cartItems.length;
}

// Checkout Page
if (window.location.pathname.includes('LunarKeiCHECKOUThtml.html')) {
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const totalValueContainer = document.querySelector('.total-value');

  function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    let totalValue = 0;

    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <img class="cart-item-image" src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>€${item.price.toFixed(2)}</p>
        <button class="remove-button" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItemElement);

      totalValue += item.price;
    });

    totalValueContainer.textContent = `Total Value: €${totalValue.toFixed(2)}`;
  }

  displayCartItems();

  // Remove Item from Cart
  cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('remove-button')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      cartItems.splice(index, 1);
      displayCartItems();
      updateCartIndicator();
    }
  });

  // Checkout Button
  const checkoutButton = document.querySelector('.checkout-button');
  checkoutButton.addEventListener('click', () => {
    const purchaseModal = document.querySelector('.purchase-modal');
    purchaseModal.style.display = 'block';
  });

  // Close Purchase Modal
  const purchaseModalClose = document.querySelector('.purchase-modal-close');
  const purchaseModal = document.querySelector('.purchase-modal');
  purchaseModalClose.addEventListener('click', () => {
    purchaseModal.style.display = 'none';
  });
  purchaseModal.addEventListener('click', event => {
    if (event.target === purchaseModal) {
      purchaseModal.style.display = 'none';
    }
  });
}
