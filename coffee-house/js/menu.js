function GetDataFromJSON() {
    var requestURL = "../js/products.json";
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
        var dishes = request.response;
        window.onload = AddDidhesCards(dishes);
    };
}

function refresh() {
    const ItemsActive = document.querySelectorAll('.dishes_item_active>.dishes_item_item');
    for(let i = 4; i < ItemsActive.length; i++) {
        ItemsActive[i].classList.remove('hidden');
    }
    document.querySelector('.refresh').classList.remove('refresh_visible');
}

function AddDidhesCards(data) {
    for(let i = 0; i < data.length; i++) {
        let item = document.createElement("div");
        item.classList.add('dishes_item_item');

        let img_block = document.createElement("div");
        img_block.classList.add('img_block');

        let img = document.createElement("img");
        img.src = `../img/${data[i].name.replace(/ /g, '_')}.jpg`;
        let text_block = document.createElement("div");
        text_block.classList.add('text_block');
        let text_block_div = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.textContent = data[i].name;
        let p = document.createElement("p");
        p.textContent = data[i].description;
        let span = document.createElement("span");
        span.textContent = "$" + data[i].price;
        item.append(img_block);
        item.append(text_block);
        img_block.append(img);
        text_block.append(text_block_div);
        text_block.append(span);
        text_block_div.append(h2);
        text_block_div.append(p);
        if(data[i].category === "coffee") {
            document.querySelector('.coffee').append(item);
        }
        else if(data[i].category === "tea") {
            document.querySelector('.tea').append(item);
        }
        else {
            document.querySelector('.dessert').append(item);
        }
    }
    if(document.documentElement.clientWidth <= 768) {
        DataForMobile();
    }
}

function DishesAfterResize() {
    if(document.documentElement.clientWidth > 768) {
        const ItemsActive = document.querySelectorAll('.dishes_item_item');
        for(let i = 0; i < ItemsActive.length; i++) {
            ItemsActive[i].classList.remove('hidden');
        }
        document.querySelector('.refresh').classList.remove('refresh_visible');
    }
    else {
        const ItemsActive = document.querySelectorAll('.dishes_item_active>.dishes_item_item');
        if(ItemsActive.length > 4) {
            for(let i = 4; i < ItemsActive.length; i++) {
                ItemsActive[i].classList.add('hidden')
            }
            document.querySelector('.refresh').classList.add('refresh_visible');
        }
    }
}

GetDataFromJSON();

document.querySelector('.refresh').addEventListener("click", refresh);

window.addEventListener('resize', DishesAfterResize);

const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger_menu');

burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle('burger_menu_opened');
    burgerBtn.classList.toggle('burgeroff');
})

document.querySelector('.burger_menu').addEventListener("click", (event) => {
    if (event.target.closest('li')) {
        burgerMenu.classList.remove('burger_menu_opened');
        burgerBtn.classList.remove('burgeroff');
    }
    if (event.target.closest('.burger_menu_text')) {
        burgerMenu.classList.remove('burger_menu_opened');
        burgerBtn.classList.remove('burgeroff');
    }
})

function DataForMobile() {
    if(document.documentElement.clientWidth <= 768) {
        const ItemsActive = document.querySelectorAll('.dishes_item_active>.dishes_item_item');
        if(ItemsActive.length > 4) {
            for(let i = 4; i < ItemsActive.length; i++) {
                ItemsActive[i].classList.add('hidden')
            }
            document.querySelector('.refresh').classList.add('refresh_visible');
        }
        else {
            document.querySelector('.refresh').classList.remove('refresh_visible');
        }
    }
    else {
        document.querySelector('.refresh').classList.remove('refresh_visible');
    }
}

