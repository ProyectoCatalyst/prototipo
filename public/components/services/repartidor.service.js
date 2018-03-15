(()=> {
    'use strict'

    angular
    .module('prototipo')
    .service('servicioRepartidor', servicioRepartidor)

    servicioRepartidor.$inject = ['$q', '$http', '$log']
    function servicioRepartidor($q, $http, $log){
        let publicAPI = {
            retornarRepartidores: _retornarRepartidores,
            agregarRepartidor: _agregarRepartidor,
            retornarTodosRepartidores: _retornarTodosRepartidores,
            retornarTodasLicencias: _retornarTodasLicencias,
            registrarLicencia: _registrarLicencia
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
                        let repartidores = new Repartidor(objRepartidorTemp.cedula, objRepartidorTemp.foto, objRepartidorTemp.nombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.correo, objRepartidorTemp.telefono, objRepartidorTemp.telefonoAdicional, objRepartidorTemp.sucursal, objRepartidorTemp.genero, objRepartidorTemp.nacimiento, objRepartidorTemp.contrasena, objRepartidorTemp.estado);

                        // objRepartidorTemp.paqueteAsignado.forEach(objPaqueteAsignadoTemp => {
                        //     let paqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                        // });

                        objRepartidorTemp.licencia.forEach(objLicenciaTemp => {
                             let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);

                             repartidores.setLicencia(objLicencia);
                        });

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

        function _retornarTodosRepartidores(){
            let repartidoresLS = JSON.parse(localStorage.getItem('repartidoresLS')),
                todosLosRepartidores = [];

                if(repartidoresLS == null){
                    return todosLosRepartidores;
                }else{
                    repartidoresLS.forEach(objRepartidorTemp => {
                        let objRepartidor = new Repartidor (objRepartidorTemp.cedula, objRepartidorTemp.foto, objRepartidorTemp.nombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.correo, objRepartidorTemp.telefono, objRepartidorTemp.telefonoAdicional, objRepartidorTemp.sucursal, objRepartidorTemp.genero, objRepartidorTemp.fechaNacimiento, objRepartidorTemp.contrasenna, objRepartidorTemp.confirmarContrasenna, objRepartidorTemp.estado);

                        objRepartidorTemp.licencia.forEach(objLicenciaTemp => {
                            let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo);
                            objRepartidor.setLicencia(objLicencia);
                        });
                        todosLosRepartidores.push(objRepartidor);
                    });
                }
            return todosLosRepartidores
        }

        function _retornarTodasLicencias(){
            let todosLosRepartidores = _retornarTodosRepartidores(),
                todasLasLicencias = [],
                licenciaAct = [];

            for(let i=0; i<todosLosRepartidores.length; i++){
                licenciaAct = todosLosRepartidores[i].getLicencias(); // obtener todas las licencias del repartidor 'i'

                licenciaAct.forEach(objLicenciaTem => {
                    let licencia = new Licencia(objLicenciaTem.codigo, objLicenciaTem.fechaVencimiento, objLicenciaTem.tipo, objLicenciaTem.estado);

                    todasLasLicencias.push(licencia);
                });
            }
            return todasLasLicencias
        }

        function _registrarLicencia(pdatosAgregar){
            let objLicenciaRegistrar = pdatosAgregar[0],
                cedulaRepartidor = pdatosAgregar[1],
                sucursalRepartidor = pdatosAgregar[2],
                repartidoresLS = _retornarRepartidores(sucursalRepartidor);

            for(let i=0; i<repartidoresLS.length; i++){
                if(repartidoresLS[i].getCedula() == cedulaRepartidor){
                    repartidoresLS[i].setLicencia(objLicenciaRegistrar);
                }
            }
            console.log(repartidoresLS);
            actualizarLS(repartidoresLS);
        }
        //______funciones del service_______

        function actualizarLS(prepartidoresLS){
            localStorage.setItem('repartidoresLS', JSON.stringify(prepartidoresLS));
        }
        //______funciones internas_________
    }
})();