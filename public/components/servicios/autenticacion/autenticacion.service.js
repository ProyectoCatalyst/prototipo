(() => {
  'use strcit';
  angular
  .module('prototipo')
  .service('servicioAutenticacion', servicioAutenticacion);

  servicioAutenticacion.$inject = ['$q','$http','servicioUsuarios','servicioSesion'];

  function servicioAutenticacion($q, $http, servicioUsuarios, servicioSesion){
    let publicAPI = {
      logIn: _logIn,
      logOut: _logOut,
      isAuth: _isAuth,
      getAuthUser: _getAuthUser
    };
    return publicAPI;

    function _logIn(credenciales) {
      
      let todosLosUsuarios = servicioUsuarios.obtenerlistadeusuarios();
      let incioExitoso = false;

      for(let i = 0; i<todosLosUsuarios.length; i++){
        if(todosLosUsuarios[i].getCorreo() == credenciales.correo && todosLosUsuarios[i].getContrasenna() == credenciales.contrasenna){
          let data = {
            rol: todosLosUsuarios[i].getRol(),
            correo: todosLosUsuarios[i].getCorreo()
          }
          servicioSesion.create(data);
          incioExitoso = true;
        }
      }

      return incioExitoso;
    }

    function _logOut(){
      servicioSesion.destroy();
    }

    function _isAuth(){
      return !!servicioSesion.session;
    }
    
    function _getAuthUser() {
      if (servicioSesion.session) {
        return servicioSesion.session;
      }else{
        return undefined;
      }
    }
  }
})();