(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarConvenio', controladorRegistrarConvenio);

  controladorRegistrarConvenio.$inject = ['$stateParams', '$state', '$http', 'servicioConvenio'];

  function controladorRegistrarConvenio($stateParams, $state, $http, servicioConvenio) {
    let vm = this;

    vm.convenioNuevo = {};
    vm.listarConvenios = servicioConvenio.retornarConvenio();

    vm.registrarConvenio = (pconvenioNuevo) => {
      console.log(pconvenioNuevo);

      let registroExitoso;

      let objNuevoConvenio = new Convenio(pconvenioNuevo.codigo, pconvenioNuevo.nombre,
        pconvenioNuevo.descripcion,
        pconvenioNuevo.institucion,
        pconvenioNuevo.costo,
      );

      console.log('objeto con convenio');
      console.log(objNuevoConvenio);

      registroExitoso = servicioConvenio.agregarConvenios(objNuevoConvenio);

      if(registroExitoso == true){
        swal({
          title: "Registro exitoso",
          text: "El convenio ha sido registrado correctamente",
          icon: "success",
          button: "Aceptar"
        });
        vm.convenioNuevo = null;
      }else{
        swal({
          title: "Ha ocurrido un error",
          text: "Ha ocurrido un error intentelo más tarde",
          icon: "error",
          button: "Aceptar"
        });
      }
    }




  }
})();