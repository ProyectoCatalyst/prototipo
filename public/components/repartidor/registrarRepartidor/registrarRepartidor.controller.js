(() => {
    'use strcit'
    angular
    .module('prototipo')
    .controller('controladorRegistrarRepartidor', controladorRegistrarRepartidor);

    controladorRegistrarRepartidor.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

    function controladorRegistrarRepartidor($stateParams, $state, servicioUsuarios){
        let vm = this;
    
        // vm.retornarDatosSucursales = servicioSucursales.retornarNombreSucursalesLS(); // requiere el servicio de sucursales para obtener la informacion de las sucursales en el sistema
        vm.registrarRepartidor = (pnuevoRegistro) => {

            if(!(pnuevoRegistro.contrasenna == pnuevoRegistro.confirmarContrasenna)){
                swal({
                    title: "Las contrasenas...",
                    text: "No coinciden en la confirmacion",
                    icon: "error",
                    button: "Aceptar"
                });
            }else{

                pnuevoRegistro.estado = true;
                pnuevoRegistro.razonDesact = '';
                pnuevoRegistro.rol = 4;

                let objNuevoRegistro = new Repartidor(pnuevoRegistro.nombre, pnuevoRegistro.segundoNombre, pnuevoRegistro.primerApellido, pnuevoRegistro.segundoApellido, pnuevoRegistro.cedula, pnuevoRegistro.fechaNacimiento, pnuevoRegistro.genero, pnuevoRegistro.ubicacion, pnuevoRegistro.provincia, pnuevoRegistro.canton, pnuevoRegistro.distrito, pnuevoRegistro.direccion,pnuevoRegistro.correo, pnuevoRegistro.contrasenna, pnuevoRegistro.rol, pnuevoRegistro.telefono, pnuevoRegistro.telefonoAdicional, pnuevoRegistro.estado, pnuevoRegistro.razonDesact, pnuevoRegistro.sucursal),
                aDatos = [objNuevoRegistro, objNuevoRegistro.sucursal],
                aDatosVerificar = [objNuevoRegistro.correo, objNuevoRegistro.sucursal];

                let exito = verificarUsuario(aDatosVerificar[0]),
                    edadCorrecta = verifiarEdad(objNuevoRegistro.fecha);

                if(exito){
                    if(edadCorrecta){
                        let datosRepartidor = [objNuevoRegistro.cedula, objNuevoRegistro.sucursal, objNuevoRegistro.nombre];
                        servicioUsuarios.agregarRepartidor(aDatos);
                        $state.go('main.listarTodosLosRepartidores');
                        swal({
                            title: "Éxito",
                            text: "Hemos registrado el repartidor",
                            icon: "success",
                            button: "Aceptar"
                        });
                    }else{
                        swal({
                            title: "Verifique su edad",
                            text: "No puede ser menor de edad",
                            icon: "error",
                            button: "Aceptar"
                        });    
                    }
                }else{
                    swal({
                        title: "Ya existe",
                        text: "El repartidor ya existe en el sistema",
                        icon: "error",
                        button: "Aceptar"
                    });
                }
            }
        }

        vm.listarRepartidores = () => {
            $state.go('main.listarTodosLosRepartidores');
        }
        //_______funciones internas________
        function verificarUsuario(pcorreo){

            let correosSistema = servicioUsuarios.retornarCorreosUsuarios(),
            existente = false;

            for(let i=0; i<correosSistema.length; i++){

                if(correosSistema[i] == pcorreo){
                    existente = true;
                }
            }
            return !existente
        }

        function verifiarEdad(pfechaNacimiento){
            let hoy = new Date,
                nacimiento = new Date(pfechaNacimiento),
                edad = (hoy-nacimiento) / 31536000000, // numero de un anio en milisegundos
                menor = false;
              
                if(edad < 18){
                    menor = true
                }

                return !menor
        }
    }
})();