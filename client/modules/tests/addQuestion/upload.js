/**function log(html) {
      document.getElementById('log').innerHTML = html;
    }

    document.forms.upload.onsubmit = function() {
      var file = this.elements.myfile.files[0];
      if (file) {
        upload(file);
      }
      return false;
    }


function upload(file) {

      var xhr = new XMLHttpRequest();

      // обработчики можно объединить в один,
      // если status == 200, то это успех, иначе ошибка
      xhr.onload = xhr.onerror = function() {
        if (this.status == 200) {
          log("success");
        } else {
          log("error " + this.status);
        }
      };

      // обработчик для закачки
      xhr.upload.onprogress = function(event) {
        log(event.loaded + ' / ' + event.total);
      }

      xhr.open("POST", "upload", true);
      xhr.send(file);

    }*/