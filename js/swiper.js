//製品スライダー
const productSwiper = new Swiper(".product_swiper", {
    loop: true,
    speed: 500,
    spaceBetween: 0,
    centeredSlides: false,
    autoplay: {
        delay: 2000,
    },
    breakpoints: {
        0: {
            slidesPerView: "1",
        },
        650: {
            slidesPerView: "3",
        },
    },
});
// 販売店舗スライダー
const salesStoreSwiper = new Swiper(".swiper", {
    loop: true,
    // 前後の矢印
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
