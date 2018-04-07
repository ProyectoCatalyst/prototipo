(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioConvenio', servicioConvenio);

  servicioConvenio.$inject = ['$q', '$log', '$http', 'localStorageFactory'];

  function servicioConvenio($q, $log, $http, localStorageFactory) {

    const listaConvenios = 'listaConveniosLS';

    let publicAPI = {
      agregarConvenio: _agregarConvenio,
      retornarConvenio: _retornarConvenio,
      eliminarConvenio: _eliminarConvenio,
      editarConvenio: _editarConvenio
    }
    return publicAPI;

    function _agregarConvenio(pconvenioNuevo) {
      let conveniosLS = _retornarConvenio(),
            repetido = false;

      for(let i=0; i<conveniosLS.length; i++){
        if(conveniosLS[i].getCodigo() == pconvenioNuevo.codigoConvenio){
          repetido = true
        }
      }

      if(!repetido){
        conveniosLS.push(pconvenioNuevo);
        localStorageFactory.setItem(listaConvenios, conveniosLS);
      }

      return repetido
    }

    function _retornarConvenio() {
      let listaConveniosTemporal = [],
          conveniosLS = localStorageFactory.getItem(listaConvenios);

      if (conveniosLS.length == 0) {
       listaConveniosTemporal = [];
      } else {
        conveniosLS.forEach(obj => {

          let objConvenio = new Convenio(obj.codigoConvenio, obj.nombreConvenio, obj.descripcionConvenio, obj.institucionConvenio, obj.costoConvenio);

          listaConveniosTemporal.push(objConvenio)
        });
      }
      return listaConveniosTemporal;
    }

    function _eliminarConvenio(pconvenioEliminar){
      let conveniosLS = _retornarConvenio(),
          actualizarLista = [];

      for(let i=0; i<conveniosLS.length; i++){
        if(conveniosLS[i].getCodigo() != pconvenioEliminar.codigoConvenio){
          actualizarLista.push(conveniosLS[i]);
        }
      }
      let exito = actualizarConvenios(actualizarLista);

      return exito
    }

    function _editarConvenio(pconvenioMod){
      let conveniosLS = _retornarConvenio();

      for(let i=0; i<conveniosLS.length; i++){
        if(conveniosLS[i].getCodigo() == pconvenioMod.codigoConvenio){
          conveniosLS[i] = pconvenioMod;
        }
      }
      let exito = actualizarConvenios(conveniosLS);

      return exito
    }


    function actualizarConvenios(plistaActualizada){
      let exito = localStorageFactory.setItem(listaConvenios, plistaActualizada);

      return exito
    }

  }
})();