(()=>{
  'use strict';
  angular
  .module('prototipo')
  .controller('controladorRegistroEncargadoSucursal', controladorRegistroEncargadoSucursal);
      
  controladorRegistroEncargadoSucursal.$inject = ['$stateParams', '$state'];
    
      function controladorRegistroEncargadoSucursal ($stateParams, $state, servicioUsuarios){
        let vm = this;
        
        vm.nuevoEncargadoSucursal = {};
        
        vm.registrarEncargadoSucursal = (pnuevoEncargadoSucursal)=>{
    
          let objEncargadoSucursalTem = new EncargadoSucursal (pnuevoEncargadoSucursal.nombre, pnuevoEncargadoSucursal.segundoNombre, pnuevoEncargadoSucursal.apellido, pnuevoEncargadoSucursal.segundoApellido, pnuevoEncargadoSucursal.cedula, pnuevoEncargadoSucursal.fecha, pnuevoEncargadoSucursal.genero, pnuevoEncargadoSucursal.foto, pnuevoEncargadoSucursal.ubicacion, pnuevoEncargadoSucursal.provincia, pnuevoEncargadoSucursal.canton, pnuevoEncargadoSucursal.disfrito, pnuevoEncargadoSucursal.correo, pnuevoEncargadoSucursal.contrasenna);
     
          console.log(EncargadoSucursal); 
        
          let registro = servicioEncargadoSucursal.agregarEncargado(correo);
    
          if (registro == true) {
            swal({
              title: "Registro exitoso",
              text: "Registrado correctamente.",
              icon: "success"
            });
          }
        }
    
        }
  })();