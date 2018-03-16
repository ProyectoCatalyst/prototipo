(() => {
    'use strict'

    angular
    .module('prototipo')
    .controller('controladorListarSucursales', controladorListarSucursales)

    controladorListarSucursales.$inject = ['$state', '$stateParams', 'servicioSucursales']
    function controladorListarSucursales($state, $stateParams, servicioSucursales){
        let vm = this;

        vm.listarSucursales = ['San Jose', 'Alajuela'];//servicioSucursales.retornarSucursales();


    }
})();