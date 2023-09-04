document.addEventListener("DOMContentLoaded", function () {
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
});
