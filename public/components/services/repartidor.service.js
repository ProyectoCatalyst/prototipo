(()=> {
    'use strict'

    angular
    .module('prototipo')
    .service('servicioRepartidor', servicioRepartidor)

    servicioRepartidor.$inject = ['$q', '$http', '$log', 'localStorageFactory']
    function servicioRepartidor($q, $http, $log, localStorageFactory){

        let publicAPI = {
            retornarRepartidoresSucursal: _retornarRepartidoresSucursal,
            agregarRepartidor: _agregarRepartidor,
            retornarTodosRepartidores: _retornarTodosRepartidores,
            cambiarEstadoRepartidor: _cambiarEstadoRepartidor,
            agregarRazonDesact: _agregarRazonDesact,
            retornarTodasLicencias: _retornarTodasLicencias,
            registrarLicencia: _registrarLicencia,
            cambiarEstadoLicencia: _cambiarEstadoLicencia,
            retornarLicencias: _retornarLicencias
        };

        return publicAPI

        function _retornarRepartidoresSucursal(psucursal){ // necesita recibir la sucursal que se ingresa en el form
            let repartidoresLS = JSON.parse(localStorage.getItem('repartidoresLS')),
                repartidoresTemp = [];

                // filtar para trabajar con la sucursal en la cual voy a agregar el repartidor
                if(repartidoresLS ==  null){
                    return repartidoresTemp
                }else{
                    repartidoresLS.forEach(objRepartidorTemp => {
                        if(objRepartidorTemp.sucursal == psucursal){

                            let repartidores = new Repartidor(objRepartidorTemp.nombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.cedula, objRepartidorTemp.fecha, objRepartidorTemp.genero, objRepartidorTemp.correo, objRepartidorTemp.contrasenna, objRepartidorTemp.rol, objRepartidorTemp.telefono, objRepartidorTemp.estado, objRepartidorTemp.razonDesact);

                            // objRepartidorTemp.paqueteAsignado.forEach(objPaqueteAsignadoTemp => {
                            //     let objPaqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                            //     
                            //     repartidores.setPaquete(objPaqueteAsignado);
                            // });
    
                            objRepartidorTemp.licencia.forEach(objLicenciaTemp => {
                                 let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);
    
                                 repartidores.setLicencia(objLicencia);
                            });
    
                            repartidoresTemp.push(repartidores);   
                        }
                    });
                    return repartidoresTemp
                }
        }

        function _agregarRepartidor(aDatos){
            let repartidoresLS = _retornarRepartidoresSucursal(aDatos[1]); // enviar valor del select con la sucursal a la cual se va a agregar
            repartidoresLS.push(aDatos[0]);
            localStorage.setItem('repartidoresLS', JSON.stringify(repartidoresLS));

        }

        function _retornarTodosRepartidores(){
            let repartidoresLS = JSON.parse(localStorage.getItem('repartidoresLS')),
                todosLosRepartidores = [],
                repartidoresDesact = [],
                repartidoresAct = [];

                if(repartidoresLS == null){
                    return todosLosRepartidores;
                }else{
                    repartidoresLS.forEach(objRepartidorTemp => {

                        let objRepartidor = new Repartidor(objRepartidorTemp.nombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.cedula, objRepartidorTemp.fecha, objRepartidorTemp.genero, objRepartidorTemp.correo, objRepartidorTemp.contrasenna, objRepartidorTemp.rol, objRepartidorTemp.telefono, objRepartidorTemp.estado, objRepartidorTemp.razonDesact);

                        objRepartidorTemp.licencia.forEach(objLicenciaTemp => {

                            let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo);

                            objRepartidor.setLicencia(objLicencia);
                        });

                        if(objRepartidorTemp.estado){
                            repartidoresAct.push(objRepartidorTemp);
                        }else{
                            repartidoresDesact.push(objRepartidorTemp);
                        }
                    });

                    todosLosRepartidores = [repartidoresAct, repartidoresDesact];
                }

            return todosLosRepartidores
        }

        function _cambiarEstadoRepartidor(pcedula){
            let repartidoresLS = _retornarTodosRepartidores(),
                repartidoresAct = repartidoresLS[0],
                todosLosRepartidores = [],
                licenciasRepartidor = [];

            for(let i=0; i<repartidoresAct.length; i++){

                if(repartidoresAct[i].cedula == pcedula){
                    repartidoresAct[i].estado = !repartidoresAct[i].estado;

                    licenciasRepartidor = repartidoresAct[i].licencia;
                    for(let j=0; j<licenciasRepartidor.length; j++){

                        licenciasRepartidor[j].estado = false;
                    }
                }
                repartidoresLS[1].push(repartidoresAct[i]);
            }
            // console.log(repartidoresLS)
            actualizarLS(repartidoresLS[1]);
            
        }

        function _agregarRazonDesact(pdatos){
            let repartidoresLS = _retornarTodosRepartidores(),
                repartidoresDesact = repartidoresLS[1],
                todosLosRepartidores = [];

            for(let i=0; i<repartidoresDesact.length; i++){

                if(repartidoresDesact[i].cedula == pdatos[0]){
                    repartidoresDesact[i].razonDesact = pdatos[1];
                }
                repartidoresLS[0].push(repartidoresDesact[i]);
            }
            // console.log(repartidoresLS)
            actualizarLS(repartidoresLS[0]);

        }

        function _retornarTodasLicencias(){

            let todosLosRepartidores = _retornarTodosRepartidores(),
                repartidoresActivos = todosLosRepartidores[0],
                todasLasLicencias = [],
                licenciaActuales = [];

            for(let i=0; i<repartidoresActivos.length; i++){
                licenciaActuales = repartidoresActivos[i].licencia; // obtener todas las licencias del repartidor 'i'

                licenciaActuales.forEach(objLicenciaTem => {
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
                repartidoresLS = _retornarRepartidoresSucursal(sucursalRepartidor);

            for(let i=0; i<repartidoresLS.length; i++){
                if(repartidoresLS[i].getCedula() == cedulaRepartidor){
                    repartidoresLS[i].setLicencia(objLicenciaRegistrar);
                }
            }
            console.log(repartidoresLS);
            actualizarLS(repartidoresLS);
        }

        function _cambiarEstadoLicencia(pdatos){

            let repartidoresLS = _retornarRepartidoresSucursal(pdatos[1]), // sucursal
                licenciasRepartidor = [];

            for(let i=0; i<repartidoresLS.length; i++){
                
                if(repartidoresLS[i].getCedula() == pdatos[0]){ // cedula
                    licenciasRepartidor = repartidoresLS[i].getLicencias();
                    for(let x=0; x<licenciasRepartidor.length; x++){
                        if(licenciasRepartidor[x].getCodigo() == pdatos[2]){ // codigo
                            licenciasRepartidor[x].estado = !licenciasRepartidor[x].estado;
                        }
                    }
                    repartidoresLS[i].licencia = licenciasRepartidor;
                }

            }

            actualizarLS(repartidoresLS);

        }

        function _retornarLicencias(pdatos){

            let repartidoresLS = _retornarRepartidoresSucursal(pdatos[1]),
                licenciasDesactivadas = [],
                licenciasActivas = [],
                licenciasRepartidor = [],
                licencias = [];

            for(let i=0; i<repartidoresLS.length; i++){

                if(repartidoresLS[i].getCedula() == pdatos[0]){
                    licenciasRepartidor = repartidoresLS[i].getLicencias();
                    for(let x=0; x<licenciasRepartidor.length; x++){
                        if(!licenciasRepartidor[x].getEstado()){
                            licenciasDesactivadas.push(licenciasRepartidor[x]);
                        }else{
                            licenciasActivas.push(licenciasRepartidor[x]);
                        }
                    }
                }
                
            }
            licencias = [licenciasActivas, licenciasDesactivadas];
            return licencias
        }


        //______funciones internas_________

        function actualizarLS(prepartidoresLS){
            localStorage.setItem('repartidoresLS', JSON.stringify(prepartidoresLS));
        }
    }
})();