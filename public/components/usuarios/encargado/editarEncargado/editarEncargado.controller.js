(()=>{
  'use strict';
  angular
  .module('prototipo')
  .controller('controladorEditarEncargado', controladorEditarEncargado);
      
  controladorEditarEncargado.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'servicioSucursales'];
    
      function controladorEditarEncargado ($http, $stateParams, $state, servicioUsuarios, servicioSucursales){
        let vm = this;

        if(!$stateParams.datosMod) {
          $state.go ('main.listarTodosUsuarios');
        }

        let encargadoMod = JSON.parse($stateParams.datosMod);
 
        vm.obtenerInfoSucursal = servicioSucursales.retornarNombreSucursalesLS();

        vm.rolEncargado = String(encargadoMod.rol);

        vm.encargadoMod = {
          nombre : encargadoMod.primerNombre,
          segundoNombre : encargadoMod.segundoNombre,
          apellido : encargadoMod.primerApellido,
          segundoApellido : encargadoMod.segundoApellido,
          cedula : encargadoMod.cedula,
          fecha : new Date(encargadoMod.fecha),
          genero : encargadoMod.genero,
          correo: encargadoMod.correo,
          telefono: encargadoMod.telefono,
          telefonoAdicional: encargadoMod.telefonoAdicional,
          sucursal: encargadoMod.sucursal,
          rolAduana: encargadoMod.rolAduana

      }



        vm.provincias = $http({
          method: 'GET',
          url: './sources/data/provincias.json'
        }).then((success) => {
          vm.provincias = success.data
        }, function (error) {
        });
  
        vm.rellenarCantones = (pidprovincia) => {
          vm.cantones = $http({
            method: 'GET',
            url: './sources/data/cantones.json'
          }).then((success) => {
            let cantones = [];
            for (let i = 0; i < success.data.length; i++) {
              if(success.data[i].idProvincia == pidprovincia){
                cantones.push(success.data[i]);
              }
            }
            vm.cantones = cantones
          }, function (error) {
          });
        };
  
        
        vm.rellenarDistritos = (pidcanton) => {
          vm.distritos = $http({
            method: 'GET',
            url: './sources/data/distritos.json'
          }).then((success) => {
            let distritos = [];
            for (let i = 0; i < success.data.length; i++) {
              if(success.data[i].idCanton == pidcanton){
                distritos.push(success.data[i]);
              }
            }
            vm.distritos = distritos
          }, function (error) {
          });
        };
        
         vm.editarEncargado = (pencargadoMod)=>{

            pencargadoMod.estado = encargadoMod.estado;
            pencargadoMod.rol = encargadoMod.rol;
      
          let objEncargadoTem = new Encargado(pencargadoMod.nombre, pencargadoMod.segundoNombre, pencargadoMod.apellido, pencargadoMod.segundoApellido, pencargadoMod.cedula, pencargadoMod.fecha, pencargadoMod.genero, pencargadoMod.ubicacion, pencargadoMod.provincia, pencargadoMod.canton, pencargadoMod.distrito, pencargadoMod.direccion, pencargadoMod.correo, pencargadoMod.contrasenna, pencargadoMod.rol, pencargadoMod.estado, pencargadoMod.telefono, pencargadoMod.telefonoAdicional, pencargadoMod.sucursal, pencargadoMod.rolAduana);
          
          let edadCorrecta = verificarEdad(pencargadoMod.fecha),
          contrasenasCorrectas = validarContrasenias(pencargadoMod.contrasenna, pencargadoMod.confirmarContrasenna);

          if(!edadCorrecta){
            swal({
              title: "Cambio no exitoso",
              text: "Por favor revise su edad.",
              icon: "error",
              button: "Aceptar"
              }); 
          }else{
            if(!contrasenasCorrectas){
              swal({
                title: "Cambio no exitoso",
                text: "Revise sus contrasenas.",
                icon: "error",
                button: "Aceptar"
                }); 
            }else{
              let registro = servicioUsuarios.actualizarUsuario(objEncargadoTem);
      
              if (registro == true) {
                swal({
                title: "Cambio exitoso",
                text: "Cambio realizado correctamente.",
                icon: "success",
                button: "Aceptar"
                }); 
                vm.encargadoMod = null;
              }
            }
          }
        }

         function verificarEdad(pnacimiento){
          let menor = false,
              edadMs = new Date() - pnacimiento;
    
          if(edadMs/31536000000<18){
            menor = true
          }
          return !menor
        }
    
        function validarContrasenias(pcontrasena, pconfirmarContrasena){
          let diferentes = false;
    
          if(pcontrasena != pconfirmarContrasena){
            diferentes = true
          }
    
          return !diferentes
        }
    
        }
  })();
  
