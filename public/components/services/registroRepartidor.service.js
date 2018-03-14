(()=> {
    'use strict'

    angular
    .module('prototipo')
    .service('servicioRegistroRepartidor', servicioRegistroRepartidor)

    servicioRegistroRepartidor.$inject = ['$q', '$http', '$log']
    function servicioRegistroRepartidor($q, $http, $log){
        let publicAPI = {

        };
        return publicAPI

        //______funciones del service_______


        //______funciones internas_________
    }
})();