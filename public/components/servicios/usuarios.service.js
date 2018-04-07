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
      cambiarEstadoUsuario: _cambiarEstadoUsuario,
      retornarTodasLicencias: _retornarTodasLicencias,
      retornarLicenciasRepartidor: _retornarLicenciasRepartidor,
      registrarLicencia: _registrarLicencia,
      cambiarEstadoLicencia: _cambiarEstadoLicencia,
      filtrarLicencias: _filtrarLicencias,
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
              let tempEncargadoAduana = new Encargado(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono, obj.telefonoAdicional, obj.sucursal, obj.rolAduana);

              listadeusuarios.push(tempEncargadoAduana);
            break;

            case 3:
              let tempEncargadoSucursal = new Encargado(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono, obj.telefonoAdicional, obj.sucursal, obj.rolAduana);

              listadeusuarios.push(tempEncargadoSucursal);
            break;

            case 4:
                    let repartidoresTemp = new Repartidor(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, obj.fecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion,obj.correo, obj.contrasenna, obj.rol, obj.telefono, obj.telefonoAdicional, obj.estado, obj.razonDesact, obj.sucursal);

                    // obj.paqueteAsignado.forEach(objPaqueteAsignadoTemp => {
                    //     let objPaqueteAsignado = new Paquete(objPaqueteAsignadoTem)
                    //     
                    //     repartidores.setPaquete(objPaqueteAsignado);
                    // });
        
                    obj.licencia.forEach(objLicenciaTemp => { 

                        let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);

                        repartidoresTemp.setLicencia(objLicencia); 
                    });
                
                    listadeusuarios.push(repartidoresTemp);

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

    function _cambiarEstadoUsuario(pcorreo){
        let usuariosLS = _obtenerlistadeusuarios();

        for(let i=0; i<usuariosLS.length; i++){

            if(usuariosLS[i].getCorreo() == pcorreo){
                usuariosLS[i].estado = !usuariosLS[i].getEstado();
            }
            _actualizarUsuario(usuariosLS[i]);
        }
    }
    
    // _____servicio repartidores_______

    function _editarRepartidor(pobjRepartidorActualizar){
        let usuariosLS = _obtenerlistadeusuarios();

        for(let i=0; i<usuariosLS.length; i++){
            if(usuariosLS[i].getCorreo() == pobjRepartidorActualizar.correo){ 
                pobjRepartidorActualizar.licencia = usuariosLS[i].getLicencias(); 
                pobjRepartidorActualizar.paqueteAsignado = usuariosLS[i].getPaqAsignados(); 
            }
        }
        _actualizarUsuario(pobjRepartidorActualizar);
    }

    function _retornarTodasLicencias(){
        let todosLosRepartidores = _obtenerListaFiltrada(4),
            todasLasLicencias = [];

        for(let i=0; i<todosLosRepartidores.length; i++){
            let licenciasActuales = todosLosRepartidores[i].getLicencias();
            for(let j=0; j<licenciasActuales.length; j++){
                if(licenciasActuales[j] != null ){
                    todasLasLicencias.push(licenciasActuales[j]);
                }
            }
        }

        return todasLasLicencias
    }

    function _retornarLicenciasRepartidor(pcorreoActivo){
        let repartidoresLS = _obtenerListaFiltrada(4),
            licenciasRepartidor = [];

        for(let i=0; i<repartidoresLS.length; i++){
            if(repartidoresLS[i].getCorreo() == pcorreoActivo){
                licenciasRepartidor = repartidoresLS[i].getLicencias();
            }
        }
        return licenciasRepartidor
    }

    function _registrarLicencia(pobjLicencia, pcorreoActivo){
        let usuariosLS = _obtenerListaFiltrada(4);

        for(let i=0; i<usuariosLS.length; i++){

            if(usuariosLS[i].getCorreo() == pcorreoActivo){
                usuariosLS[i].setLicencia(pobjLicencia);
                _actualizarUsuario(usuariosLS[i]);
            }
        }
    }

    function _cambiarEstadoLicencia(pcorreoActivo, pcodigoLicencia){
        let licenciasRepartidor = _retornarLicenciasRepartidor(pcorreoActivo);

        for(let x=0; x<licenciasRepartidor.length; x++){
            if(licenciasRepartidor[x].getCodigo() == pcodigoLicencia){
                licenciasRepartidor[x].estado = false;

                _editarLicencias(licenciasRepartidor[x], pcorreoActivo);
            }
        }
    }


    function _filtrarLicencias(pcorreoActivo, pestado){
        let licenciasRepartidor = _retornarLicenciasRepartidor(pcorreoActivo),
            licencias = [];

        for(let x=0; x<licenciasRepartidor.length; x++){
            if(licenciasRepartidor[x].getEstado() == pestado){
                licencias.push(licenciasRepartidor[x]);
            }
        }
        return licencias
    }

/*
Esta funcion actualizara una licencia del repartidor
@pobjModLicencia => la licencia que se va a actualizar
@pcorreoActivo => el usuario activo en el sistema
*/
    function _editarLicencias(pobjModLicencia, pcorreoActivo){
        let repartidoresLS = _obtenerListaFiltrada(4);

        for(let i=0; i<repartidoresLS.length; i++){
            if(repartidoresLS[i].getCorreo() == pcorreoActivo){
                for(let j=0; j<repartidoresLS[i].getLicencias().length; j++){
                    if(repartidoresLS[i].licencia[j].getCodigo() == pobjModLicencia.codigo){
                    repartidoresLS[i].licencia[j] = pobjModLicencia
                    }
                }
                _actualizarUsuario(repartidoresLS[i]);
            }
        }
    }

    function _retornarPaquetesAsignados(pcorreoActivo){
        let repartidoresLS = _obtenerListaFiltrada(4),
            paquetesActuales = [],
            paquetesAsignados = [];

        for(let i=0; i<repartidoresLS.length; i++){

            paquetesActuales = repartidoresLS[i].getPaqAsignados();

            for(let j=0; j<paquetesActuales.length; j++){
                if(repartidoresLS[i].getCorreo() == pcorreoActivo){
                    paquetesAsignados.push(paquetesActuales[j]);
                }
            }
        }
        return paquetesAsignados
    }

    //______funciones internas_________
           
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