import Choices from "choices.js";
import * as $  from 'jquery';
import 'slick-carousel';

import {
    initPlaceholders,
    initMaskedInput,
    validateForm,
    validateField,
    getMoneyInputValue,
    getMaskedInputValue
} from './components/form';

import {initTabs} from './components/tabs'
import {videoOptimization} from './components/video-opt'
import bookingInit from './components/booking/booking';

$(function () {
   licenseSliderInit();
    gallerySliderInit()
    toggleMainMenu();
    oneItemSlider();
    playAboutVideo();
    visibleAroundSlider();

   // кастомные плейсхолдеры
   initPlaceholders();
   // маски ввода
   initMaskedInput();

   initFeedbackForm($('#feedback_form'));

   changeProgram();
   if ($('#map').length) {
      mapInit();
   }

   if ($('select.select').length) {
      customSelectInit();
   }
   if ($('#video_main').length) {
      videoOptimization();
   }

   if ($('[data-tabs-block]').length) {
      $(this).each(function () {
         initTabs($(this));
      })
   }

   bookingInit();


   initInfoModal();
});


function initInfoModal() {
   $('#info-modal-open').on('click', function (e) {
      e.preventDefault();

      $('body').addClass('info-modal-open');
   })


   $('#info-modal-close').on('click', function (e) {
      e.preventDefault();

      $('body').removeClass('info-modal-open');
   })
}

function changeProgram() {
   $('#program-select').change(function (e) {
      $('.program-table').each(function () {
         if($(this).data('program') == e.target.value) {
            $(this).removeClass('hide')
         } else {
            $(this).addClass('hide')
         }
      })

   })
}

function customSelectInit() {
   const element = document.querySelector('select.select');
   const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: ''
   });
}

function licenseSliderInit() {
   $('.docs .item').click(function () {
      $('html').addClass('license-slider-open');
      let sliderImages = []
      $('.docs .item img').each(function (index, value) {
         sliderImages.push(value.src)
      })
      sliderImages.map(function (value, index) {
         $('.license-slider').append(
            $('<div class="item">').append(`<img src=${value} alt=${index}>`)
         )
      })
      $('.license-slider').slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: true,
         fade: true,
         prevArrow: $('.gallery-prev'),
         nextArrow: $('.gallery-next')
      });

      let slideno = $(this).data('slide');
      $('.license-slider').slick('slickGoTo', slideno - 1);


      $('.gallery__slider-close').click(function () {
         $('.license-slider').slick('unslick')
         $('html').removeClass('license-slider-open');
      })
   });
}

function gallerySliderInit() {
   $('.gallery .gallery__item').click(function () {
      $('html').addClass('gallery-slider-open');
      let sliderImages = []
      $('.gallery .gallery__item img').each(function (index, value) {
         sliderImages.push(value.src)
      })
      sliderImages.map(function (value, index) {
         $('.gallery__slider-big, .gallery__slider-small').append(
            $('<div class="item">').append(`<img src=${value} alt=${index}>`)
         )
      })
      let slidesToShow = $('.gallery .gallery__item').length > 5 ? 5 : $('.gallery .gallery__item').length < 3 ? 3 : $('.gallery .gallery__item').length - 1


      $('.gallery__slider-big').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: true,
         fade: true,
         asNavFor: '.gallery__slider-small',
         prevArrow: $('.gallery-prev'),
         nextArrow: $('.gallery-next')
      });
      $('.gallery__slider-small').slick({
         infinite: false,
         slidesToShow: slidesToShow,
         slidesToScroll: 1,
         asNavFor: '.gallery__slider-big',
         dots: false,
         arrows: false,
         focusOnSelect: true,
         responsive: [
            {
               breakpoint: 1000,
               settings: {
                  slidesToShow: 4
               }
            },
            {
               breakpoint: 760,
               settings: {
                  slidesToShow: 4
               }
            },
            {
               breakpoint: 540,
               settings: {
                  slidesToShow: 3
               }
            },
            {
               breakpoint: 450,
               settings: {
                  slidesToShow: 2
               }
            }
         ]
      });

      let slideno = $(this).data('slide');
      $('.gallery__slider-small').slick('slickGoTo', slideno - 1);


      $('.gallery__slider-close').click(function () {
         $('.gallery__slider-big').slick('unslick')
         $('.gallery__slider-small').slick('unslick')
         $('html').removeClass('gallery-slider-open');
      })
   });
}

function mapInit() {
   ymaps.ready(function () {
      var myMap = new ymaps.Map("map", {
         center: [53.383169,49.106499],
         zoom: 9,
         controls: []
      }),
      myPlacemark = new ymaps.Placemark([53.383169,49.106499], {}, {
         iconLayout: 'default#image',
         iconImageHref: "/img/others/map-icon.png",
         iconImageSize: [41, 46],
      });
      myMap.behaviors.disable('scrollZoom');
      myMap.controls.add('zoomControl');
      myMap.geoObjects
         .add(myPlacemark)
   });
}

function toggleMainMenu() {
    $('#menu-burger').click(function () {
        $('html').toggleClass('main-menu-open');
    });
}

function oneItemSlider() {
    $('.initialize-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        arrows: false,
        dots: true,
        customPaging: function (slider, i) {
            return '<a>' + '</a>';
        }
    });
}

function visibleAroundSlider() {
   $('.quest-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      centerMode: true,
      customPaging: function (slider, i) {
         return '<a>' + '</a>';
      }
   });
}

function playAboutVideo() {
    $('#about__video-play').click(function (e) {
        e.preventDefault();

        let elem = document.getElementById('about__video');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    });

}

function initFeedbackForm($form) {
   if (!$form) return;

   const formAction = $form.attr('action');

   // отслеживаем изменения в полях формы
   $form.on('change', '.validate', function () {
      validateField($(this));
   });

   $form.on('submit', function () {
      if (validateForm($form)) {
         $('.with-preloader-block').addClass('load')
         send();
      }

      return false;
   });

   function send() {
      const data = $form.serialize();

      $.ajax({
         url: formAction,
         type: 'POST',
         dataType: 'json',
         data: data,
         success: function (res) {
            // success handler
            success();
         },
         error: function (res) {
            // error handler
            // пока api нет можно сюда запихнуть success для тестов
            // потом убрать обязательно!
            success();
            //setTimeout(success, 1000);
         },
         timeout: 30000
      });
   }

   // успешная отправка формы
   function success() {
      $('.with-preloader-block').removeClass('load').addClass('form-result');
      $('#submit-message').removeClass('d-none');
      $('.icon-check').removeClass('d-none');
      $('#submit-message .submit-message-text').text('Заявка успешно отправлена');
   }
   function error() {
      $('.with-preloader-block').removeClass('load').addClass('form-result');
      $('#submit-message').removeClass('d-none');
      $('.icon-close').removeClass('d-none');
      $('#submit-message .submit-message-text').text('Ошибка при отправке формы. Попробуйте снова');
   }
}


