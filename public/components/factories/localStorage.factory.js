(() => {
  'use strict';
  angular
    .module('prototipo')
    .factory('localStorageFactory', localStorageFactory);

  localStorageFactory.$inject = ['$log', '$http'];

  function localStorageFactory($log, $http) {

    let localAPI = {
      setItem: _setItem,
      getItem: _getItem,
      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession
    };
    return localAPI;

    function _setItem(key, value) {
      let response = true;

      localStorage.setItem(key, JSON.stringify(value));

      return response
    };

    function _getItem(key) {
      let arrayData = JSON.parse(localStorage.getItem(key));

      if (!arrayData) {
        arrayData = [];
      };

      return arrayData;
    };

    function _setSession(value) {
      let inicio = true;

      sessionStorage.setItem('session', JSON.stringify(value));

      return inicio;
    };

    function _closeSession() {
      let cierre = true;

      sessionStorage.removeItem('session');

      return cierre;
    };

    function _getSession() {

      let sesionActiva = JSON.parse(sessionStorage.getItem('session'));

      return sesionActiva;
    }

  }
})();