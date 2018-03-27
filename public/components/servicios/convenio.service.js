(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioConvenio', servicioConvenio);

  servicioConvenio.$inject = ['$q', '$log', '$http'];

  function servicioConvenio($q, $log, $http) {

    const asyncLocalStorage = {
      setItem: function (key, value) {
        return Promise.resolve().then(() => {
          let response = true;
          localStorage.setItem(key, JSON.stringify(value));
          return response
        });
      }
    }
    let publicAPI = {
      agregarConvenio: _agregarConvenio,
      retornarConvenio: _retornarConvenio
    }
    return publicAPI;

    //Funciona
    function _agregarConvenio(pconvenioNuevo) {

      let listaConvenios = _retornarConvenio();
      listaConvenios.push(pconvenioNuevo);


      localStorage.setItem('listaConveniosLS', JSON.stringify(listaConvenios));
    }

    function _retornarConvenio() {

      let listaConveniosTemporal = [];
      let listaConveniosLocalS = JSON.parse(localStorage.getItem('listaConveniosLS'));

      if (listaConveniosLocalS == null) {

        listaConveniosTemporal = [];
      } else {
        listaConveniosLocalS.forEach(obj => {

          let objConvenio = new Convenio(obj.codigoConvenio, obj.nombreConvenio, obj.descripcionConvenio, obj.institucionConvenio, obj.costoConvenio);
          listaConveniosTemporal.push(objConvenio)
        });
      }
      return listaConveniosTemporal;
    }

  }
})();