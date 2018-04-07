(() => {
  'use strict';
  angular
  .module('prototipo')
  .directive('optionSucursal', optionSucursal);
  
  function optionSucursal(servicioSucursales){

    let optionController = function(){
      const vm = this;

      vm.informacionSucursales = servicioSucursales.retornarNombreSucursalesLS();
    }

    let option = {
      templateUrl: '/components/directives/optionSucursales/optionSucursales.view.html',
      restrict: 'EA',
      require: 'ngClick',
      controller: optionController,
      controllerAs: 'vm',
    }

      return option;
    };

})();