(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorListaEncargadoSucursal', controladorListaEncargadoSucursal)

  controladorListaEncargadoSucursal.$inject = [ '$stateParams','$state', 'servicioUsuarios']
  function controladorListaEncargadoSucursal($state, $stateParams, servicioUsuarios) {
    let vm = this;

    vm.listarEncargadoSucursal = servicioUsuarios.obtenerlistadeFiltrada(3);


  }
})();


     //   vm.listarEncargadoSucursal = () => {
    //    let encargadosSucursal = servicio.retornarEncargadosSucursal(datosCliente), // 
   
    //   return encSucursal // retorna todos los paquetes que se encontraron en estado prealerta


  //  function retonarListaEncargadosSucursal(){
  //     let listaEncargadosSucursal = [];
  //     for(let i=0;i<vm.listadeusuarios.length;i++){
  //       let usuario = vm.listadeusuarios[i];
  //       if(usuarioTemp.getRol() == 3){
  //           listaEncargadosSucursal.push(usuarioTemp);
  //       }
  //     }
  //     return listaEncargadosSucursal;
  //  }