(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorListarFacturas', controladorListarFacturas);

    controladorListarFacturas.$inject = ['$stateParams', '$state', '$http', 'servicio'];

  function controladorListarFacturas($stateParams, $state, $http, servicio ){
    let vm = this;

    //vm.listarFacturas = servicio

    
  }



})();