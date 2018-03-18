(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarConvenio', controladorRegistrarConvenio);

    controladorRegistrarConvenio.$inject = ['$stateParams','$state','$http','servicioConvenio'];

    function controladorRegistrarConvenio($stateParams, $state, $http, servicioConvenio) {
      let vm = this;
      
  

/****************************PRUEBAS ******* */
function meterDatosQuemados(){
  let convenio1 = new convenio1(,,,,);
  servicioConvenio.agregarConvenio();

  let convenio2 = new convenio1(,,,,);
  servicioConvenio.agregarConvenio();

  let convenio3 = new convenio1(,,,,);
  servicioConvenio.agregarConvenio();
}

/********************FIN DE PRUEBAS *****************/
  
   function listarConvenios(){
          vm.listaConvenio = servicioConvenio.retornarConvenios();
  
  let str = "<table>";
    str += "<tr><th>Codigo</th><th>Nombre</th><th>Descripcion</th><th>Institucion</th><th>Costo</th>";
  
  for (var i = 0; i < vm.listaConvenio.length; i++) {
    str += "<tr>";
    str += "<td>"+vm.listaConvenio[i].codigoConvenio + "</td>";
    str += "<td>"+vm.listaConvenio[i].nombreConvenio + "</td>";
    str += "<td>"+vm.listaConvenio[i].descripcionConvenio + "</td>";
    str += "<td>"+vm.listaConvenio[i].institucionConvenio + "</td>";
    str += "<td>"+vm.listaConvenio[i].costoConvenio + "</td>";
    str += "</tr>";
  }
    str += "</table>";
  
  
    document.querySelector('#mostrarConvenios').innerHTML = str;
  }   

    }
})();