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
            filtrarRepartidores : _filtrarRepartidores,
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

                            let repartidores = new Repartidor(objRepartidorTemp.primerNombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.cedula, objRepartidorTemp.fecha, objRepartidorTemp.genero, objRepartidorTemp.ubicacion, objRepartidorTemp.provincia, objRepartidorTemp.canton, objRepartidorTemp.distrito, objRepartidorTemp.direccion,objRepartidorTemp.correo, objRepartidorTemp.contrasenna, objRepartidorTemp.rol, objRepartidorTemp.telefono, objRepartidorTemp.estado, objRepartidorTemp.razonDesact, objRepartidorTemp.sucursal);

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

                        let objRepartidor = new Repartidor(objRepartidorTemp.primerNombre, objRepartidorTemp.segundoNombre, objRepartidorTemp.primerApellido, objRepartidorTemp.segundoApellido, objRepartidorTemp.cedula, objRepartidorTemp.fecha, objRepartidorTemp.genero, objRepartidorTemp.ubicacion, objRepartidorTemp.provincia, objRepartidorTemp.canton, objRepartidorTemp.distrito, objRepartidorTemp.direccion,objRepartidorTemp.correo, objRepartidorTemp.contrasenna, objRepartidorTemp.rol, objRepartidorTemp.telefono, objRepartidorTemp.estado, objRepartidorTemp.razonDesact, objRepartidorTemp.sucursal);

                        objRepartidorTemp.licencia.forEach(objLicenciaTemp => {

                            let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);

                            objRepartidor.setLicencia(objLicencia);
                        });
                        todosLosRepartidores.push(objRepartidor);
                    });
                }

            return todosLosRepartidores
        }

        function _cambiarEstadoRepartidor(pcedula){
            let repartidoresLS = _retornarTodosRepartidores(),
                todosLosRepartidores = [],
                licenciasRepartidor = [];

            for(let i=0; i<repartidoresLS.length; i++){

                if(repartidoresLS[i].getCedula() == pcedula){
                    repartidoresLS[i].estado = !repartidoresLS[i].getEstado();

                    licenciasRepartidor = repartidoresLS[i].getLicencias(); // guardo todas las licencias de ese repartidor en este arreglo
                    for(let j=0; j<licenciasRepartidor.length; j++){

                        licenciasRepartidor[j].estado = false; // desactivo todas las licencias
                    }
                }
                todosLosRepartidores.push(repartidoresLS[i]); // asigno los repartidores actualizados y los no actualizados
            }
            // console.log(repartidoresLS)
            actualizarLS(todosLosRepartidores);
            
        }

        function _agregarRazonDesact(pdatos){
            let repartidoresLS = _retornarTodosRepartidores(), // obtengo todos los repartidores
                todosLosRepartidores = [];

            for(let i=0; i<repartidoresLS.length; i++){
                
                if(!repartidoresLS[i].getEstado()){ // filtro los desactivados

                    if(repartidoresLS[i].getCedula() == pdatos[0]){ // filtro por la cedula que del repartidor que acaba de desactivar
                        repartidoresLS[i].razonDesact = pdatos[1]; // agrego la razon de la desactivacion
                    }

                }
                
                todosLosRepartidores.push(repartidoresLS[i]); // agrego cada array a esta nueva lista, actualizados o no
            }
            // console.log(repartidoresLS)
            actualizarLS(todosLosRepartidores); 

        }

        function _filtrarRepartidores(plistaTodosRepartidores){
            let listaRepartidoresAct = [],
                listaRepartidoresDesact = [],
                listaTodosRepartidores = [];

            for(let i=0; i<plistaTodosRepartidores.length; i++){
                if(plistaTodosRepartidores[i].getEstado()){
                    listaRepartidoresAct.push(plistaTodosRepartidores[i])
                }else{
                    listaRepartidoresDesact.push(plistaTodosRepartidores[i]);
                }
            }
            listaTodosRepartidores = [listaRepartidoresAct, listaRepartidoresDesact];

            return listaTodosRepartidores
        }

        function _retornarTodasLicencias(){

            let todosLosRepartidores = _retornarTodosRepartidores(),  // ya viene con formato
                todasLasLicencias = [],
                licenciasActuales = [];

            for(let i=0; i<todosLosRepartidores.length; i++){
                licenciasActuales = todosLosRepartidores[i].getLicencias(); // obtener todas las licencias del repartidor 'i'

                for(let j=0; j<licenciasActuales.length; j++){
                    
                    if(licenciasActuales[j] == null ){
                    
                    }else{
                        todasLasLicencias.push(licenciasActuales[j]);
                    }
                       
                }
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