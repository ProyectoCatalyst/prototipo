(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioConvenio', servicioConvenio);

    servicioConvenio.$inject = ['$stateParams','$state','$http','localStorageFactory']; 
  
  function servicioConvenio($stateParams, $state, $http, localStorageFactory) {
  
    const coleccionConvenio = 'listaConveniosLS';

    let publicAPI = {
      agregarConvenios: _agregarConvenios,
      retornarConvenio: _retornarConvenios
    }
    return publicAPI;
    
    //Funciona
    function _agregarConvenios(pconvenioNuevo){

      let listaConvenios = _retornarConvenios(),
          convenioRepetido = false,
          registroExitoso;

      for (let i = 0; i < listaConvenios.length; i++) {
        if (pconvenioNuevo.getCodigo() == listaConvenios[i].getCodigo()) {
          convenioRepetido = true;
        }
      }

      if(convenioRepetido == true){
        registroExitoso = false;
      }else{
        listaConvenios.push(pconvenioNuevo);
        registroExitoso = localStorageFactory.setItem(coleccionConvenio, listaConvenios);
      }
      return registroExitoso;
    }

    function _retornarConvenios(){
    
      let listaConveniosTemporal = []; 
      let listaConveniosLocalS = localStorageFactory.getItem(coleccionConvenio);

      if(listaConveniosLocalS == null){
    
        listaConveniosTemporal = [];
      }else{
        listaConveniosLocalS.forEach(obj => {
          
          let objConvenio = new Convenio(obj.codigoConvenio,obj.nombreConvenio,obj.descripcionConvenio,obj.institucionConvenio,obj.costoConvenio);
          listaConveniosTemporal.push(objConvenio);
        })
      }
      return listaConveniosTemporal;
    }

    }
  })();