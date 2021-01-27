
// Slider#1


var slideIndex = 1;
showSlides(slideIndex);

// /* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}


// /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

// /* Устанавливает текущий слайд */
function currentxSlide(n) {
    showSlides(slideIndex = n);
}




/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



// --------------Slider----------X3
'use strict';
var multiItemSlider = (function () {
    return function (selector, config) {
        var
            _mainElement = document.querySelector(selector), // основный элемент блока
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
            _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
            _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
            _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
            _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
            _positionLeftItem = 0, // позиция левого активного элемента
            _transform = 0, // значение транфсофрмации .slider_wrapper
            _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
            _items = []; // массив элементов
        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
            getMin: 0,
            getMax: _items.length - 1,
        }

        var _transformItem = function (direction) {
            if (direction === 'right') {
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
                    return;
                }
                if (!_sliderControlLeft.classList.contains('slider__control_show')) {
                    _sliderControlLeft.classList.add('slider__control_show');
                }
                if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
                    _sliderControlRight.classList.remove('slider__control_show');
                }
                _positionLeftItem++;
                _transform -= _step;
            }
            if (direction === 'left') {
                if (_positionLeftItem <= position.getMin) {
                    return;
                }
                if (!_sliderControlRight.classList.contains('slider__control_show')) {
                    _sliderControlRight.classList.add('slider__control_show');
                }
                if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
                    _sliderControlLeft.classList.remove('slider__control_show');
                }
                _positionLeftItem--;
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед"
        var _controlClick = function (e) {
            if (e.target.classList.contains('slider__control')) {
                e.preventDefault();
                var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                _transformItem(direction);
            }
        };

        var _setUpListeners = function () {
            // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
            _sliderControls.forEach(function (item) {
                item.addEventListener('click', _controlClick);
            });
        }

        // инициализация
        _setUpListeners();

        return {
            right: function () { // метод right
                _transformItem('right');
            },
            left: function () { // метод left
                _transformItem('left');
            }
        }

    }
}());

var slider = multiItemSlider('.slider')
