// Get references to the gallery items
const galleryItems = document.querySelectorAll(".gallery-item");
const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const modalImage = document.querySelector(".modal-image");
const modalItemInfo = document.querySelector(".modal-item-info");
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

// Common Local Storage Key
const CART_ITEMS_KEY = "lunarKeiCartItems";

// Function to open the modal with the respective data
function openModal(imageSrc, itemName, itemDescription) {
  modalOverlay.style.display = "block";
  modalImage.src = imageSrc;
  modalItemInfo.querySelector("h3").textContent = itemName;
  modalItemInfo.querySelector("p").textContent = itemDescription;
}

// Function to close the modal
function closeModal() {
  modalOverlay.style.display = "none";
}

// Add click event listeners to each gallery item
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const imageSrc = item.querySelector(".gallery-image").src;
    const itemName = item.querySelector("h3").textContent;
    const itemDescription = item.querySelector("p").textContent;
    openModal(imageSrc, itemName, itemDescription);
  });
});

// Close the modal when the close button is clicked
modalClose.addEventListener("click", closeModal);

// Close the modal when clicking outside the modal content
modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Function to add an item to the cart
function addToCart(imageSrc, itemName) {
  const cartItems = getCartItemsFromLocalStorage();
  const isItemInCart = cartItems.some((item) => item.name === itemName);

  if (!isItemInCart) {
    cartItems.push({ name: itemName, image: imageSrc });
    saveCartItemsToLocalStorage(cartItems);
    updateCartIndicator(cartItems.length);
  }
}

// Function to retrieve cart items from local storage
function getCartItemsFromLocalStorage() {
  const cartItemsJson = localStorage.getItem(CART_ITEMS_KEY);
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
}

// Function to save cart items to local storage
function saveCartItemsToLocalStorage(cartItems) {
  const cartItemsJson = JSON.stringify(cartItems);
  localStorage.setItem(CART_ITEMS_KEY, cartItemsJson);
}

// Function to update the cart indicator in the menu
function updateCartIndicator(cartItemsLength) {
  const checkoutBadge = document.getElementById('checkout-badge');
  checkoutBadge.textContent = cartItemsLength;
}

// Add click event listener to the entire gallery container
document.querySelector(".gallery-container").addEventListener("click", function (event) {
  const addToCartButton = event.target.closest(".add-to-cart-button");
  if (addToCartButton) {
    const galleryItem = addToCartButton.closest(".gallery-item");
    const imageSrc = galleryItem.querySelector(".gallery-image").src;
    const itemName = galleryItem.querySelector("h3").textContent;
    addToCart(imageSrc, itemName);
  }
});

// Add click event listeners to "Add to Cart" buttons in the gallery items and modal
addToCartButtons.forEach((button) => {
  const galleryItem = button.closest(".gallery-item");
  const imageSrc = galleryItem.querySelector(".gallery-image").src;
  const itemName = galleryItem.querySelector("h3").textContent;

  button.addEventListener("click", () => {
    addToCart(imageSrc, itemName);
  });
});
