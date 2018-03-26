(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorListaEncargadoSucursal', controladorListaEncargadoSucursal)

  controladorListaEncargadoSucursal.$inject = [ '$stateParams','$state', 'servicioUsuarios']
  function controladorListaEncargadoSucursal($state, $stateParams, servicioUsuarios) {
    let vm = this;

    vm.listarEncargadoSucursal = servicioUsuarios.obtenerlistadeusuarios();

     //   vm.listarEncargadoSucursal = () => {
    //    let encargadosSucursal = servicio.retornarEncargadosSucursal(datosCliente), // 
   
    //   return encSucursal // retorna todos los paquetes que se encontraron en estado prealerta

    vm.obtenerlistadeusuarios = servicioUsuarios.obtenerlistadeusuarios();

  }
})();

