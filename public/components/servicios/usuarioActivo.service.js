(() => {
  'use strict';
  angular
  .module('prototipo')
  .service('servicioUsuarioActivo', servicioUsuarioActivo);

  servicioUsuarioActivo.$inject = ['servicioUsuarios', 'servicioAutenticacion'];

  function servicioUsuarioActivo(servicioUsuarios, servicioAutenticacion) {

    let publicAPI = {
      usuarioActivo: _usuarioActivo
    };
    return publicAPI;

    function _usuarioActivo(){
      let listaUsuarios = servicioUsuarios.retornarUsuario();
      let usuarioActivo = servicioAutenticacion.getAuthUser();
      let usuario;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].getCorreo() === usuarioActivo) {
          usuario = listaUsuarios[i];
        }
      }

      return usuario;
    }

  };
})();