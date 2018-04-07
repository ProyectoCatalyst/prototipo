(() => {
  'use strict'

  angular
    .module('prototipo')
    .controller('controladorListarLicencias', controladorListarLicencias);

  controladorListarLicencias.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'servicioInicioSesion'];
  function controladorListarLicencias($stateParams, $state, servicioUsuarios, servicioInicioSesion) {

    let vm = this;

    let correoActivo = (servicioInicioSesion.getAuthUser()).correo; 

    vm.listarLicenciasActivas = listaLicenciasActivas();

    vm.listarLicenciasDesactivadas = servicioUsuarios.filtrarLicencias(correoActivo, false);

    vm.agregarLicencia = () => {
      $state.go('main.registrarLincencia', { datos: JSON.stringify(correoActivo) });
    }

    vm.modificarLicencia = (licencia) => {
      $state.go('main.editarLicencia', {datosLicenciaMod: JSON.stringify(licencia)});
    }

    // ________funciones internas__________
    function listaLicenciasActivas() {
        let licenciasRepartidor = servicioUsuarios.retornarLicenciasRepartidor(correoActivo),
            licenciasVencidas = filtrarLicenciasVencidas(licenciasRepartidor),
            listaActualizarLicencias = [];

          for(let i=0; i<licenciasVencidas.length; i++){
            listaActualizarLicencias.push(licenciasVencidas[i].codigo);
          }

          servicioUsuarios.cambiarEstadoLicencia(correoActivo, listaActualizarLicencias);
          let licenciasActivas = servicioUsuarios.filtrarLicencias(correoActivo, true);

      return licenciasActivas;
    }

    function filtrarLicenciasVencidas(ptodasLasLicencias){
      let hoy = new Date(),
      licenciasVencidas = [];

      hoy.setHours(0,0,0,0);

      for(let i=0; i<ptodasLasLicencias.length; i++){
        if(hoy>=new Date(ptodasLasLicencias[i].fechaVencimiento) ){
          licenciasVencidas.push(ptodasLasLicencias[i]);
        }
      }

      return licenciasVencidas

    }

  }
})();