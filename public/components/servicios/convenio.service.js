(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioConvenio', servicioConvenio);

  servicioConvenio.$inject = ['$stateParams', '$state', '$http', 'servicioConvenio'];

  function servicioConvenio($stateParams, $state, $http, servicioConvenio) {

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
      agregarConvenios: _agregarConvenios,
      retornarConvenio: _retornarConvenio
    }
    return publicAPI;

    //Funciona
    function _agregarConvenio(pconvenioNuevo) {

      let listaConvenios = retornarConvenios();
      listaConvenios.push(pconvenioNuevo);


      localStorage.setItem('listaConveniosLS', JSON.stringify(listaConvenios));
    }

    function _retornarConvenios() {

      let listaConveniosTemporal = [];
      let listaConveniosLocalS = JSON.parse(localStorage.getItem('listaConveniosLS'));

      if (listaConveniosLocalS == null) {

        listaConveniosTemporal = [];
      } else {
        listaConveniosLocalS.forEach(obj => {

          let objConvenio = new Convenio(obj.codigoConvenio, obj.nombreConvenio, obj.descripcionConvenio, obj.institucionConvenio, obj.costoConvenio);
          listaConveniosTemporal.push(objConvenio);
        })
      }
      return listaConveniosTemporal;
    }

  }
})();