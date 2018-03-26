class Paquete{
  constructor(ptrackingPaquete, ptipoPaquete,ppesoPaquete, pprecioPaquete,pestadoPaquete){
    this.trackingPaquete = ptrackingPaquete;
    this.tipoPaquete = ptipoPaquete;
    this.pesoPaquete = ppesoPaquete;
    this.precioPaquete = pprecioPaquete;
    this.estadoPaquete = pestadoPaquete;
    
  }//fin contructor

  capturarTrackingPaquete(){
    return this.trackingPaquete;
  }
  capturarTipoPaquete(){
    return this.tipoPaquete;
  }
  capturarEstadoPaquete(){
    return this.estadoPaquete;
  }
  capturarCostoTotalPaquete(){
    return this.costoTotalPaquete;
  }
}//fin class paquete

class Sucursal{
  constructor(pcodigoSucursal, pnombreSucursal, pprovincia, pcanton, pdistrito, pestadoSucursal){
    this.codigoSucursal = pcodigoSucursal;
    this.nombreSucursal = pnombreSucursal;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    //this.encargadoSucursal = pencargadoSucursal;
    //this.repartidoresSucursal = [];
    this.estadoSucursal = pestadoSucursal;

  }//fin constructor clase sucursal



  capturarNombreSucursal(){
    return this.nombreSucursal;
  }
  capturarCodigoSucursal(){
    return this.codigoSucursal;
  }

  retornarRepartidoresSucursal(){
    return this.repartidoresSucursal;
  }

  retornarEstadoSucursal(){
    return this.estadoSucursal;
  }
}//fin clase sucursal

class Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado){
    this.primerNombre = pnombre;
    this.segundoNombre = psegundoNombre;
    this.primerApellido = pprimerApellido;
    this.segundoApellido = psegundoApellido;
    this.cedula = pcedula;
    this.fecha = pfecha;
    this.genero = pgenero;
    this.ubicacion = pubicacion;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    this.direccion = pdireccion;
    this.correo = pcorreo;
    this.contrasenna = pcontrasenna;
    this.rol = prol;
    this.estado = pestado;
  }

  getCedula(){
     return this.cedula;
  }
  
  getCorreo(){
    return this.correo;
  }

  getRol(){
    return this.rol;
  }

  getEstado(){
    return this.estado;
  }

  setEstado(pestado){
    this.estado = pestado;
  }
  
  getContrasenna(){
    return this.contrasenna;
  }
  
}

class EncargadoAduanas extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado)
  }
}

class EncargadoSucursales extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado)
  }
}

class Cliente extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado, ptelefono) {

    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, pestado);
    
    this.telefono = ptelefono;
    this.tarjeta = [];
 }

  agregarTarjetas(pnuevaTarjeta){
    this.tarjeta.push(pnuevaTarjeta);
  }
}

class Convenio{

  constructor(pcodigoConvenio,pnombreConvenio,pdescripcionConvenio,pinstitucionConvenio,pcostoConvenio){

    this.codigoConvenio = pcodigoConvenio;
    this.nombreConvenio = pnombreConvenio;
    this.descripcionConvenio = pdescripcionConvenio;
    this.institucionConvenio = pinstitucionConvenio;
    this.costoConvenio = pcostoConvenio;
    
  }
  
  getCodigo() {
    return this.codigoConvenio;
  }
  getNombre() {
    return this.nombreConvenio;
  }
  getCosto() {
    return this.costoConvenio;
  }
  
}

class Tarjeta{

   constructor(ptipoTarjeta, pnombreTarjeta, pnumeroTarjeta, pcvvTarjeta, pfechaTarjeta){

     this.tipoTarjeta = ptipoTarjeta;
     this.nombreTarjeta = pnombreTarjeta;
     this.numeroTarjeta = pnumeroTarjeta;
     this.cvvTarjeta = pcvvTarjeta;
     this.fechaTarjeta = pfechaTarjeta;
  }
  getNumeroTarjeta(){
    return this.numeroTarjeta;
    }
}
