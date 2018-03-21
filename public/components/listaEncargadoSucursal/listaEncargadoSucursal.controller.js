(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorListaEncargadoSucursal', controladorListaEncargadoSucursal);

    controladorListaEncargadoSucursal.$inject = ['$stateParams', '$state', '$http', 'servicioConvenio'];

  function controladorListaEncargadoSucursal($stateParams, $state, $http, servicioUsuarios ){
    let vm = this;

    //vm.listarEncargadoSucursal = servicioUsuarios

    
  }



})();