(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorEditarRepartidor', controladorEditarRepartidor)

  controladorEditarRepartidor.$inject = ['$state', '$stateParams', 'servicioUsuarios']

  function controladorEditarRepartidor($state, $stateParams, servicioUsuarios){
   
    let vm = this;

    if(!$stateParams.datos){
      $state.go('main.perfilRepartidor')
    }
    let datosRepartidor = JSON.parse($stateParams.datos); // cotrreo sucursal

    // vm.retornarDatosSucursales = servicioSucursales.retornarNombreSucursalesLS(); // requiere el servicio de sucursales para obtener la informacion de las sucursales en el sistema

    vm.datosMod = {};
    vm.datosMod.nombre = datosRepartidor.primerNombre;
    vm.datosMod.primerApellido = datosRepartidor.primerApellido;
    vm.datosMod.cedula = datosRepartidor.cedula;
    vm.datosMod.correo = datosRepartidor.correo;
    vm.datosMod.fechaNacimiento = new Date(datosRepartidor.fecha);
    vm.datosMod.sucursal = datosRepartidor.sucursal;
    vm.datosMod.segundoNombre = datosRepartidor.segundoNombre;
    vm.datosMod.segundoApellido = datosRepartidor.segundoApellido;
    vm.datosMod.telefono = datosRepartidor.telefono;
    vm.datosMod.telefonoAdicional = datosRepartidor.telefonoAdicional;
    vm.datosMod.genero = datosRepartidor.genero;
    vm.datosMod.foto = datosRepartidor.foto;

    vm.editarPerfil = (pdatosMod) => {
      pdatosMod.rol = 4;
      pdatosMod.estado = true,
      pdatosMod.razonDesact = '';
      
      let edadCorrecta = verificarEdad(pdatosMod.fechaNacimiento);

      if(pdatosMod.contrasenna != pdatosMod.confirmarContrasenna){
        swal({
          title: 'Las contrasenas no coinciden',
          text: 'Verifique sus datos',
          icon: 'error',
          button: 'Aceptar'
        });
      }else{
        if(!edadCorrecta){
          swal({
            title: 'La edad es incorrecta',
            text: 'Debe ser mayor de edad',
            icon: 'error',
            button: 'Aceptar'
          });
        }else{
          let objEditarInfo = new Repartidor(pdatosMod.nombre, pdatosMod.segundoNombre, pdatosMod.primerApellido, pdatosMod.segundoApellido, pdatosMod.cedula, pdatosMod.fechaNacimiento, pdatosMod.genero, pdatosMod.ubicacion, pdatosMod.provincia, pdatosMod.canton, pdatosMod.distrito, pdatosMod.direccion,pdatosMod.correo, pdatosMod.contrasenna, pdatosMod.rol, pdatosMod.telefono, pdatosMod.telefonoAdicional, pdatosMod.estado, pdatosMod.razonDesact, pdatosMod.sucursal),
                  aDatos = [objEditarInfo, objEditarInfo.sucursal];

          servicioUsuarios.editarRepartidor(objEditarInfo);

          swal({
            title: 'Listo',
            text: 'Informacion editada',
            icon: 'success',
            button: 'Aceptar'
          });
          $state.go('main.perfilRepartidor');
        }
      }
    }

    function verificarEdad(pfechaNacimiento){
      let hoy = new Date,
          edad = (hoy-pfechaNacimiento) / 31536000000, // numero de un anio en milisegundos
          menor = false;
        
          if(edad < 18){
              menor = true
          }

          return !menor
    }
  }
})();