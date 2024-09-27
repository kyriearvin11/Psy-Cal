let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showItem(index) {
    items.forEach(item => {
        item.style.transform = `translateX(-${index * 100}%)`;
    });
}

function slideRight() {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
}

function slideLeft() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
}

const slideInterval = setInterval(slideRight, 5000);

document.querySelector('.carousel-control.left').addEventListener('click', () => {
    clearInterval(slideInterval); 
    slideLeft();
});

document.querySelector('.carousel-control.right').addEventListener('click', () => {
    clearInterval(slideInterval); 
    slideRight();
});

showItem(currentIndex);
