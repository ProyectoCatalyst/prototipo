(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorListarConvenios', controladorListarConvenios)

  controladorListarConvenios.$inject = ['$state', '$stateParams', 'servicioConvenio'];
  function controladorListarConvenios($state, $stateParams, servicioConvenio){
    let vm = this;

    vm.listarConvenios = servicioConvenio.retornarConvenio();

    vm.eliminarConvenio = (pconvenioEliminar) => {
      let eliminacion = servicioConvenio.eliminarConvenio(pconvenioEliminar);

      if(eliminacion){
        $state.reload()
      }else{
        swal({
          title: "Hubo un problema en la eliminación",
          text: "Intente de nuevo mas tarde",
          icon: "error",
          button: "Aceptar :("
        });
      }
    }

    vm.editarConvenio = (convenioMod) => {
      $state.go('main.editarConvenios', {convenioMod: JSON.stringify(convenioMod)});
    }

    vm.agregarConvenio = () => {
      $state.go('main.registrarConvenio')
    }

  }

})();