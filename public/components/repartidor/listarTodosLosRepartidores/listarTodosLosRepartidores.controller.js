(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorListaTodosRepartidores', controladorListaTodosRepartidores)

  controladorListaTodosRepartidores.$inject = ['$stateParams', '$state', 'servicioRepartidor']

  function controladorListaTodosRepartidores($stateParams, $state, servicioRepartidor){
    let vm = this;

    vm.listarActRepartidores = listarActivos();
    vm.listarDesactRepartidores = listarDesact();
    vm.cambiarEstado = (pcedula) => {
      let desact = false,
          razon = '';
      
      swal({
        dangerMode: 'true',
        title: 'Confirmación',
        text: 'Escribe la razón de la desactivacion',
        content: {
          element: 'input',
          atributtes: {
            type: 'text',
          },
        },
        buttons: {
          confirm: 'Confirmar',
          cancel: 'Cancelar'
        }
      }).then((eliminar) => {

        if(eliminar){
          desact = true;
          razon = eliminar;
        }
        
        if(desact){
          let datos = [pcedula, razon];
          servicioRepartidor.cambiarEstadoRepartidor(datos[0]);
          servicioRepartidor.agregarRazonDesact(datos);
          $state.reload();
        }
      });
    }
    vm.agregarRepartidor = () => {
      $state.go('registrarRapartidor');
    }
    vm.verPerfil = (prepartidores) => {
      let datos = [prepartidores.cedula, prepartidores.sucursal];
      $state.go('perfilRepartidor', {datos: JSON.stringify(datos)});
    }


    //______funciones internas________
    function listarActivos(){
      let todosLosRepartidores = servicioRepartidor.retornarTodosRepartidores();

      return todosLosRepartidores[0]
    }

    function listarDesact(){
      let todosLosRepartidores = servicioRepartidor.retornarTodosRepartidores();

      return todosLosRepartidores[1]
    }

  }
})();