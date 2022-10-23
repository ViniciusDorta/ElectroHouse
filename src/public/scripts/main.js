$('.slider-principal').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000
});

$(document).ready(function () {
    $('#valor').mask('###0.00', { reverse: true });
})