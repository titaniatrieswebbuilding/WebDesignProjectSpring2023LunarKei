document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-items-container");
  const totalValueContainer = document.querySelector(".total-value");
  const checkoutButton = document.querySelector(".checkout-button");
  const purchaseModal = document.querySelector(".purchase-modal");
  const purchaseModalClose = document.querySelector(".purchase-modal-close");

  let cartItems = [];

  // Function to update the cart items and total value
  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let totalValue = 0;

    cartItems.forEach((itemIndex) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      const item = galleryItems[itemIndex];

      const cartItemImage = document.createElement("img");
      cartItemImage.src = item.querySelector(".gallery-image").src;
      cartItemImage.classList.add("cart-item-image");

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");
      removeButton.addEventListener("click", () => {
        cartItems = cartItems.filter((index) => index !== itemIndex);
        updateCart();
      });

      cartItem.appendChild(cartItemImage);
      cartItem.appendChild(removeButton);
      cartItemsContainer.appendChild(cartItem);

      totalValue += parseFloat(item.querySelector(".item-info p").textContent.slice(1));
    });

    totalValueContainer.textContent = "$" + totalValue.toFixed(2);
  }

  // Handle checkout button click
  checkoutButton.addEventListener("click", () => {
    if (cartItems.length > 0) {
      purchaseModal.style.display = "block";
    }
  });

  // Close purchase modal
  purchaseModalClose.addEventListener("click", () => {
    purchaseModal.style.display = "none";
  });

  // You would need to fetch galleryItems using the appropriate selector here
  // This assumes galleryItems is an array of elements like in the Dark Gallery page script
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item, index) => {
    const addToCartButton = item.querySelector(".add-to-cart-button");

    addToCartButton.addEventListener("click", () => {
      cartItems.push(index);
      updateCart();
    });
  });
});
