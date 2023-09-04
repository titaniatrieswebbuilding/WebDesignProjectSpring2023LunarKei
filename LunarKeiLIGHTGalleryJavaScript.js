// Light Gallery Page JavaScript

// Variables to store selected items
let selectedItems = [];

// Modal Elements
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.querySelector('.modal-image');
const modalItemInfo = document.querySelector('.modal-item-info');
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

// Function to open modal
function openModal(imageSrc, itemName, itemDescription) {
  modalImage.src = imageSrc;
  modalItemInfo.querySelector('h3').textContent = itemName;
  modalItemInfo.querySelector('p').textContent = itemDescription;
  modalOverlay.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modalOverlay.style.display = 'none';
}

// Event listeners
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Loop through "Add to Cart" buttons and attach event listeners
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const item = {
      name: galleryItems[index].name,
      price: galleryItems[index].price
    };
    selectedItems.push(item);
    updateCartIndicator();
  });
});
