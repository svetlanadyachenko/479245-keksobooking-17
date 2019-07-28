'use strict';
(function () {

  window.constants = {
    URL_LOAD: 'https://js.dump.academy/keksobooking/data',
    URL_SAVE: 'https://js.dump.academy/keksobooking',
    TIMEOUT: 10000,
    DEBOUNCE_INTERVAL: 500,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    ESC_KEYCODE: 27,
    AD_QUANTITY: 5,
    MAX_PIN_ON_MAP: 5,
    MIN_PIN_ON_MAP: 0,
    AD_WIDTH: 50,
    AD_HEIGHT: 70,
    MAP_PIN_MAIN_X: 570,
    MAP_PIN_MAIN_Y: 375,
    X_FIRST_COORDINATE: 0,
    X_LAST_COORDINATE: 1200,
    Y_FIRST_COORDINATE: 130,
    Y_LAST_COORDINATE: 630,
    MAP_PIN_MAIN_WIDTH: 66,
    MAP_PIN_MAIN_HEIGHT: 86,
    PRICE_BY_TYPE: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    },
    TYPE_BY_TYPE: {
      bungalo: 'Бунгало',
      flat: 'Квартира',
      house: 'Дом',
      palace: 'Дворец'
    },
    CAPACITY_BY_ROOMS: {
      1: {
        allowed: [2]
      },
      2: {
        allowed: [2, 1]
      },
      3: {
        allowed: [2, 1, 0]
      },
      100: {
        allowed: [3]
      }
    }
  };

})();
