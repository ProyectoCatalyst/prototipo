(()=>{
  'use strict';
  angular 
    .module('prototipo')
    .controller('controladorRegistrarSucursal', controladorRegistrarSucursal);

    controladorRegistrarSucursal.$inject = ['$stateParams','$state','$http','servicioSucursales'];

    function controladorRegistrarSucursal($stateParams,$state,$http,servicioSucursales){
      let vm = this;

      vm.SucursalNueva = {};
      vm.listaSucursales = servicioSucursales.retornarSucursal();

      listarSucursales();
      vm.registrarSucursal = (psucursalNueva) =>{
        console.log(psucursalNueva);
        let objNuevaSucursal = new Sucursal(psucursalNueva.codigoSucursal, psucursalNueva.nombreSucursal);

        console.log('objeto con sucursal');
        console.log(objNuevaSucursal);

        let codigoValidado = servicioSucursales.agregarSucursal(objNuevaSucursal);

        if(codigoValidado == true){
          swal({
            title: "Registro exitoso",
            text: "Sucursal registrado correctametne",
            icon: "Aceptar"
          });
        }else{
          swal({
            title: "Registro fallido",
            text: "La sucursal que intenta registrar ha sido ingresada anteriormente",
            icon: "Aceptar"
          });
        }//fin else

        vm.SucursalNueva = null;
        listarSucursales();
        
      }// fin vm.registrarSucursal

      function listarSucursales(){
        vm.listaSucursales = servicioSucursales.retornarSucursal();
      }// fin listarSucursales

      vm.actualizarSucursal = (psucursal) =>{
        //$state.go('actualizarSucursal',{objSucursal:JSON.stringify(psucursal)});
      }// fin vm.actualizarSucursal

    }// fin de la función controladorRegistrarSucursal
})();