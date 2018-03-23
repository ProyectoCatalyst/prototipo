(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http', 'localStorageFactory'];

  function servicioUsuarios($q, $log, $http, localStorageFactory) {

    const listaUsuarios = 'usuariosLS'; // este es el key

    let publicAPI = {
      agregarUsuario: _agregarUsuario,
      obtenerlistadeusuarios: _obtenerlistadeusuarios,
      obtenerlistadeFiltrada: _obtenerListaFiltrada,
      retornarCedulaUsuarios:  _retornarCedulaUsuarios,
      retornarRepartidoresSucursal: _retornarRepartidoresSucursal,
      agregarRepartidor: _agregarRepartidor,
      retornarTodosRepartidores: _retornarTodosRepartidores,
      cambiarEstadoRepartidor: _cambiarEstadoRepartidor,
      agregarRazonDesact: _agregarRazonDesact,
      filtrarRepartidores : _filtrarRepartidores,
      editarRepartidor: _editarRepartidor,
      retornarTodasLicencias: _retornarTodasLicencias,
      retornarLicenciasRepartidor: _retornarLicenciasRepartidor,
      registrarLicencia: _registrarLicencia,
      cambiarEstadoLicencia: _cambiarEstadoLicencia,
      retornarLicencias: _retornarLicencias,
      editarLicencias: _editarLicencias,
      retornarPaquetesAsignados: _retornarPaquetesAsignados
    };
    return publicAPI; 


    function _agregarUsuario(pNuevoCliente) {
      let listadeusuarios = _obtenerlistadeusuarios(),
          registrovalido,
          usuariorepetido = false;

      for(let i=0; i<listadeusuarios.length; i++){
        if(listadeusuarios[i].getCorreo() == pNuevoCliente.getCorreo()){
          usuariorepetido = true;
        }  
      }

      if (usuariorepetido == true){
        registrovalido = false;
      } else{
        listadeusuarios.push(pNuevoCliente);
        registrovalido = localStorageFactory.setItem(listaUsuarios, listadeusuarios);
      }

      return registrovalido;
    };

    function _obtenerlistadeusuarios() {
      let listadeusuarioslocal = localStorageFactory.getItem(listaUsuarios),
          listadeusuarios = [];
      
      if (listadeusuarioslocal == []){
        listadeusuarios = []
      }else{
        listadeusuarioslocal.forEach(obj => {
          let tempfecha = new Date(obj.fecha);

          switch(obj.rol){
            case 2:
              let tempEncargadoAduana = new EncargadoAduanas(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol);

              listadeusuarios.push(tempEncargadoAduana);
            break;

            case 3:
              let tempEncargadoSucursal = new EncargadoSucursales(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol);

              listadeusuarios.push(tempEncargadoSucursal);
            break;

            case 5:
              let tempCliente = new Cliente(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.telefono);

              listadeusuarios.push(tempCliente);
            break;
          }
        });
      }

      return listadeusuarios;
    }

    function _obtenerListaFiltrada(pnumrol){
      let listadeusuarios = _obtenerlistadeusuarios(),
          listaFiltrada = [];

      for(let i = 0; i < listadeusuarios.length; i++){
        if(listadeusuarios[i].getRol() == pnumrol){
          listaFiltrada.push(listadeusuarios[i]);
        }
      }

      return listaFiltrada;
    }

    function _retornarCedulaUsuarios(){
        let usuariosLS = localStorageFactory.getItem(listaUsuarios),
            cedulasSistema = [];

        for(let i=0; i<usuariosLS.length; i++){
            cedulasSistema.push( usuariosLS[i].cedula );
        }

        return cedulasSistema
    }
    
    // _____servicio repartidores_______

    function _retornarRepartidoresSucursal(psucursal){ // necesita recibir la sucursal que se ingresa en el form
        let repartidoresLS = localStorageFactory.getItem(listaUsuarios),
            todosUsuarios = [];

            // filtar para trabajar con la sucursal en la cual voy a agregar el repartidor
            if(repartidoresLS ==  null){
                return repartidoresTemp
            }else{

                repartidoresLS.forEach(objUsuarioTemp => { // recorro todos los usuarios
                    
                    if(objUsuarioTemp.rol == 4){ // filtro los usuarios con rol numero 4
                        // le doy formato de repartidor a ese usuario
                            if(objUsuarioTemp.sucursal == psucursal){ // filtro la sucursal

                                let repartidores = new Repartidor(objUsuarioTemp.primerNombre, objUsuarioTemp.segundoNombre, objUsuarioTemp.primerApellido, objUsuarioTemp.segundoApellido, objUsuarioTemp.cedula, objUsuarioTemp.fecha, objUsuarioTemp.genero, objUsuarioTemp.ubicacion, objUsuarioTemp.provincia, objUsuarioTemp.canton, objUsuarioTemp.distrito, objUsuarioTemp.direccion,objUsuarioTemp.correo, objUsuarioTemp.contrasenna, objUsuarioTemp.rol, objUsuarioTemp.telefono, objUsuarioTemp.telefonoAdicional, objUsuarioTemp.estado, objUsuarioTemp.razonDesact, objUsuarioTemp.sucursal);
        
                                // objRepartidorTemp.paqueteAsignado.forEach(objPaqueteAsignadoTemp => {
                                //     let objPaqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                                //     
                                //     repartidores.setPaquete(objPaqueteAsignado);
                                // });
        
                                objUsuarioTemp.licencia.forEach(objLicenciaTemp => { // obtengo la licencia de este usuario y le doy formato

                                     let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);
        
                                     repartidores.setLicencia(objLicencia); // seteo la licencia en ese repartidor, nombrado como nueva varialble en linea 118
                                });
        
                                objUsuarioTemp = repartidores;   // a el usuario con rol de repartidor y con la misma sucursal donde estoy trabajando le agrego el repartidor final con el formato necesario 

                                todosUsuarios.push(objUsuarioTemp); // agrego ese usuario repartidor que es lo necesito en el objeto que finalmente voy a retornar
                                
                        }
                    }
                    // todosUsuarios.push(objUsuarioTemp); no aca para no retornar un objeto sin formato
                });
                // console.log(todosUsuarios);
                return todosUsuarios
            
            }
    }

    function _agregarRepartidor(aDatos){
        let repartidoresLS = _retornarRepartidoresSucursal(aDatos[1]); // enviar valor del select con la sucursal a la cual se va a agregar
        repartidoresLS.push(aDatos[0]);
        localStorageFactory.setItem(listaUsuarios, repartidoresLS);

    }

    function _retornarTodosRepartidores(){
        let repartidoresLS = localStorageFactory.getItem(listaUsuarios),
            todosUsuarios = [];

            if(repartidoresLS == null){
                return todosLosRepartidores;
            }else{
                repartidoresLS.forEach(objUsuarioTemp => { // recorro todos los usuarios
                    
                    if(objUsuarioTemp.rol == 4){ // filtro los usuarios con rol numero 4
                        // le doy formato de repartidor a ese usuario

                        let repartidores = new Repartidor(objUsuarioTemp.primerNombre, objUsuarioTemp.segundoNombre, objUsuarioTemp.primerApellido, objUsuarioTemp.segundoApellido, objUsuarioTemp.cedula, objUsuarioTemp.fecha, objUsuarioTemp.genero, objUsuarioTemp.ubicacion, objUsuarioTemp.provincia, objUsuarioTemp.canton, objUsuarioTemp.distrito, objUsuarioTemp.direccion,objUsuarioTemp.correo, objUsuarioTemp.contrasenna, objUsuarioTemp.rol, objUsuarioTemp.telefono, objUsuarioTemp.telefonoAdicional, objUsuarioTemp.estado, objUsuarioTemp.razonDesact, objUsuarioTemp.sucursal);

                        // objRepartidorTemp.paqueteAsignado.forEach(objPaqueteAsignadoTemp => {
                        //     let objPaqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                        //     
                        //     repartidores.setPaquete(objPaqueteAsignado);
                        // });

                        objUsuarioTemp.licencia.forEach(objLicenciaTemp => { // obtengo la licencia de este usuario y le doy formato

                                let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);

                                repartidores.setLicencia(objLicencia); // seteo la licencia en ese repartidor, nombrado como nueva varialble en linea 118
                        });

                        objUsuarioTemp = repartidores;   // a el usuario con rol de repartidor y con la misma sucursal donde estoy trabajando lo igualo a el repartidor final con el formato necesario 

                        todosUsuarios.push(objUsuarioTemp); // solo agrego los ussuarios rol=4 con formato.
                        
                    }
                    // todosUsuarios.push(objUsuarioTemp);
                });
            }

        return todosUsuarios
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

    function _editarRepartidor(pobjEditarInfo){
        let repartidoresSucursal = _retornarRepartidoresSucursal(pobjEditarInfo.sucursal);

        for(let i=0; i<repartidoresSucursal.length; i++){

            if(repartidoresSucursal[i].getCedula() == pobjEditarInfo.cedula){
                pobjEditarInfo.licencia = repartidoresSucursal[i].getLicencias();
                pobjEditarInfo.paqueteAsignado = repartidoresSucursal[i].getPaqAsignados();
                repartidoresSucursal[i] = pobjEditarInfo;
            }

        }
        actualizarLS(repartidoresSucursal)
        // console.log(repartidoresSucursal)
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

    function _retornarLicenciasRepartidor(datos){ // cedula, sucursal
        let repartidoresLS = _retornarRepartidoresSucursal(datos[1]), // sucursal
            licenciasRepartidor = [];

        for(let i=0; i<repartidoresLS.length; i++){
            if(repartidoresLS[i].getCedula() == datos[0]){
                licenciasRepartidor = repartidoresLS[i].getLicencias();
            }
        }
        return licenciasRepartidor
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

    function _editarLicencias(pdatos){ // repartidor, licencia
        let licenciasRepartidor = _retornarLicenciasRepartidor(pdatos[0]),
            datos = [];

       for(let i=0; i<licenciasRepartidor.length; i++){
        if( licenciasRepartidor[i].getCodigo() == pdatos[1].codigo){
            licenciasRepartidor[i] = pdatos[1];
        }

       }
       console.log(licenciasRepartidor);
       datos = [pdatos[0], licenciasRepartidor];
       actualizarLicenciasRepartidor(datos);

    }

    function _retornarPaquetesAsignados(pdatos){ // cedula y sucursal
        let repartidoresLS = _retornarRepartidoresSucursal(pdatos[1]),
            paquetesActuales = [],
            paquetesAsignados = [];

        for(let i=0; i<repartidoresLS.length; i++){
            paquetesActuales = repartidoresLS[i].getLicencias(); // asignar paquetes a una variable que llama a los paquetes del repartidor en cuestion

            for(let j=0; j<paquetesActuales.length; j++){
                if(repartidoresLS[i].getCedula() == pdatos[0]){
                    paquetesAsignados.push(paquetesActuales[j]);
                }
            }
        }
        return paquetesAsignados
    }

    //______funciones internas_________

    function actualizarLS(prepartidoresLS){
        localStorageFactory.setItem(listaUsuarios, prepartidoresLS);
    }

    function actualizarLicenciasRepartidor(pdatos){ // repartidor, objlicencia
        let repartidoresSucursal = _retornarRepartidoresSucursal(pdatos[0][1]); // datosRepartidor => sucursal

        for(let i=0; i<repartidoresSucursal.length; i++){

            if(repartidoresSucursal[i].getCedula() == pdatos[0][0]){ // datosRepartidor => cedula
                repartidoresSucursal[i].licencia = pdatos[1];
            }
        }

        console.log(repartidoresSucursal) // ahora actualizar

        actualizarLS(repartidoresSucursal);

    }
  
         
  }
})();
