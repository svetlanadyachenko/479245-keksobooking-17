'use strict';
(function () {

  window.form = {
    formAd: document.querySelector('.ad-form'),
    fieldsetsInAdForm: document.querySelectorAll('fieldset'),
    addressInput: document.querySelector('input[name="address"]'),
    addEventListenersOnForm: function () {
      typeSelect.addEventListener('change', onTypeSelectChange);
      timeIn.addEventListener('change', onTimeInChange);
      timeOut.addEventListener('change', onTimeOutChange);
      capacity.addEventListener('change', onCapacityChange);
      rooms.addEventListener('change', onRoomsChange);
    },
    removeEventListenersOnForm: function () {
      typeSelect.removeEventListener('change', onTypeSelectChange);
      timeIn.removeEventListener('change', onTimeInChange);
      timeOut.removeEventListener('change', onTimeOutChange);
      capacity.removeEventListener('change', onCapacityChange);
      rooms.removeEventListener('change', onRoomsChange);
    }
  };

  window.form.formAd.classList.add('ad-form--disabled');

  var typeSelect = document.querySelector('select[name="type"]');
  var price = document.querySelector('input[name="price"]');

  var setAttributeForPrice = function (value) {
    price.setAttribute('placeholder', value);
    price.setAttribute('min', value);
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
    var capacityValid = allowed.includes(selectedIndex);
    var capacityValidity = capacityValid ? '' : 'Выбранное количество гостей не подходит. Выберите другой вариант.';
    capacity.setCustomValidity(capacityValidity);
    capacity.reportValidity();
  };

  var onRoomsChange = function (evt) {
    var selectedIndex = evt.target.selectedIndex;
    var allowed = window.constants.ROOMS_BY_CAPACITY[capacity.value].allowed;
    var roomsValid = allowed.includes(selectedIndex);
    var roomsValidity = roomsValid ? '' : 'Выбранное количество комнат не подходит. Выберите другой вариант.';
    rooms.setCustomValidity(roomsValidity);
    rooms.reportValidity();
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onSaveData = function () {
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
    window.main.getClearPage();
  };

  var onErrorMessageInForm = function () {
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
  var allElements = window.form.formAd.querySelectorAll('input, select');
  var errorCount = 0;

  var onSubmitButtonClick = function (evt) {
    checkBeforeSending();
    if (errorCount === 0) {
      window.backend.save(new FormData(window.form.formAd), onSaveData, onErrorMessageInForm);
      evt.preventDefault();
    }
  };

  window.form.formAd.addEventListener('submit', onSubmitButtonClick);

  var onResetButtonClick = function () {
    window.main.getClearPage();
    removeRedBorders();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  var checkForm = function (elementsOfForm) {
    errorCount = 0;
    elementsOfForm.forEach(function (it) {
      if (!it.validity.valid) {
        it.setAttribute('style', 'border: 2px solid red;');
        errorCount = errorCount + 1;
      } else {
        it.removeAttribute('style');
      }
    });
  };

  var checkElements = function () {
    checkForm(allElements);
  };

  var checkBeforeSending = function () {
    checkElements();
  };

  var removeRedBorders = function () {
    allElements.forEach(function (it) {
      it.removeAttribute('style');
    });
  };

})();
