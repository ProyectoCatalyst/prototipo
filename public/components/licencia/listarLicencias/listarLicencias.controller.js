(() => {
  'use strict'

  angular
    .module('prototipo')
    .controller('controladorListarLicencias', controladorListarLicencias);

  controladorListarLicencias.$inject = ['$stateParams', '$state', 'servicioUsuarios'];
  function controladorListarLicencias($stateParams, $state, servicioUsuarios) {

    if (!$stateParams.datos) {
      $state.go('main.perfilRepartidor');
    }

    let vm = this;

    let datosRepartidor = JSON.parse($stateParams.datos); // correo, sucursal, nombre
      // let datosRepartidor = [402350610, 'sucursal', 'Isaac']
    vm.listarLicenciasActivas = listaLicenciasActivas();
    vm.listarLicenciasDesactivadas = listarLicenciasDesactivadas();

    vm.agregarLicencia = () => {
      $state.go('main.registrarLincencia', { datos: JSON.stringify(datosRepartidor) });
    }

    vm.modificarLicencia = (licencias) => {
      let datos = [datosRepartidor, licencias];
      $state.go('main.editarLicencia', {datos: JSON.stringify(datos)});
    }

    // ________funciones internas__________
    function listaLicenciasActivas() {
      let datos = [datosRepartidor[0], datosRepartidor[1]], // correo, sucursal
          licenciasActivas;
        
      let todasLasLicencias = servicioUsuarios.retornarLicencias(datos),
          licenciasVencidas = filtrarLicenciasVencidas(todasLasLicencias); // funcion que me retorna las licencias cuyo fecha de vencimiento es menor a la fecha actual

          for(let i=0; i<licenciasVencidas.length; i++){
            cambiarEstado(licenciasVencidas[i]); // recorro el objeto cuyas licencias estan vencidas y cambio su estado, esta funcion a su vez va a actualizar el LS
          }

          licenciasActivas = servicioUsuarios.retornarLicencias(datos); // llamar funcion que toma los datos del LS con el estado actualizado y en la linea 36 y obtiene un array con licencias activas en posicion 0 y licencias vencidas en la posicion 1

      return licenciasActivas[0]; // retorno licencias activas para llenar la tabla
    }

    function listarLicenciasDesactivadas() {
      let datos = [datosRepartidor[0], datosRepartidor[1]],
          licenciasDesactivadas = servicioUsuarios.retornarLicencias(datos);

      return licenciasDesactivadas[1];
    }

    function filtrarLicenciasVencidas(ptodasLasLicencias){
      let hoy = new Date(),
      licenciasActivas = ptodasLasLicencias[0],
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
      let datos = [datosRepartidor[0], datosRepartidor[1], pdatosLicencia.codigo];

      servicioUsuarios.cambiarEstadoLicencia(datos);
    }

  }
})();