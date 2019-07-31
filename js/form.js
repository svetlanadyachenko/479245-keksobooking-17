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
      window.form.formAd.addEventListener('change', onFormChange);
    },
    removeEventListenersOnForm: function () {
      typeSelect.removeEventListener('change', onTypeSelectChange);
      timeIn.removeEventListener('change', onTimeInChange);
      timeOut.removeEventListener('change', onTimeOutChange);
      capacity.removeEventListener('change', onCapacityChange);
      rooms.removeEventListener('change', onRoomsChange);
      window.form.formAd.removeEventListener('change', onFormChange);
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

  var onSelectChange = function (evt, array, select) {
    var selectedIndex = evt.target.selectedIndex;
    var allowed = array[select.value].allowed;
    var valid = allowed.includes(selectedIndex);
    var validity = valid ? '' : 'Выбранное количество не подходит. Выберите другой вариант.';
    capacity.setCustomValidity(validity);
    capacity.reportValidity();
  };

  var onCapacityChange = function (evt) {
    onSelectChange(evt, window.constants.CAPACITY_BY_ROOMS, rooms);
  };

  var onRoomsChange = function (evt) {
    onSelectChange(evt, window.constants.ROOMS_BY_CAPACITY, capacity);
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

  window.form.formAd.addEventListener('invalid', function (evt) {
    var target = evt.target;
    target.setAttribute('style', 'border: 2px solid red;');
  }, true);

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.formAd), onSaveData, onErrorMessageInForm);
  };

  window.form.formAd.addEventListener('submit', onSubmitButtonClick);

  var onFormChange = function () {
    removeRedBorders();
  };

  var removeRedBorders = function () {
    allElements.forEach(function (it) {
      it.removeAttribute('style');
    });
  };

  var onResetButtonClick = function () {
    window.main.getClearPage();
    removeRedBorders();
  };

  resetButton.addEventListener('click', onResetButtonClick);

})();
