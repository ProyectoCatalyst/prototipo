(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorListaTodosRepartidores', controladorListaTodosRepartidores)

  controladorListaTodosRepartidores.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'servicioSucursales']

  function controladorListaTodosRepartidores($stateParams, $state, servicioUsuarios, servicioSucursales){
    let vm = this;

    vm.nombreSucursal = (pcodigoSucursal) => {
      let informacionSucursal = servicioSucursales.retornarNombreSucursalesLS();

      for(let i=0; i<informacionSucursal.length; i++){
        if(informacionSucursal.codigoSucursal == pcodigoSucursal){
          return informacionSucursal.nombreSucursal;
        }
      }
    }

    vm.listarRepartidoresActDisponibles = listarActivosDisponibles();

    vm.listarRepartidoresOcupados = listarActivosOcupados();

    vm.listarDesactRepartidores = listarDesact();

    vm.cambiarEstado = (pcorreo) => {
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
          servicioUsuarios.desactivarRepartidor(pcorreo, razon);
          $state.reload();
        }
      });
    }

    vm.agregarRepartidor = () => {
      $state.go('main.registrarRapartidor');
    }

    vm.verPerfil = () => {
      $state.go('main.perfilRepartidor');
    }

    //______funciones internas________

    function listarActivosDisponibles(){
      let repartidoresActivos = listarActivos(),
          repartidoresDisponibles = [];

      for(let i=0; i<repartidoresActivos.length; i++){
        if( (repartidoresActivos[i].getPaqAsignados()).length == 0 ){
          repartidoresDisponibles.push(repartidoresActivos[i]);
        }
      }
      return repartidoresDisponibles
    }

    function listarActivosOcupados(){
      let repartidoresActivos = listarActivos(),
          repartidoresDisponibles = [];

      for(let i=0; i<repartidoresActivos.length; i++){
        if( !(repartidoresActivos[i].getPaqAsignados()).length == 0 ){
          repartidoresDisponibles.push(repartidoresActivos[i]);
        }
      }
      return repartidoresDisponibles
    }

    function listarActivos(){
      let todosLosRepartidores = servicioUsuarios.obtenerlistadeFiltrada(4),
            listarRepartidoresFiltrados = servicioUsuarios.filtrarRepartidores(todosLosRepartidores);

      return listarRepartidoresFiltrados[0]
    }

    function listarDesact(){
      let todosLosRepartidores = servicioUsuarios.obtenerlistadeFiltrada(4),
            listarRepartidoresFiltrados = servicioUsuarios.filtrarRepartidores(todosLosRepartidores);

      return listarRepartidoresFiltrados[1]
    }

  }
})();