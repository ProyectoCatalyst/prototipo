(() => {
  'use strict';
  angular
  .module('prototipo')
  .directive('footerPrincipal', footerPrincipal);
  
  function footerPrincipal(){
    const footer = {
      templateUrl: '/components/directives/footer/footer.view.html',
      restrict: 'EA' //E = Etiqueta, A = Atributo, C = Comentario, M.
    };

    return footer;
  }
})();