'use strict';
(function () {

  var similarAdTemplate = document.querySelector('#pin').content;
  var similarListElement = document.querySelector('.map__pins');
  var similarCardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderCard = function (ad) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup .popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup .popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup .popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup .popup__type').textContent = window.constants.TYPE_BY_TYPE[ad.offer.type];
    cardElement.querySelector('.popup .popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup .popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var features = cardElement.querySelector('.popup .popup__features');
    features.innerHTML = '';
    if (ad.offer.features.length) {
      ad.offer.features.forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
        features.appendChild(featureElement);
      });
    } else {
      features.remove();
    }

    cardElement.querySelector('.popup .popup__description').textContent = ad.offer.description;

    var photos = cardElement.querySelector('.popup .popup__photos');
    var image = photos.querySelector('img').cloneNode(true);
    photos.innerHTML = '';
    if (ad.offer.photos.length) {
      ad.offer.photos.forEach(function (src) {
        var photoElement = image.cloneNode(true);
        photoElement.src = src;
        photos.appendChild(photoElement);
      });
    } else {
      photos.remove();
    }

    cardElement.querySelector('.popup .popup__avatar').src = ad.author.avatar;

    var closeCardButton = cardElement.querySelector('.popup .popup__close');
    var onCloseCardButtonClick = function () {
      window.render.closeCard();
    };
    closeCardButton.addEventListener('click', onCloseCardButtonClick);

    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      window.render.closeCard();
    }
  };

  var renderAd = function (ad) {
    var adElement = similarAdTemplate.cloneNode(true);

    adElement.querySelector('.map__pin').style.left = ad.location.x - (window.constants.AD_WIDTH / 2) + 'px';
    adElement.querySelector('.map__pin').style.top = ad.location.y - window.constants.AD_HEIGHT + 'px';
    adElement.querySelector('.map__pin img').src = ad.author.avatar;
    adElement.querySelector('.map__pin img').alt = ad.offer.title;

    var pin = adElement.querySelector('.map__pin');
    var onPinClick = function () {
      window.render.closeCard();
      renderCardElement(ad);
      pin.classList.add('map__pin--active');
    };
    pin.addEventListener('click', onPinClick);

    return adElement;
  };

  var getFragment = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderAd(data[i]));
    }
    return fragment;
  };

  window.render = {
    mapElement: document.querySelector('.map'),
    renderPins: function (data) {
      var limitData = data.slice(window.constants.MIN_PIN_ON_MAP, window.constants.MAX_PIN_ON_MAP);
      similarListElement.appendChild(getFragment(limitData));
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];
        pin.remove();
      }
    },
    closeCard: function () {
      var mapCard = window.render.mapElement.querySelector('.popup');
      if (mapCard !== null) {
        mapCard.remove();
      }
      document.removeEventListener('keydown', onCardEscPress);
      var pinActive = window.render.mapElement.querySelector('.map__pin--active');
      if (pinActive !== null) {
        pinActive.classList.remove('map__pin--active');
      }
    }
  };

  var renderCardElement = function (data) {
    window.render.mapElement.insertBefore(renderCard(data), filtersContainer);
  };

})();
