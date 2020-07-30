'use strict';
const budget = 150000;
const elem50 = $('.advert-price').find('.advert-ability[data-need]');
const cycleRange = ((num) => {
    for (let i = 0; i < num; i++) {
        elem50.get(i).classList.add('advert-ability_active');
    }
    for (let z = num; z < elem50.length; z++) {
        elem50.get(z).classList.remove('advert-ability_active');
    }
});
const getPriceDev = (() => {
    let countCompany = 0;
    let activeCompany = $('.advert-checkbox input[data-dev]:checked').length;
    $('.advert-collection').each((key, item)=>{
        if(item.querySelectorAll('input[data-dev]:checked').length>0) {
            countCompany++;
        }
    });
    let devResult = Math.round((1 - (activeCompany-1)*0.1)*activeCompany*countCompany*25000);

    $('.js-price-dev').html(devResult + ' ₽');
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
            cycleRange((data.from_value - 50) / 50);
            $('.advert-graph__price').html(data.from_value + ' 000 ₽');
        } else if (data.from_value === '1 млн') {
            elem50.addClass('advert-ability_active');
            $('.advert-graph__price').html('1 000 000 ₽');
        } else {
            $('.advert-price').addClass('advert-price_infinity');
            $('.advert-graph__price').html('Не ограничен');
        }
    }
});

let numElem = 1;
$('#advert-add-theme').on('click', () => {
    numElem++;
    let collectElem = document.createElement('div');
    collectElem.classList.add('advert-collection');
    collectElem.innerHTML = '' +
        '<div class="row align-items-center">' +
        '<div class="advert-calc__text-col vam-child">' +
        '<span class="advert-calc__title">Название тематики</span>' +
        '<div class="get-info" data-info-id=""></div>' +
        '</div>' +
        '<div class="advert-theme-block">' +
        '<div class="input-group advert-theme-block__input">' +
        '<input type="text" class="input-group__input" name="name" autocomplete="off" placeholder="-"' +
        '   required>' +
        '<span class="bar"></span>' +
        '<label>Введите название</label>' +
        '</div>' +
        '</div>' +
        '<div class="advert-city-block">' +
        '<span>Санкт-Петербург и ЛО</span>' +
        '</div>' +
        '<div class="advert-delete-block">' +
        '<span class="advert-delete-js">- Убрать</span>' +
        '</div>' +
        '</div>' +
        '<div class="row align-items-center advert-calc__second-block">' +
        '<div class="advert-calc__text-col vam-child">' +
        '<span class="advert-calc__title">Рекламная система</span>' +
        '<div class="get-info" data-info-id=""></div>' +
        '</div>' +
        '<div class="advert-calc__checkbox">' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="Яндекс.Директ" id="yd_' + numElem + '" data-dev="25000" checked>' +
        '<label for="yd_' + numElem + '">Яндекс.Директ</label>' +
        '</div>' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="Google Ads" id="google_' + numElem + '" data-dev="25000">' +
        '<label for="google_' + numElem + '">Google Ads</label>' +
        '</div>' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="VK" id="vk_' + numElem + '">' +
        '<label for="vk_' + numElem + '">VK</label>' +
        '</div>' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="Google Ads" id="fb_' + numElem + '">' +
        '<label for="fb_' + numElem + '">Instagram + Facebook</label>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('.advert-collections').append(collectElem);
    getPriceDev();
});

$('.advert-calc').on('click', (e) => {
    if (e.target.classList.contains('advert-delete-js')) {
        numElem--;
        e.target.closest('.advert-collections').removeChild(e.target.closest('.advert-collection'));
    }
    if (e.target.closest('.advert-checkbox')) {
        getPriceDev();
    }
    // минимум 1 инпут
    if(e.target.closest('.advert-checkbox')) {
        if(e.target.closest('.advert-calc__checkbox').querySelectorAll('input:checked').length===1 && e.target.closest('.advert-checkbox').querySelector('input').checked) {
            e.preventDefault();
        }
    }
});