class Repartidor{
  constructor(pcedula, pfoto, pnombre, psegundonombre, pprimerapellido, psegundoapellido, pcorreo, ptelefono, ptelefonoadicional, psucursal, pgenero, pnacimiento, pcontrasena, pconfirmarcontrasena){
    this.cedula = pcedula;
    this.foto = pfoto;
    this.nombre = pnombre;
    this.segundoNombre = psegundonombre;
    this.primerApellido = pprimerapellido;
    this.segundoApellido = psegundoapellido
    this.correo = pcorreo;
    this.telefono = ptelefono;
    this.telefonoAdicional = ptelefonoadicional;
    this.sucursal = psucursal;
    this.genero = pgenero;
    this.nacimiento = pnacimiento;
    this.contrasena = pcontrasena;
    this.paqueteAsignado = [];
  }
}