const elem50 = $('.advert-price').find('.advert-ability[data-need]');
const cycleRange = ((num) => {
    for (let i = 0; i < num; i++) {
        elem50.get(i).classList.add('advert-ability_active');
    }
    for (let z = num; z < elem50.length; z++) {
        elem50.get(z).classList.remove('advert-ability_active');
    }
});
$(".js-range-slider").ionRangeSlider({
    from: 2,
    grid: true,
    grid_snap: true,
    values: [
        '50',
        '100',
        '150',
        '200',
        '250',
        '300',
        '350',
        '400',
        '450',
        '500',
        '550',
        '600',
        '650',
        '700',
        '750',
        '800',
        '850',
        '900',
        '950',
        '1 млн',
        '∞',
    ],
    onChange: function (data) {
        $('.advert-price').removeClass('advert-price_infinity');
        if (typeof data.from_value === 'number') {
            cycleRange((data.from_value-50)/50);
            $('.advert-graph__price').html(data.from_value + ' 000 ₽');
        } else if(data.from_value==='1 млн') {
            elem50.addClass('advert-ability_active');
            $('.advert-graph__price').html('1 000 000 ₽');
        } else {
            $('.advert-price').addClass('advert-price_infinity');
            $('.advert-graph__price').html('Не ограничен');
        }
    }
});