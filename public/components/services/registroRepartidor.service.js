(()=> {
    'use strict'

    angular
    .module('prototipo')
    .service('servicioRegistroRepartidor', servicioRegistroRepartidor)

    servicioRegistroRepartidor.$inject = ['$q', '$http', '$log']
    function servicioRegistroRepartidor($q, $http, $log){
        let publicAPI = {
            retornarRepartidores: _retornarRepartidores,
            agregarRepartidor: _agregarRepartidor
        };
        return publicAPI

        function _retornarRepartidores(psucursal){ // necesita recibir la sucursal que se ingresa en el form
            let repartidoresLS = JSON.parse(localStorage.getItem('repartidoresLS')),
                repartidoresTemp = [];

                // filtar para trabajar con la sucursal en la cual voy a agregar el repartidor
                if(repartidoresLS ==  null){
                    return repartidoresTemp
                }else{
                    repartidoresLS.forEach(objRepartidorTemp => {
                        let repartidores = new Repartidor(objRepartidorTemp.cedula, objRepartidorTemp.foto, objRepartidorTemp.nombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.correo, objRepartidorTemp.telefono, objRepartidorTemp.telefonoAdicional, objRepartidorTemp.sucursal, objRepartidorTemp.genero, objRepartidorTemp.fechaNacimiento, objRepartidorTemp.contrasenna, objRepartidorTemp.confirmarContrasenna);

                        // objTemp.paqueteAsignado.forEach(objPaqueteAsignadoTem => {
                        //     let paqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                        // });
                        repartidoresTemp.push(repartidores);
                    });
                    return repartidoresTemp
                }
        }

        function _agregarRepartidor(aDatos){
            let repartidoresLS = _retornarRepartidores(aDatos[1]); // enviar valor del select con la sucursal a la cual se va a agregar
            repartidoresLS.push(aDatos[0]);
            localStorage.setItem('repartidoresLS', JSON.stringify(repartidoresLS));

        }

        //______funciones del service_______


        //______funciones internas_________
    }
})();