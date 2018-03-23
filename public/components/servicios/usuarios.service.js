(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http', 'localStorageFactory'];

  function servicioUsuarios($q, $log, $http, localStorageFactory) {

    const listaUsuarios = 'usuariosLS';

    let publicAPI = {
      agregarUsuario: _agregarUsuario,
      obtenerlistadeusuarios: _obtenerlistadeusuarios,
      obtenerlistadeFiltrada: _obtenerListaFiltrada,
      desactivarCuenta: _desactivarCuenta
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
              let tempEncargadoAduana = new EncargadoAduanas(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estadoDesactivado);

              listadeusuarios.push(tempEncargadoAduana);
            break;

            case 3:
              let tempEncargadoSucursal = new EncargadoSucursal(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estadoDesactivado);

              listadeusuarios.push(tempEncargadoSucursal);
            break;

            case 5:
              let tempCliente = new Cliente(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estadoDesactivado, obj.telefono);

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

    function _desactivarCuenta(pcorreo) {
      let listadeusuarios = _obtenerlistadeusuarios(),
          desactivar = false;

      for(let i = 0; i < listadeusuarios.length; i++){
        if(listadeusuarios[i].getCorreo() == pcorreo){
          listadeusuarios[i].setEstado(true);
          desactivar = true;
        }
      }
      return desactivar;
    }
  }
})();