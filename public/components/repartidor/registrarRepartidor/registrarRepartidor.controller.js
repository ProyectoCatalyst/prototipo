(() => {
    'use strcit'
    angular
    .module('prototipo')
    .controller('controladorRegistrarRepartidor', controladorRegistrarRepartidor);

    controladorRegistrarRepartidor.$inject = ['$stateParams', '$state', 'servicioRegistroRepartidor'];
    function controladorRegistrarRepartidor($stateParams, $state, servicioRegistroRepartidor){
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
                let objNuevoRegistro = new Repartidor(pnuevoRegistro.cedula, pnuevoRegistro.foto, pnuevoRegistro.nombre, pnuevoRegistro.segundoNombre, pnuevoRegistro.primerApellido, pnuevoRegistro.segundoApellido, pnuevoRegistro.correo, pnuevoRegistro.telefono, pnuevoRegistro.telefonoAdicional, pnuevoRegistro.sucursal, pnuevoRegistro.genero, pnuevoRegistro.fechaNacimiento, pnuevoRegistro.contrasenna),
                aDatos = [objNuevoRegistro, objNuevoRegistro.sucursal],
                aDatosVerificar = [objNuevoRegistro.cedula, objNuevoRegistro.sucursal];

                let exito = verificarRepartidor(aDatosVerificar);

                if(exito){
                    let datosRepartidor = [objNuevoRegistro.cedula, objNuevoRegistro.sucursal, objNuevoRegistro.nombre];
                    servicioRegistroRepartidor.agregarRepartidor(aDatos);
                    $state.go('registrarLincencia', {datos: JSON.stringify(datosRepartidor)});
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
            let repartidoresLS = servicioRegistroRepartidor.retornarRepartidores(paDatosVerificar[1]),
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