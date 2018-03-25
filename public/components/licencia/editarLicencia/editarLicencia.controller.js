(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorEditarLicencia', controladorEditarLicencia)

  controladorEditarLicencia.$inject = ['$state', '$stateParams', 'servicioUsuarios']
  function controladorEditarLicencia($state, $stateParams, servicioUsuarios){

    if(!$stateParams.datos){
      $state.go('main.perfilRepartidor');
    }

    let vm = this;

    let datos = JSON.parse($stateParams.datos); // infoRepartidor (correo, sucursal y nombre), infoLicencia

    vm.modLicencia = {};
    vm.modLicencia.tipoLicencia = datos[1].tipo;
    vm.modLicencia.codigo = datos[1].codigo;
    vm.modLicencia.fechaVencimiento = new Date(datos[1].fechaVencimiento);

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
        let objDatosNuevos = new Licencia(pdatosNuevos.codigo, pdatosNuevos.fechaVencimiento, pdatosNuevos.tipoLicencia, pdatosNuevos.estado);
        swal({
          title: 'Licencia actualizada',
          text: 'Informacion actualizada con éxito',
          icon: 'success',
          button: 'Aceptar'
        });
        datos = [datos[0], objDatosNuevos]; // infoRepartidor (correo, sucursal y nombre), nuevaLicencia
        servicioUsuarios.editarLicencias(datos);
        $state.go('main.perfilRepartidor');
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