(() => {
  'use strict';
  angular
  .module('prototipo')
  .directive('optionSucursal', optionSucursal);
  
  function optionSucursal(){
    const option = {
      templateUrl: '/components/directives/optionSucursales/optionSucursales.view.html',
      controller: 'controladorOptionSucursales',
      controllerAs: 'vm',
      restrict: 'EA' //E = Etiqueta, A = Atributo, C = Comentario, M.
    };

    return option;
  }
})();