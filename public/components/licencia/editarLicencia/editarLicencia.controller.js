(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorEditarLicencia', controladorEditarLicencia)

  controladorEditarLicencia.$inject = ['$state', '$stateParams', 'servicioUsuarios', 'servicioInicioSesion']
  function controladorEditarLicencia($state, $stateParams, servicioUsuarios, servicioInicioSesion){

    if(!$stateParams.datosLicenciaMod){
      $state.go('main.listarLicencias');
    }

    let vm = this;

    let correoActivo = (servicioInicioSesion.getAuthUser()).correo; 
    let datosLicenciaMod = JSON.parse($stateParams.datosLicenciaMod);

    vm.modLicencia = {};
    vm.modLicencia.tipoLicencia = datosLicenciaMod.tipo;
    vm.modLicencia.codigo = datosLicenciaMod.codigo;
    vm.modLicencia.fechaVencimiento = new Date(datosLicenciaMod.fechaVencimiento);

    vm.editarLicencia = (pdatosNuevos) => {
      let validarFecha = fechaCorrecta(pdatosNuevos.fechaVencimiento);
      if(!validarFecha){
        swal({
          title: 'Fecha inválida',
          text: 'La licencia esta vencida',
          icon: 'error',
          button: 'Aceptar'
        })
      }else{
        pdatosNuevos.estado = true;
        let objModLicencia = new Licencia(pdatosNuevos.codigo, pdatosNuevos.fechaVencimiento, pdatosNuevos.tipoLicencia, pdatosNuevos.estado);
        swal({
          title: 'Licencia actualizada',
          text: 'Informacion actualizada con éxito',
          icon: 'success',
          button: 'Aceptar'
        });
        servicioUsuarios.editarLicencias(objModLicencia, correoActivo);
        $state.go('main.listarLicencias');
      }
    }

    function fechaCorrecta(pfechaVencimiento){
      let fechaAct = new Date,
          vencida = false;

        if(fechaAct >= pfechaVencimiento){
          vencida = true
        }

        return !vencida
    }

  }
})();