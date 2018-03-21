(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorPerfilRepartidor', controladorPerfilRepartidor)

  controladorPerfilRepartidor.$inject = ['$stateParams', '$state', 'servicioUsuarios']
  function controladorPerfilRepartidor($stateParams, $state, servicioUsuarios){
    let vm = this;

    let datosRepartidor = JSON.parse($stateParams.datos);

    console.log(datosRepartidor);

    vm.consultarLicencias = () => {
      $state.go('listarLicencias', {datos: JSON.stringify(datosRepartidor)});
    } 
    
  }
})();