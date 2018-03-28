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

    vm.listarLicenciasDesactivadas = listarLicenciasDesactivadas();

    vm.agregarLicencia = () => {
      $state.go('main.registrarLincencia', { datos: JSON.stringify(correoActivo) });
    }

    vm.modificarLicencia = (licencia) => {
      $state.go('main.editarLicencia', {datosLicenciaMod: JSON.stringify(licencia)});
    }

    // ________funciones internas__________
    function listaLicenciasActivas() {
        let licenciasActivas = [],
            todasLasLicencias = servicioUsuarios.retornarLicenciasRepartidor(correoActivo),
            licenciasVencidas = filtrarLicenciasVencidas(todasLasLicencias);

          for(let i=0; i<licenciasVencidas.length; i++){
            cambiarEstado(licenciasVencidas[i]);
          }

          licenciasActivas = servicioUsuarios.filtrarLicencias(correoActivo);

      return licenciasActivas[0];
    }

    function listarLicenciasDesactivadas() {
      let licenciasDesactivadas = (servicioUsuarios.filtrarLicencias(correoActivo))[1];

      return licenciasDesactivadas;
    }

    function filtrarLicenciasVencidas(ptodasLasLicencias){
      let hoy = new Date(),
      licenciasActivas = ptodasLasLicencias,
      objFecha,
      licenciasVencidas = [];

      hoy.setHours(0,0,0,0);

      for(let i=0; i<licenciasActivas.length; i++){
        objFecha = new Date(licenciasActivas[i].fechaVencimiento);
        if(hoy>=objFecha){
          licenciasVencidas.push(licenciasActivas[i]);
        }
      }

      return licenciasVencidas

    }

    function cambiarEstado(pdatosLicencia){
      servicioUsuarios.cambiarEstadoLicencia(correoActivo, pdatosLicencia.codigo);
    }

  }
})();