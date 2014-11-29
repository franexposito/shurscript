(function ($, createModule, undefined) {
  'use strics';

  var mod = createModule({
    id: 'ImageGallery',
    name: 'Galeria de imagenes de un hilo',
    author: 'franexp',
    version: '0.1',
    description: 'Muestra una galeria con las imagenes que hay en un hilo.',
    domain: ['/showthread.php']
  });

  var thread;
  var page;
  var images = []
  /**
  * Activamos modo de carga normal (aunque viene activo por defecto)
  * aqui se podrian hacer comprobaciones adicionales. No es nuestro caso
  */
  mod.normalStartCheck = function () {
    return true;
  };

  /**
  * Sobreescribimos la funcion de ejecucion
  */
  mod.onNormalStart = function () {
    thread = SHURSCRIPT.environment.thread.id;
    page = SHURSCRIPT.environment.thread.page;
    loadNextPage();
    cleanImages(images);
    alert(images.length);
  };

  function loadNextPage() {
    var re = /\<img(.*?)\>/i;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var html = xmlhttp.responseText;
        while (html.search(re) !== -1) {
          images.push(re.exec(html));
          html = html.replace(re, '1');
        }
      }
    };
    xmlhttp.open('GET', '/foro/showthread.php?t=' + thread + '&page=' + page, false);
    xmlhttp.send();
  }

  function cleanImages(images) {
    var re = '/\<img src="http:\/\/cdn.forocoches.com\/(.*)\>/i';
    console.log('entro');
    if (images.length > 1) {
      $.each(images, function(index, value) {
        if (images[index].search(re) !== -1) {
          images.splice(index, 1);
        }
      });
    }
  }

  })(jQuery, SHURSCRIPT.moduleManager.createModule);
