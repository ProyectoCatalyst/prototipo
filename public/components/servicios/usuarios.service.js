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
      retornarCorreosUsuarios:  _retornarCorreosUsuarios,
      retornarRepartidoresSucursal: _retornarRepartidoresSucursal,
      agregarRepartidor: _agregarRepartidor,
      retornarTodosRepartidores: _retornarTodosRepartidores,
      cambiarEstadoRepartidor: _cambiarEstadoRepartidor,
      agregarRazonDesact: _agregarRazonDesact,
      filtrarRepartidores : _filtrarRepartidores,
      editarRepartidor: _editarRepartidor,
      retornarInformacionRepartidor: _retornarInformacionRepartidor,
      retornarTodasLicencias: _retornarTodasLicencias,
      retornarLicenciasRepartidor: _retornarLicenciasRepartidor,
      registrarLicencia: _registrarLicencia,
      cambiarEstadoLicencia: _cambiarEstadoLicencia,
      retornarLicencias: _retornarLicencias,
      editarLicencias: _editarLicencias,
      retornarPaquetesAsignados: _retornarPaquetesAsignados,
      actualizarUsuario: _actualizarUsuario,
      obtenerListaPorEstados: _obtenerListaPorEstados
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
              let tempEncargadoAduana = new EncargadoAduanas(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

              listadeusuarios.push(tempEncargadoAduana);
            break;

            case 3:
              let tempEncargadoSucursal = new EncargadoSucursales(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

              listadeusuarios.push(tempEncargadoSucursal);
            break;

            case 4:

                if(obj.estado == true){
                    let repartidoresTemp = new Repartidor(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, obj.fecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion,obj.correo, obj.contrasenna, obj.rol, obj.telefono, obj.telefonoAdicional, obj.estado, obj.razonDesact, obj.sucursal);

                    // obj.paqueteAsignado.forEach(objPaqueteAsignadoTemp => {
                    //     let objPaqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                    //     
                    //     repartidores.setPaquete(objPaqueteAsignado);
                    // });
        
                    obj.licencia.forEach(objLicenciaTemp => { // obtengo la licencia de este usuario y le doy formato

                        let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);

                        repartidoresTemp.setLicencia(objLicencia); // seteo la licencia en ese repartidor, nombrado como nueva varialble en linea 118
                    });
                
                    listadeusuarios.push(repartidoresTemp);
                }

            break;

            case 5:
              let tempCliente = new Cliente(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono);

              listadeusuarios.push(tempCliente);
            break;

            default:

              let tempUsuario = new Usuario(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

              listadeusuarios.push(tempUsuario);
            break;
          }
        });
      }

      return listadeusuarios;
    }

    function _actualizarUsuario (pusuarioModificado){
      let listadeusuarios = _obtenerlistadeusuarios();

      for (let i = 0; i < listadeusuarios.length; i++){
        if(listadeusuarios[i].getCorreo() == pusuarioModificado.getCorreo()){
          listadeusuarios[i] = pusuarioModificado;
        }
      }

      let modificacionExitosa = localStorageFactory.setItem(listaUsuarios, listadeusuarios);
      
      return modificacionExitosa;
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

    function _retornarCorreosUsuarios(){
        let usuariosLS = localStorageFactory.getItem(listaUsuarios),
            cedulasSistema = [];

        for(let i=0; i<usuariosLS.length; i++){
            cedulasSistema.push( usuariosLS[i].correo );
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
                return todosUsuarios
            
            }
    }

    function _agregarRepartidor(aDatos){
        let usuariosLS = _obtenerlistadeusuarios(); // enviar valor del select con la sucursal a la cual se va a agregar
        usuariosLS.push(aDatos[0]);
        localStorageFactory.setItem(listaUsuarios, usuariosLS);

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

    function _cambiarEstadoRepartidor(pdatos){
        let usuariosLS = _obtenerlistadeusuarios(),
            todosLosUsuarios = [],
            licenciasRepartidor = [];

        for(let i=0; i<usuariosLS.length; i++){

            if(usuariosLS[i].getCorreo() == pdatos[0]){ // filtro repartidor
                usuariosLS[i].estado = !usuariosLS[i].getEstado();
                usuariosLS[i].razonDesact = pdatos[1];

                licenciasRepartidor = usuariosLS[i].getLicencias(); // guardo todas las licencias de ese repartidor en este arreglo
                for(let j=0; j<licenciasRepartidor.length; j++){

                    licenciasRepartidor[j].estado = false; // desactivo todas las licencias
                }
            }
            todosLosUsuarios.push(usuariosLS[i]); // asigno los repartidores actualizados y los no actualizados
        }
        actualizarLS(todosLosUsuarios);
        
    }

    function _agregarRazonDesact(pdatos){ // correo razon
        let usuariosLS = _obtenerlistadeusuarios(), // obtengo todos los usuarios
            todosLosRepartidores = [];

        for(let i=0; i<usuariosLS.length; i++){
            
            if(usuariosLS[i].getCorreo() == pdatos[0]){ // filtro por correo

                if(!usuariosLS[i].getEstado()){ // filtro por estado

                    usuariosLS[i].razonDesact = pdatos[1]; // agrego la razon de la desactivacion
                }

            }
            
            todosLosRepartidores.push(usuariosLS[i]); // agrego cada array a esta nueva lista, actualizados o no
        }
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
        let usuariosLS = _obtenerlistadeusuarios(); // obtener todos los usuarios

        for(let i=0; i<usuariosLS.length; i++){ // recorro todos los usuarios

            if(usuariosLS[i].getCorreo() == pobjEditarInfo.correo){ // filtro con el correo el repartidor que voy a trabajar
                pobjEditarInfo.licencia = usuariosLS[i].getLicencias(); // al objeto con la info nueva lwe agrego los atributos con informacion requerida como licencias y paquetes asignados
                pobjEditarInfo.paqueteAsignado = usuariosLS[i].getPaqAsignados(); // igual acá
                usuariosLS[i] = pobjEditarInfo; // en el usuario número i que fue donde encontre a mi repartidor, lo agrego a la nueva lista, reemplazando el anterior
            }

        }
        actualizarLS(usuariosLS) // actualizo LS
    }

    function _retornarInformacionRepartidor(){
        let activo = JSON.parse(sessionStorage.getItem('session')),
            repartidores = _retornarTodosRepartidores(),
            datos = [];

        for(let i=0; i<repartidores.length; i++){
            if(repartidores[i].getCorreo() == activo){
                datos = [repartidores[i].getCorreo(), repartidores[i].sucursal];
            }
        }
        return datos
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

    function _retornarLicenciasRepartidor(datos){ // correo, sucursal
        let repartidoresLS = _retornarRepartidoresSucursal(datos[1]), // sucursal
            licenciasRepartidor = [];

        for(let i=0; i<repartidoresLS.length; i++){
            if(repartidoresLS[i].getCorreo() == datos[0]){
                licenciasRepartidor = repartidoresLS[i].getLicencias();
            }
        }
        return licenciasRepartidor
    }

    function _registrarLicencia(pdatosAgregar){ // objLicencia, correo, sucursal
        let objLicenciaRegistrar = pdatosAgregar[0],
            correoRepartidor = pdatosAgregar[1],
            sucursalRepartidor = pdatosAgregar[2],
            usuariosLS = _obtenerlistadeusuarios(); // llamo todos los usuarios

        for(let i=0; i<usuariosLS.length; i++){
            if(usuariosLS[i].getCorreo() == correoRepartidor){ // encuentro el repartidor al que le quiero agregar la licencia
                usuariosLS[i].setLicencia(objLicenciaRegistrar); // agrego la licencia
            }
        }
        actualizarLS(usuariosLS); // actualizo
    }

    function _cambiarEstadoLicencia(pdatos){ // correo, sucursal, codigo de licencia

        let usuariosLS = _obtenerlistadeusuarios(), // llamo todos los usuarios
            licenciasRepartidor = [];

        for(let i=0; i<usuariosLS.length; i++){
            
            if(usuariosLS[i].getCorreo() == pdatos[0]){ // filtro por  correo
                licenciasRepartidor = usuariosLS[i].getLicencias(); // obtengo licencias
                for(let x=0; x<licenciasRepartidor.length; x++){
                    if(licenciasRepartidor[x].getCodigo() == pdatos[2]){ // codigo
                        licenciasRepartidor[x].estado = !licenciasRepartidor[x].estado;
                    }
                }
                usuariosLS[i].licencia = licenciasRepartidor;
            }

        }

        actualizarLS(usuariosLS);

    }

    function _retornarLicencias(pdatos){ // correo, sucursal

        let repartidoresLS = _retornarRepartidoresSucursal(pdatos[1]),
            licenciasDesactivadas = [],
            licenciasActivas = [],
            licenciasRepartidor = [],
            licencias = [];

        for(let i=0; i<repartidoresLS.length; i++){

            if(repartidoresLS[i].getCorreo() == pdatos[0]){
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

    function _editarLicencias(pdatos){ // infoRepartidor (correo, sucursal y nombre), nuevaLicencia, licencia
        let licenciasRepartidor = _retornarLicenciasRepartidor(pdatos[0]), // inforepartidor ( correo, sucursal y nombre), obtengo las licencias de ese repartidor
            datos = [];

       for(let i=0; i<licenciasRepartidor.length; i++){
        if( licenciasRepartidor[i].getCodigo() == pdatos[1].codigo){
            licenciasRepartidor[i] = pdatos[1];
        }

       }
       datos = [pdatos[0], licenciasRepartidor]; // info repartidor(correo, sucursal), todas las licencias del repartidor
       actualizarLicenciasRepartidor(datos);

    }

    function _retornarPaquetesAsignados(pdatos){ // cedula y sucursal
        let repartidoresLS = _retornarRepartidoresSucursal(pdatos[1]),
            paquetesActuales = [],
            paquetesAsignados = [];

        for(let i=0; i<repartidoresLS.length; i++){
            paquetesActuales = repartidoresLS[i].getPaqAsignados(); // asignar paquetes a una variable que llama a los paquetes del repartidor en cuestion

            for(let j=0; j<paquetesActuales.length; j++){
                if(repartidoresLS[i].getCorreo() == pdatos[0]){
                    paquetesAsignados.push(paquetesActuales[j]);
                }
            }
        }
        return paquetesAsignados
    }

    //______funciones internas_________

    function actualizarLicenciasRepartidor(pdatos){ // repartidor(correo y sucursal), todas las licencias
        let usuariosLS = _obtenerlistadeusuarios(); // dobtengo todos los usuarios

        for(let i=0; i<usuariosLS.length; i++){

            if(usuariosLS[i].getCorreo() == pdatos[0][0]){ // datosRepartidor => correo. encuentro el repartidor dentro del monton

                usuariosLS[i].licencia = pdatos[1]; // en el objegto licencia reemplazo con las nuevas licencias
            }
        }

        actualizarLS(usuariosLS);

    }
  
    function actualizarLS(prepartidoresLS){
        localStorageFactory.setItem(listaUsuarios, prepartidoresLS);
    }
           
    // function _desactivarCuenta(pcorreo) {
    function _obtenerListaPorEstados(pestado) {
      let listadeusuarios = _obtenerlistadeusuarios(),
          listaFiltrada = [];

      for(let i = 0; i < listadeusuarios.length; i++){
        if(listadeusuarios[i].getEstado() == pestado){
          listaFiltrada.push(listadeusuarios[i]);
        }
      }
      return listaFiltrada;
    }
    
  };

})();
