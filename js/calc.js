'use strict';
let cities = [];
$.getJSON('region.json', function(data) {
    cities = data;
    console.log(cities);
});

let numElem = 1;
let budget = 0;
let priceOptions = 0;
const getPriceOptions = (()=>{
    budget = 0;
    $('.advert-ability:not(.advert-ability_active) input:checked').each((key, item)=>{
        budget += item.closest('.advert-ability').dataset.price;
    });
});
const elem50 = $('.advert-price').find('.advert-ability[data-need]');
const cycleRange = ((num) => {
    for (let i = 0; i < num; i++) {
        elem50.get(i).classList.add('advert-ability_active');
        elem50.get(i).querySelector('input').checked = true;
    }
    for (let z = num; z < elem50.length; z++) {
        elem50.get(z).classList.remove('advert-ability_active');
        elem50.get(z).querySelector('input').checked = false;
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
    let devResult = Math.round((1 - (activeCompany - 1) * 0.1) * activeCompany * countCompany * 25000);
    $('.js-price-dev').html(devResult + ' ₽');
});
const getPriceSev = (() => {
    getPriceOptions();
    let countAdvAll = $('.advert-collections').find('input:checked').length;
    let serResult = Math.round((1 - (countAdvAll - 1) * 0.1) * countAdvAll * numElem * 20000 - 0.01 * budget + priceOptions * numElem) + ' ₽';
    $('.js-price-serv').html(serResult);
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
            if (data.from_value >= 150)
                budget = data.from_value * 1000;
        } else if (data.from_value === '1 млн') {
            elem50.addClass('advert-ability_active');
            $('.advert-price .advert-ability[data-need] input').prop('checked', true);
            $('.advert-graph__price').html('1 000 000 ₽');
            budget = 1000000;
        } else {
            $('.advert-price').addClass('advert-price_infinity');
            $('.advert-graph__price').html('Не ограничен');
        }
        getPriceSev();
    }
});
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
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="Яндекс.Директ" data-dev="25000" checked>' +
        '<label for="yd_' + numElem + '">Яндекс.Директ</label>' +
        '</div>' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="Google Ads" data-dev="25000">' +
        '<label for="google_' + numElem + '">Google Ads</label>' +
        '</div>' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="VK">' +
        '<label for="vk_' + numElem + '">VK</label>' +
        '</div>' +
        '<div class="advert-checkbox">' +
        '<input class="advert-checkbox__input" type="checkbox" name="advert-system" value="Google Ads">' +
        '<label for="fb_' + numElem + '">Instagram + Facebook</label>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('.advert-collections').append(collectElem).addClass('can-delete');
    getPriceDev();
    getPriceSev();
});

$('.advert-calc').on('click', (e) => {
    if (e.target.classList.contains('advert-delete-js') && e.target.closest('.can-delete')) {
        numElem--;
        e.target.closest('.advert-collections').removeChild(e.target.closest('.advert-collection'));
        if($('.advert-collection').length === 1) {
            $('.advert-collections').removeClass('can-delete');
        }
    }
    // минимум 1 инпут
    if(e.target.closest('.advert-checkbox')) {
        if(e.target.closest('.advert-calc__checkbox').querySelectorAll('input:checked').length===1 && e.target.closest('.advert-checkbox').querySelector('input').checked) {
            e.preventDefault();
        } else {
            e.target.closest('.advert-checkbox').querySelector('input').checked = !e.target.closest('.advert-checkbox').querySelector('input').checked;
            getPriceDev();
            getPriceSev();
        }
    }
    if(e.target.tagName==='SPAN' && e.target.closest('.advert-popup__ul')) {
        e.target.previousElementSibling.checked = !e.target.previousElementSibling.checked;
        if(e.target.parentNode.classList.contains('advert-popup__parent')) {
            $(e.target.parentNode.nextElementSibling.querySelectorAll('input')).prop('checked', e.target.previousElementSibling.checked);
        }
    }
    if(e.target.tagName==='SPAN' && e.target.parentNode.classList.contains('advert-popup__parent') || e.target.classList.contains('advert-popup__arrow')) {
        if(e.target.tagName==='SPAN') {
            e.target.parentNode.classList.add('show');
            $(e.target.parentNode.nextElementSibling).slideDown();
        } else {
            e.target.parentNode.classList.toggle('show');
            $(e.target.parentNode.nextElementSibling).slideToggle();
        }
    }
});

$('.advert-price').on('click', (e)=>{
    if(e.target.closest('.advert-ability') && e.target.closest('.advert-ability').querySelector('input')) {
        if(e.target.closest('.advert-ability').dataset.need>50 && !e.target.closest('.advert-ability').classList.contains('advert-ability_active')) {
            e.target.closest('.advert-ability').querySelector('input').checked = !e.target.closest('.advert-ability').querySelector('input').checked;
            getPriceSev();
        }
    }
});