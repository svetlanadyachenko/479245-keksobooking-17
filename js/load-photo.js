'use strict';
(function () {

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var onLoadChange = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileChooser) {
          case avatarChooser:
            avatarPreview.src = result;
            break;
          case photoChooser:
            var imgElement = document.createElement('img');
            imgElement.src = result;
            imgElement.style.maxWidth = '70px';
            imgElement.style.maxHeight = '70px';
            photoPreview.appendChild(imgElement);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', onLoadChange);
  photoChooser.addEventListener('change', onLoadChange);

  window.resetPhoto = function () {
    if (avatarPreview.src !== 'img/muffin-grey.svg') {
      avatarPreview.src = 'img/muffin-grey.svg';
    }
    var allImages = Array.from(photoPreview.querySelectorAll('img'));
    allImages.forEach(function (it) {
      it.remove();
    });
  };

})();
