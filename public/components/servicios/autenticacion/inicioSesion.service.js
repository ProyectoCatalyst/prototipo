(() => {
  'use strict';
  angular
  .module('prototipo')
  .service('servicioInicioSesion', servicioInicioSesion);

  servicioInicioSesion.$inject = ['$log', '$http', 'servicioUsuarios', 'localStorageFactory'];

  function servicioInicioSesion($log, $http, servicioUsuarios, localStorageFactory){

    const loginAPI = {
      logIn : _logIn,
      logOut : _logOut,
      getAuthUser: _getAuthUser
    };
    return loginAPI;

    function _logIn(credentials) {
      
      let listaUsuarios = servicioUsuarios.obtenerlistadeusuarios();
      let incioExitoso = false;

      for(let i = 0; i<listaUsuarios.length; i++){
        if(listaUsuarios[i].getCorreo() == credentials.correo && listaUsuarios[i].getContrasenna() == credentials.contrasenna){
          localStorageFactory.setSession(listaUsuarios[i].getCorreo());
          incioExitoso = true;
        }
      }
      return incioExitoso;
    };

    function _logOut(){
      let cierreExitoso = localStorageFactory.closeSession();

      return cierreExitoso;
    };

    function _getAuthUser() {
      let sessionActiva = localStorageFactory.getSession(),
          usuarioActivo;

      if(!sessionActiva){
        usuarioActivo = undefined;
      }else{
        usuarioActivo = obtenerDatosUsuarioActivo(sessionActiva);
      }

      return usuarioActivo;
    };


    function obtenerDatosUsuarioActivo(pcorreo){
      let listaUsuarios = servicioUsuarios.obtenerlistadeusuarios(),
          datosUsuario;

      for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].getCorreo() == pcorreo){
          datosUsuario = listaUsuarios[i];
        }
      };

      return datosUsuario;
    }
  }
})();