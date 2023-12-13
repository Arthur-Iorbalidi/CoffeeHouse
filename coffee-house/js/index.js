const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger_menu');

burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle('burger_menu_opened');
    burgerBtn.classList.toggle('burgeroff');
    document.body.classList.toggle('noScroll');
})

document.querySelector('.burger_menu').addEventListener("click", (event) => {
    if (event.target.closest('li')) {
        burgerMenu.classList.remove('burger_menu_opened');
        burgerBtn.classList.remove('burgeroff');
        document.body.classList.remove('noScroll');
    }
    if (event.target.closest('.burger_menu_text')) {
        burgerMenu.classList.remove('burger_menu_opened');
        burgerBtn.classList.remove('burgeroff');
        document.body.classList.remove('noScroll');
    }
})

let interval;

function NextSlide() {
    ChangeSlide(currentSlide += 1);
}

function PrevSlide() {
    ChangeSlide(currentSlide -= 1);
}

function ChangePagination() {
    document.querySelector('.pagination_item_active').classList.remove('pagination_item_active');
    document.querySelectorAll('.pagination_item')[currentSlide].classList.add('pagination_item_active')
}

document.querySelectorAll('.pagination_item>.line').forEach(elem => {
    elem.style.width = 0 + '%';
})

function FillPagination() {
    const width = document.querySelector('.pagination_item_active>.line').style.width;
    document.querySelector('.pagination_item_active>.line').style.width = parseFloat(width.slice(0, -1)) + 1 + '%';
    if(document.querySelector('.pagination_item_active>.line').style.width.slice(0, -1) > 100) {
        NextSlide();
    }
}

function StartInterval() {
    interval = setInterval(FillPagination, 50);
}

function StopInterval() {
    clearInterval(interval);
}

StartInterval();

function ChangeSlide(NumberOfSlide) {
    if(currentSlide < 0) {
        currentSlide = 2;
    }
    else if (currentSlide > 2) {
        currentSlide = 0
    }
    else {
        currentSlide = NumberOfSlide;
    }
    document.querySelector('.pagination_item_active>.line').style.width = 0 + '%';
    ChangePagination();
    document.querySelector('.FavoriteCoffee_slider_div_container').style.right = (100 * currentSlide) + '%';
}
let currentSlide = 0;

document.querySelector('.arrowLeft').addEventListener('click', PrevSlide);
document.querySelector('.arrowRight').addEventListener('click', NextSlide);
document.querySelectorAll('.pagination_item')[0].addEventListener('click', function() {
    ChangeSlide(0);
});
document.querySelectorAll('.pagination_item')[1].addEventListener('click', function() {
    ChangeSlide(1);
});
document.querySelectorAll('.pagination_item')[2].addEventListener('click', function() {
    ChangeSlide(2);
});

const Sliders = document.querySelectorAll('.FavoriteCoffee_slider_div_container_item');

Array.from(Sliders).forEach(elem => {
    elem.addEventListener('mouseenter', StopInterval);
    elem.addEventListener('mouseleave', StartInterval);
    elem.addEventListener('touchstart', StopInterval);
    elem.addEventListener('touchend', StartInterval);
    
    elem.addEventListener('touchstart', SwipeStart);
    elem.addEventListener('touchmove', SwipeMove);
    elem.addEventListener('touchend', SwipeEnd);
})

let SwipeStartPosition = 0;
let SwipeEndPosition = 0;
let IsSwipe = false;

function SwipeStart(event) {
    SwipeStartPosition = event.touches[0].clientX;
    IsSwipe = false;
}

function SwipeMove(event) {
    SwipeEndPosition = event.touches[0].clientX;
    IsSwipe = true;
}

function SwipeEnd() {
    if(IsSwipe) {
        Swipe();
    }
}
function Swipe() {
    if(SwipeStartPosition - SwipeEndPosition > 50) {
        NextSlide();
    }
    else if(SwipeEndPosition - SwipeStartPosition > 50) {
        PrevSlide();
    }
}