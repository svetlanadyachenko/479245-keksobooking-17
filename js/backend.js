'use strict';
(function () {

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = window.constants.TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createXhr(onLoad, onError);
      xhr.open('GET', window.constants.URL_LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createXhr(onLoad, onError);
      xhr.open('POST', window.constants.URL_SAVE);
      xhr.send(data);
    }
  };

})();
