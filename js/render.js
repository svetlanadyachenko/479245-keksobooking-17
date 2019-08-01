'use strict';
(function () {

  var similarAdTemplate = document.querySelector('#pin').content;
  var similarList = document.querySelector('.map__pins');
  var similarCardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderCard = function (ad) {
    var card = similarCardTemplate.cloneNode(true);
    card.querySelector('.popup .popup__title').textContent = ad.offer.title;
    card.querySelector('.popup .popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup .popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup .popup__type').textContent = window.constants.TYPE_BY_TYPE[ad.offer.type];
    card.querySelector('.popup .popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup .popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var features = card.querySelector('.popup .popup__features');
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

    card.querySelector('.popup .popup__description').textContent = ad.offer.description;

    var photos = card.querySelector('.popup .popup__photos');
    var image = photos.querySelector('img').cloneNode(true);
    photos.innerHTML = '';
    if (ad.offer.photos.length) {
      ad.offer.photos.forEach(function (src) {
        var photo = image.cloneNode(true);
        photo.src = src;
        photos.appendChild(photo);
      });
    } else {
      photos.remove();
    }

    card.querySelector('.popup .popup__avatar').src = ad.author.avatar;

    var closeCardButton = card.querySelector('.popup .popup__close');
    var onCloseCardButtonClick = function () {
      window.render.closeCard();
    };
    closeCardButton.addEventListener('click', onCloseCardButtonClick);

    document.addEventListener('keydown', onCardEscPress);

    return card;
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      window.render.closeCard();
    }
  };

  var renderAd = function (ad) {
    var adPin = similarAdTemplate.cloneNode(true);

    adPin.querySelector('.map__pin').style.left = ad.location.x - (window.constants.AD_WIDTH / 2) + 'px';
    adPin.querySelector('.map__pin').style.top = ad.location.y - window.constants.AD_HEIGHT + 'px';
    adPin.querySelector('.map__pin img').src = ad.author.avatar;
    adPin.querySelector('.map__pin img').alt = ad.offer.title;

    var pin = adPin.querySelector('.map__pin');
    var onPinClick = function () {
      window.render.closeCard();
      createCard(ad);
      pin.classList.add('map__pin--active');
    };
    pin.addEventListener('click', onPinClick);

    return adPin;
  };

  var getFragment = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (it) {
      fragment.appendChild(renderAd(it));
    });
    return fragment;
  };

  window.render = {
    map: document.querySelector('.map'),
    createPins: window.debounce(function (data) {
      var limitData = data.slice(window.constants.MIN_PIN_ON_MAP, window.constants.MAX_PIN_ON_MAP);
      similarList.appendChild(getFragment(limitData));
    }),
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (it) {
        it.remove();
      });
    },
    closeCard: function () {
      var mapCard = window.render.map.querySelector('.popup');
      if (mapCard !== null) {
        mapCard.remove();
      }
      document.removeEventListener('keydown', onCardEscPress);
      var pinActive = window.render.map.querySelector('.map__pin--active');
      if (pinActive !== null) {
        pinActive.classList.remove('map__pin--active');
      }
    }
  };

  var createCard = function (data) {
    window.render.map.insertBefore(renderCard(data), filtersContainer);
  };

})();
