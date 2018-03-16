(()=>{
'use strict';
angular
.module('prototipo')
.controller('controladorRegistroEncargadoAduana', controladorRegistroEncargadoAduana);
    
controladorRegistroEncargadoAduana.$inject = ['$stateParams', '$state', 'servicioEncargadoAduana'];
  
    function controladorRegistroEncargadoAduana ($stateParams, $state, servicioEncargadoAduana ){
      let vm = this;
  
      if(!$stateParams.objEncargadoAduana){
        $state.go('landing'); //Poner después//
      }
  
      let objsinFormatoEncargadoAduana = JSON.parse($stateParams.objEncargadoAduana);
      
      vm.nuevoEncargadoAduana = {};
      console.log(objsinFormatoEncargadoAduana);
  
      vm.registrarEncargadoAduana = (pnuevoEncargadoAduana)=>{
  
        let objEncargadoAduanaTem = new EncargadoAduana (pnuevoEncargadoAduana.nombre, pnuevoEncargadoAduana.segundoNombre, pnuevoEncargadoAduana.apellido, pnuevoEncargadoAduana.segundoApellido, pnuevoEncargadoAduana.cedula, pnuevoEncargadoAduana.fecha, pnuevoEncargadoAduana.genero, pnuevoEncargadoAduana.foto, pnuevoEncargadoAduana.ubicacion, pnuevoEncargadoAduana.provincia, pnuevoEncargadoAduana.canton, pnuevoEncargadoAduana.disfrito, pnuevoEncargadoAduana.correo, pnuevoEncargadoAduana.contrasenna);
   
        console.log(EncargadoAduanas); 
      
        let registro = servicioEncargadoAduanas.agregarEncargado(correo);
  
        if (registro == true) {
          swal({
            title: "Registro exitoso",
            text: "Entierro registrado correctamente.",
            icon: "success"
          });
        }
      }
  
      }
})();