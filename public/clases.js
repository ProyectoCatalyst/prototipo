class Repartidor{
  constructor(pcedula, pfoto, pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcorreo, ptelefono, ptelefonoAdicional, psucursal, pgenero, pnacimiento, pcontrasena){
    this.cedula = pcedula;
    this.foto = pfoto;
    this.nombre = pnombre;
    this.segundoNombre = psegundoNombre;
    this.primerApellido = pprimerApellido;
    this.segundoApellido = psegundoApellido
    this.correo = pcorreo;
    this.telefono = ptelefono;
    this.telefonoAdicional = ptelefonoAdicional;
    this.sucursal = psucursal;
    this.genero = pgenero;
    this.nacimiento = pnacimiento;
    this.contrasena = pcontrasena;
    this.paqueteAsignado = [];
    this.licencia =[];
  }
  getLicencias(){
    return this.licencia
  }
  getCedula(){
    return this.cedula
  }
  setLicencia(pobjLicencia){
    this.licencia.push(pobjLicencia)
  }
}

class Licencia{
  constructor(pcodigo, pfechaVencimiento, ptipo){
    this.codigo = pcodigo;
    this.fechaVencimiento = pfechaVencimiento;
    this.tipo = ptipo;
  }
  getCodigo(){
    return this.codigo
  }
}