(() => {
  'use strict'

  angular
  .module('prototipo')
  .directive('encabezadoPrincipal', encabezadoPrincipal);

  function encabezadoPrincipal(){
    const navegacion = {
      templateURL: '/components/directives/header/header.view.html',
      restirct: 'EA'
    }; 
    return navegacion;
  }
})();