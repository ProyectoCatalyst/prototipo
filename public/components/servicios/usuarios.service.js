(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http', 'localStorageFactory'];

  function servicioUsuarios($q, $log, $http, localStorageFactory) {

    const nombreColeccion = 'listaEncargadosAduanasLS';

    let publicAPI = {
      agregarEncargadoAduana: _agregarEncargadoAduana,
      //retornarEncargadoAduana: _retornarEncargadoAduana,
      // agregarEncargadoSucursal: _agregarEncargadoSucursal,
      // retornarEncargadoSucursal: _retornarEncargadoSucursal
    };
    return publicAPI; 

    function _agregarEncargadoAduana(pencargadoAduana){
      let ListaEncargadosAduanas = [];
      let registroExitoso = false;


      if()

      ListaEncargadosAduanas.push(pencargadoAduana);

      registroExitoso = localStorageFactory.setItem(nombreColeccion, ListaEncargadosAduanas);


      return registroExitoso;
    }
    }

    function registrarEncargadoSucursal(pencargadoSucursal){
      let ListaEncargadosSucursales = [];
      let registroExitoso = true;

      ListaEncargadosSucursales.push(pusuario);

      asyncLocalStorage.setItem('listaEncargadosSucursalesLS', ListaEncargadosSucursales).then((result) => {
        registroExitoso = result
      });

      return registroExitoso;
    }
      

  }
  
)(); 