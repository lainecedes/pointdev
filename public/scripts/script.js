document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.project-carousel', {
        loop: true,
        spaceBetween: 50,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 2,
            },
        },
    });

    var menuButton = document.querySelector(".menu-button");
    menuButton.addEventListener("click", menuActive);

    function menuActive() {
        var navBar = document.querySelector(".navbar");
        navBar.classList.toggle("active");
    }
    var menuLinks = document.querySelectorAll(".navbar .menu ul li a");

    menuLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            var navBar = document.querySelector(".navbar");
            navBar.classList.remove("active");
        });
    });
});
