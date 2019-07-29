'use strict';
(function () {

  window.form = {
    formElement: document.querySelector('.ad-form'),
    fieldsetInAdForm: document.querySelectorAll('fieldset'),
    addressInput: document.querySelector('input[name="address"]'),
    addEventListenersInForm: function () {
      typeSelect.addEventListener('change', onTypeSelectChange);
      timeIn.addEventListener('change', onTimeInChange);
      timeOut.addEventListener('change', onTimeOutChange);
      capacity.addEventListener('change', onCapacityChange);
    },
    removeEventListenersInForm: function () {
      typeSelect.removeEventListener('change', onTypeSelectChange);
      timeIn.removeEventListener('change', onTimeInChange);
      timeOut.removeEventListener('change', onTimeOutChange);
      capacity.removeEventListener('change', onCapacityChange);
    }
  };

  window.form.formElement.classList.add('ad-form--disabled');

  var typeSelect = document.querySelector('select[name="type"]');
  var price = document.querySelector('input[name="price"]');

  var setAttributeForPrice = function (type) {
    price.setAttribute('placeholder', type);
    price.setAttribute('min', type);
  };

  var onTypeSelectChange = function () {
    setAttributeForPrice(window.constants.PRICE_BY_TYPE[typeSelect.value]);
  };

  var timeIn = document.querySelector('select[name="timein"]');
  var timeOut = document.querySelector('select[name="timeout"]');

  var onTimeInChange = function () {
    var timeInSelectedIndex = timeIn.options.selectedIndex;
    timeOut.value = timeOut.options[timeInSelectedIndex].value;
  };

  var onTimeOutChange = function () {
    var timeOutSelectedIndex = timeOut.options.selectedIndex;
    timeIn.value = timeIn.options[timeOutSelectedIndex].value;
  };

  var rooms = document.querySelector('select[name="rooms"]');
  var capacity = document.querySelector('select[name="capacity"]');

  var onCapacityChange = function (evt) {
    var selectedIndex = evt.target.selectedIndex;
    var allowed = window.constants.CAPACITY_BY_ROOMS[rooms.value].allowed;
    var valid = allowed.includes(selectedIndex);
    var validity = valid ? '' : 'Выбранное количество гостей не подходит. Выберите другой вариант.';
    capacity.setCustomValidity(validity);
    capacity.reportValidity();
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var saveHandler = function () {
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var closeSuccessMessage = function () {
      success.remove();
      document.removeEventListener('keydown', onSuccessMessageEscPress);
    };
    var onSuccessMessageEscPress = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeSuccessMessage();
      }
    };
    var onSuccessMessageClick = function () {
      closeSuccessMessage();
    };
    success.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    window.form.formElement.reset();
    window.pins.mapFilters.reset();
    window.render.closeCard();
    window.main.getDisabledMap();
  };

  var errorHandler = function () {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = error.querySelector('.error__button');
    var closeErrorMessage = function () {
      error.remove();
      document.removeEventListener('keydown', onErrorMessageEscPress);
    };
    var onErrorMessageEscPress = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeErrorMessage();
      }
    };
    var onErrorButtonClick = function () {
      closeErrorMessage();
    };
    var onErrorMessageClick = function () {
      closeErrorMessage();
    };
    errorButton.addEventListener('click', onErrorButtonClick);
    error.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  var resetButton = document.querySelector('.ad-form__reset');

  var onSubmitButtonClick = function (evt) {
    window.backend.save(new FormData(window.form.formElement), saveHandler, errorHandler);
    evt.preventDefault();
  };

  window.form.formElement.addEventListener('submit', onSubmitButtonClick);

  var onResetButtonClick = function () {
    window.form.formElement.reset();
    window.pins.mapFilters.reset();
    window.render.closeCard();
    window.main.getDisabledMap();
  };

  resetButton.addEventListener('click', onResetButtonClick);

})();
