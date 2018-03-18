(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioSesion', servicioSesion)

  function servicioSesion() {

    this.create = (datos) => {
      this.session = datos;
      sessionStorage.setItem('session', JSON.stringify(datos));
    };

    this.session = () => {
      return sessionStorage.getItem('session');
    }

    this.destroy = function () {
      delete this.session;
      sessionStorage.removeItem('session');
    };
  }
})();