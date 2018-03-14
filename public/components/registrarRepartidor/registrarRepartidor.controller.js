(() => {
    'use strcit'
    angular
    .module('prototipo')
    .controller('controladorRegistrarRepartidor', controladorRegistrarRepartidor);

    controladorRegistrarRepartidor.$inject = ['servicioRegistroRepartidor'];
    function controladorRegistrarRepartidor(servicioRegistroRepartidor){
        let vm = this;
    }

})();