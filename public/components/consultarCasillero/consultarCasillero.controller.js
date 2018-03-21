(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorConsultarCasillero', controladorConsultarCasillero);

    controladorConsultarCasillero.$inject = ['$stateParams', '$state', '$http', 'servicio'];

  function controladorConsultarCasillero($stateParams, $state, $http, servicio){
    let vm = this;

    //vm.consultarCasillero = servicio

    
  }



})();