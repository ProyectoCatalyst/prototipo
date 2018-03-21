(() => {
    'use strcit'
    angular
    .module('prototipo')
    .controller('controladorRegistrarRepartidor', controladorRegistrarRepartidor);

    controladorRegistrarRepartidor.$inject = ['$stateParams', '$state', 'servicioRepartidor'];

    function controladorRegistrarRepartidor($stateParams, $state, servicioRepartidor){
        let vm = this;

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

                    console.log(pnuevoRegistro)

                let objNuevoRegistro = new Repartidor(pnuevoRegistro.nombre, pnuevoRegistro.segundoNombre, pnuevoRegistro.primerApellido, pnuevoRegistro.segundoApellido, pnuevoRegistro.cedula, pnuevoRegistro.fechaNacimiento, pnuevoRegistro.genero, pnuevoRegistro.ubicacion, pnuevoRegistro.provincia, pnuevoRegistro.canton, pnuevoRegistro.distrito, pnuevoRegistro.direccion,pnuevoRegistro.correo, pnuevoRegistro.contrasenna, pnuevoRegistro.rol, pnuevoRegistro.telefono, pnuevoRegistro.estado, pnuevoRegistro.razonDesact, pnuevoRegistro.sucursal),
                aDatos = [objNuevoRegistro, objNuevoRegistro.sucursal],
                aDatosVerificar = [objNuevoRegistro.cedula, objNuevoRegistro.sucursal];

                console.log(objNuevoRegistro);

                let exito = verificarRepartidor(aDatosVerificar);

                if(exito){
                    let datosRepartidor = [objNuevoRegistro.cedula, objNuevoRegistro.sucursal, objNuevoRegistro.nombre];
                    servicioRepartidor.agregarRepartidor(aDatos);
                    $state.go('listarTodosLosRepartidores');
                    swal({
                        title: "Éxito",
                        text: "Hemos registrado el repartidor",
                        icon: "success",
                        button: "Aceptar"
                    });
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


        //_______funciones internas________
        function verificarRepartidor(paDatosVerificar){

            let repartidoresLS = servicioRepartidor.retornarRepartidoresSucursal(paDatosVerificar[1]),
            existente = false;

            for(let i=0; i<repartidoresLS.length; i++){

                if(repartidoresLS[i].cedula == paDatosVerificar[0]){
                    existente = true;
                }
            }
            return !existente
        }
    }
})();