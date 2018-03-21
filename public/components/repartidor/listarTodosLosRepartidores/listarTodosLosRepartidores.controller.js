(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorListaTodosRepartidores', controladorListaTodosRepartidores)

  controladorListaTodosRepartidores.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorListaTodosRepartidores($stateParams, $state, servicioUsuarios){
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
          servicioUsuarios.cambiarEstadoRepartidor(datos[0]);
          servicioUsuarios.agregarRazonDesact(datos);
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
      let todosLosRepartidores = servicioUsuarios.retornarTodosRepartidores(),
            listarRepartidoresFiltrados = servicioUsuarios.filtrarRepartidores(todosLosRepartidores);

      return listarRepartidoresFiltrados[0]
    }

    function listarDesact(){
      let todosLosRepartidores = servicioUsuarios.retornarTodosRepartidores(),
            listarRepartidoresFiltrados = servicioUsuarios.filtrarRepartidores(todosLosRepartidores);

      return listarRepartidoresFiltrados[1]
    }

  }
})();