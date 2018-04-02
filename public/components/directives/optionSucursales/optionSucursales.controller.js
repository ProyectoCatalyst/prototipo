(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorOptionSucursales', controladorOptionSucursales)

  controladorOptionSucursales.$inject = ['servicioSucursales']

  function controladorOptionSucursales(servicioSucursales){
    let vm = this;

    vm.informacionSucursales = servicioSucursales.retornarNombreSucursalesLS();
  };
})();