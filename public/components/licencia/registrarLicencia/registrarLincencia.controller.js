(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorRegistrarLicencia', controladorRegistrarLicencia)

  controladorRegistrarLicencia.$inject =['$stateParams', '$state', 'servicioUsuarios', 'servicioInicioSesion']
  function controladorRegistrarLicencia($stateParams, $state, servicioUsuarios, servicioInicioSesion){
    
    let vm = this;

    let correoActivo = servicioInicioSesion.getAuthUser().correo;
    
    vm.registrarLicencia = (pnuevoRegistro) => {

      pnuevoRegistro.estado = true;
      
      let objLicencia = new Licencia(pnuevoRegistro.codigo, pnuevoRegistro.fechaVencimiento, pnuevoRegistro.tipoLicencia, pnuevoRegistro.estado, pnuevoRegistro.foto),
          existente = verificarLicencia(objLicencia.codigo),
          fechaValida = verificarFechaVencimiento(objLicencia.fechaVencimiento);

      if(existente){
        swal({
          title: 'La licencia ya esta en el sistema',
          text: 'Intenta con una que no este registrada',
          icon: 'error',
          button: 'Aceptar'
        });
      }else{
        
          if(fechaValida){
          swal({
            title: 'Hemos agregado la licencia',
            text: 'La licencia esta registrada en el sistema',
            icon: 'success',
            button: 'Aceptar'
          });
          servicioUsuarios.registrarLicencia(objLicencia, correoActivo);

          $state.go('main.listarLicencias');
        }else{
          swal({
            title: 'La licencia está vencida',
            text: 'No se puede registrar',
            icon: 'error',
            button: 'Aceptar'
          });
        }

      }
    }

    // __________funciones internas__________

    function verificarLicencia(pcodigo){
      let licenciasLS = servicioUsuarios.retornarTodasLicencias(),
          existente = false;

      for (let i=0; i<licenciasLS.length; i++){
        if(licenciasLS[i].getCodigo() == pcodigo){
          existente = true;
        }
      }

      return existente
      
    }

    function verificarFechaVencimiento(pfecha){
      let hoy = new Date(),
      vencida = false;

      hoy.setHours(0,0,0,0);

      if(hoy>=pfecha){
        vencida = true
      }
      return !vencida
    }
  }
})();