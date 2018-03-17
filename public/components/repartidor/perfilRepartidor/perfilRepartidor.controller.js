(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorPerfilRepartidor', controladorPerfilRepartidor)

  controladorPerfilRepartidor.$inject = ['$stateParams', '$state', 'servicioRepartidor']
  function controladorPerfilRepartidor($stateParams, $state, servicioRepartidor){
    let vm = this;

    let datosRepartidor = JSON.parse($stateParams.datos);

    console.log(datosRepartidor)

    vm.listarLicencias = () => {
      $state.go('listarLicencias', {datos: JSON.stringify(datosRepartidor)});
    }
  }
})();