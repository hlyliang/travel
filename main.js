var defaultProducts = [
    { name: "宜~花現東台灣", price: 14000, image: "image/image1.jpg", date: "2024-01-15" },
    { name: "漫遊高雄", price: 8000, image: "image/image2.jpg", date: "2024-02-01" }
];

function goToGamePage() {
    window.location.href = "../game/index.html";
}

function slideToPrev() {
    var slideWrapper = document.querySelector(".slide-wrapper");
    var activeSlide = document.querySelector(".slide.active");

    if (activeSlide.previousElementSibling) {
        activeSlide.classList.remove("active");
        activeSlide.previousElementSibling.classList.add("active");

        var slideIndex = Array.from(slideWrapper.children).indexOf(activeSlide);
        slideWrapper.style.transform = "translateX(" + (-16.66 * slideIndex) + "%)";
    } else {
        var slides = document.querySelectorAll(".slide");
        slides[0].classList.remove("active");
        slides[slides.length - 1].classList.add("active");
        slideWrapper.style.transform = "translateX(" + (-16.66 * (slides.length - 1)) + "%)";
    }
}

function slideToNext() {
    var slideWrapper = document.querySelector(".slide-wrapper");
    var activeSlide = document.querySelector(".slide.active");

    if (activeSlide.nextElementSibling) {
        activeSlide.classList.remove("active");
        activeSlide.nextElementSibling.classList.add("active");

        var slideIndex = Array.from(slideWrapper.children).indexOf(activeSlide);
        slideWrapper.style.transform = "translateX(" + (-16.66 * (slideIndex + 1)) + "%)";
    } else {
        var slides = document.querySelectorAll(".slide");
        slides[slides.length - 1].classList.remove("active");
        slides[0].classList.add("active");
        slideWrapper.style.transform = "translateX(0)";
    }
}

function displayLatestProducts() {
    var latestShowcaseContainer = document.getElementById("latestShowcaseContainer");
    latestShowcaseContainer.innerHTML = "";

    var allProducts = defaultProducts;

    for (var i = 0; i < allProducts.length; i++) {
        var product = allProducts[i];
        createShowcaseItem(product, i, latestShowcaseContainer);
    }
}

function createShowcaseItem(product, index, container) {
    var showcaseItem = document.createElement("div");
    showcaseItem.className = "showcase-item";

    // 创建产品展示项的HTML结构
    var productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "Product Image";

    // 添加点击事件监听器，传递产品索引作为参数
    productImage.addEventListener("click", function () {
        displayProductInfo(product);
    });

    var productName = document.createElement("h3");
    productName.textContent = product.name;

    // 添加到展示项中
    showcaseItem.appendChild(productImage);
    showcaseItem.appendChild(productName);

    container.appendChild(showcaseItem);
}

function displayProductInfo(product) {
    // 设置产品信息弹窗的内容
    var modal = document.getElementById("product-info-modal");
    var productImage = document.getElementById("product-image");
    var nameElement = document.getElementById("product-name");
    var priceElement = document.getElementById("product-price-value");
    var dateElement = document.getElementById("product-date-value");

    productImage.src = product.image;
    nameElement.textContent = product.name;
    dateElement.textContent = "演出日期: " + product.date;

    // 清空价格元素的内容
    priceElement.textContent = "";

    // 添加价格信息到价格元素
    var priceText = document.createElement("p");
    priceText.textContent = "價格: " + product.price;
    priceElement.appendChild(priceText);

    // 显示产品信息弹窗
    modal.style.display = "block";
}


var currentProductIndex = -1;

function viewProductDetails() {
    // 实现查看产品详情的逻辑
    if (currentProductIndex >= 0 && currentProductIndex < defaultProducts.length) {
        // 获取当前产品
        var product = defaultProducts[currentProductIndex];

        // 更新当前产品索引
        currentProductIndex = -1;

        // 显示产品信息弹窗
        displayProductInfo(product);
    }
}

function showProductInfo(productIndex) {
    // 将产品索引存储到全局变量中
    currentProductIndex = productIndex;

    // 显示产品信息弹窗
    var modal = document.getElementById("product-info-modal");
    modal.style.display = "block";
}

function goToProductDetailsPage() {
    window.location.href = "../product/index.html";
}

function closeProductInfo() {
    // 实现关闭产品信息弹窗的逻辑
    var modal = document.getElementById("product-info-modal");
    modal.style.display = "none";
}

function logout() {
    localStorage.clear();
    window.location.href = "../index.html";
}

var searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        // 如果按下的是 Enter 键 (keyCode 为 13)，则触发搜索函数
        search();
    }
});

function search() {
    // 实现搜索产品的逻辑
    var searchInput = document.getElementById("search-input");
    var searchText = searchInput.value.trim().toLowerCase();

    var dateInput = document.getElementById("date-input");
    var selectedDate = dateInput.value;

    var filteredProducts = [];

    if (searchText !== "") {
        filteredProducts = defaultProducts.filter(function (product) {
            var nameMatch = product.name.toLowerCase().includes(searchText);
            var dateMatch = selectedDate === "" || product.date >= selectedDate;
            return nameMatch && dateMatch;
        });
    } else {
        filteredProducts = defaultProducts.filter(function (product) {
            return product.date >= selectedDate;
        });
    }

    if (filteredProducts.length > 0) {
        displayFilteredProducts(filteredProducts);
    } else {
        displayNoResults();
    }
}

function displayFilteredProducts(products) {
    var latestShowcaseContainer = document.getElementById("latestShowcaseContainer");
    latestShowcaseContainer.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        createShowcaseItem(product, i, latestShowcaseContainer);
    }
}

function displayNoResults() {
    var latestShowcaseContainer = document.getElementById("latestShowcaseContainer");
    latestShowcaseContainer.innerHTML = "";

    var noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "查無此商品";
    noResultsMessage.style.textAlign = "center";

    latestShowcaseContainer.appendChild(noResultsMessage);
}

displayLatestProducts();