const MenuBtns = document.querySelector(".offer>.btns");
MenuBtns.onclick = function(event) {
    const inputs = document.querySelectorAll('.content_input');
    const inputChecked = document.querySelector('.checked');
    const Pages = document.querySelectorAll('.dishes_item')
    const PageActive = document.querySelector('.dishes_item_active');
    if (event.target === inputChecked)
    {
        return false;
    }
    if (event.target === inputs[0])
    {
        inputChecked.classList.toggle('checked');
        inputs[0].classList.toggle('checked');
        PageActive.classList.toggle("visible")
        setTimeout(function() {
            PageActive.classList.toggle("dishes_item_active");
        },300)
        setTimeout(function() {
            Pages[0].classList.add("dishes_item_active");
        },300)
        setTimeout(function() {
            Pages[0].classList.toggle("visible");
        },350)
        setTimeout(function() {
            DataForMobile();
        },350)
    }
    else if (event.target === inputs[1])
    {
        inputChecked.classList.toggle('checked');
        inputs[1].classList.toggle('checked');
        PageActive.classList.toggle("visible")
        setTimeout(function() {
            PageActive.classList.toggle("dishes_item_active");
        },300)
        setTimeout(function() {
            Pages[1].classList.add("dishes_item_active");
        },300)
        setTimeout(function() {
            Pages[1].classList.toggle("visible");
        },350)
        setTimeout(function() {
            DataForMobile();
        },350)
    }
    else if (event.target === inputs[2])
    {
        inputChecked.classList.toggle('checked');
        inputs[2].classList.toggle('checked');
        PageActive.classList.toggle("visible")
        setTimeout(function() {
            PageActive.classList.toggle("dishes_item_active");
        },300)
        setTimeout(function() {
            Pages[2].classList.add("dishes_item_active");
        },300)
        setTimeout(function() {
            Pages[2].classList.toggle("visible");
        },350)
        setTimeout(function() {
            DataForMobile();
        },350)
    }
}

function GetDataToModal(data, dishName) {
    let dishData = data.find(function(element) {
        return element.name === dishName;
    })
    document.querySelector('.modal>img').src = `../img/${dishData.name.replace(/ /g, '_')}.jpg`;
    document.querySelector('.modal_right>.header>h2').textContent = dishData.name;
    document.querySelector('.modal_right>.header>p').textContent = dishData.description;
    document.querySelector('.size1>span').textContent = dishData.sizes.s.size;
    document.querySelector('.size2>span').textContent = dishData.sizes.m.size;
    document.querySelector('.size3>span').textContent = dishData.sizes.l.size;
    document.querySelector('.Additives1>span').textContent = dishData.additives[0].name;
    document.querySelector('.Additives2>span').textContent = dishData.additives[1].name;
    document.querySelector('.Additives3>span').textContent = dishData.additives[2].name;
    SetTotalPrice(parseFloat(dishData.price));
}

function DeleteChecked() {
    const inputsModal = modal_right.querySelectorAll("input");
    inputsModal.forEach(element => {
        if(element.checked === true) {
            element.checked = false;
        }
    });
    inputsModal[0].checked = true;
}

document.body.addEventListener('click', (event) => {
    if(!event.target.closest('.modal') && !event.target.closest('.dishes_item_item')) {
        document.querySelector('.background_modal').classList.remove('opened');
        document.body.classList.remove('noScroll');
        DeleteChecked();
    }
})

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.background_modal').classList.remove('opened');
    document.body.classList.remove('noScroll');
    DeleteChecked();
})

document.querySelector('.dishes').addEventListener("click", function(event) {
    if(event.target.closest('.dishes_item_item')) {
        var requestURL = "../js/products.json";
        var request = new XMLHttpRequest();
        request.open("GET", requestURL);
        request.responseType = "json";
        request.send();
        request.onload = function () {
            var dishes = request.response;
            GetDataToModal(dishes, event.target.closest('.dishes_item_item').querySelector('h2').textContent);
        };
        document.querySelector('.background_modal').classList.add('opened');
        document.body.classList.add('noScroll');
    }
})

function SetTotalPrice(price) {
    if(document.getElementById('size1').checked === true) {
        price += 0.0;
    }
    if(document.getElementById('size2').checked === true) {
        price += 0.5;
    }
    if(document.getElementById('size3').checked === true) {
        price += 1.0;
    }
    if(document.getElementById('Additives1').checked === true) {
        price += 0.5;
    }
    if(document.getElementById('Additives2').checked === true) {
        price += 0.5;
    }
    if(document.getElementById('Additives3').checked === true) {
        price += 0.5;
    }
    price = price.toFixed(2);
    document.querySelector('.price').textContent = "$" + price.toString();
}

document.querySelector('.modal_right').addEventListener('click', function(event) {
    if(event.target.closest('input')) {
        var requestURL = "../js/products.json";
        var request = new XMLHttpRequest();
        request.open("GET", requestURL);
        request.responseType = "json";
        request.send();
        request.onload = function () {
            var dishes = request.response;
            let dishData = dishes.find(function(element) {
                return element.name === event.target.closest('.modal_right').querySelector('h2').textContent;
            })
            let price = parseFloat(dishData.price);
            SetTotalPrice(price);
        };
    }
})