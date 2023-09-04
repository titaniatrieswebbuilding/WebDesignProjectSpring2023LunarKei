document.addEventListener("DOMContentLoaded", function () {
  // Dark Gallery Page Script
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalContent = document.querySelector(".modal-content");
  const modalClose = document.querySelector(".modal-close");
  const cartIndicator = document.querySelector(".cart-indicator");
  const checkoutBadge = document.getElementById("checkout-badge");

  let cartItems = [];
  let cartQuantity = 0;

  galleryItems.forEach((item, index) => {
    const addToCartButton = item.querySelector(".add-to-cart-button");

    addToCartButton.addEventListener("click", () => {
      cartItems.push(index);
      cartQuantity++;
      cartIndicator.textContent = cartQuantity;
      checkoutBadge.textContent = cartQuantity;
    });

    item.addEventListener("click", () => {
      modalContent.querySelector(".modal-image").src = item.querySelector(".gallery-image").src;
      modalContent.querySelector("h3").textContent = item.querySelector(".item-info h3").textContent;
      modalContent.querySelector("p").textContent = item.querySelector(".item-info p").textContent;
      modalOverlay.style.display = "block";
    });
  });

  modalClose.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  // Checkout Page Script
  const cartItemsContainer = document.querySelector(".cart-items-container");
  const totalValueContainer = document.querySelector(".total-value");
  const checkoutButton = document.querySelector(".checkout-button");
  const purchaseModal = document.querySelector(".purchase-modal");
  const purchaseModalClose = document.querySelector(".purchase-modal-close");

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

  checkoutButton.addEventListener("click", () => {
    if (cartItems.length > 0) {
      purchaseModal.style.display = "block";
    }
  });

  purchaseModalClose.addEventListener("click", () => {
    purchaseModal.style.display = "none";
  });

  galleryItems.forEach((item, index) => {
    const addToCartButton = item.querySelector(".add-to-cart-button");

    addToCartButton.addEventListener("click", () => {
      cartItems.push(index);
      updateCart();
    });
  });
});
