(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarConvenio', controladorRegistrarConvenio);

  controladorRegistrarConvenio.$inject = ['$stateParams', '$state', '$http', 'servicioConvenio'];

  function controladorRegistrarConvenio($stateParams, $state, $http, servicioConvenio) {
    let vm = this;

    vm.registrarConvenio = (pconvenioNuevo) => {

      let objNuevoConvenio = new Convenio(pconvenioNuevo.codigoConvenio, pconvenioNuevo.nombreConvenio,
        pconvenioNuevo.descripcionConvenio,
        pconvenioNuevo.institucionConvenio,
        pconvenioNuevo.costoConvenio
      );

      let repetido = servicioConvenio.agregarConvenio(objNuevoConvenio);

      if(repetido){
        swal({
          title: "Convenio no registrado",
          text: "El convenio ya existe en el sistema",
          icon: "error",
          button: "Aceptar"
        });
      }else{
        swal({
          title: "Convenio registrado",
          text: "El convenio se ha registrado exitosamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('main.listaConvenios')
      }
    }
  }
})();