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

class Repartidor extends Usuario{
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, ptelefono, ptelefonoAdicional, pestado, prazonDesact, psucursal){
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, ptelefono, ptelefonoAdicional,pestado, prazonDesact, psucursal);

    this.paqueteAsignado = [];
    this.licencia =[];
    this.telefono = ptelefono;
    this.telefonoAdicional = ptelefonoAdicional;
    this.estado = pestado;
    this.razonDesact = prazonDesact;
    this.sucursal = psucursal;
  }

    getLicencias(){
      return this.licencia
    }
  
    getCorreo(){
      return this.correo
    }
  
    setLicencia(pobjLicencia){
      this.licencia.push(pobjLicencia)
    }

    getEstado(){
      return this.estado
    }

    getPaqAsignados(){
      return this.paqueteAsignado;
    }
    
}

class Licencia{
  constructor(pcodigo, pfechaVencimiento, ptipo, pestado){
    this.codigo = pcodigo;
    this.fechaVencimiento = pfechaVencimiento;
    this.tipo = ptipo;
    this.estado = pestado;
  }

  getCodigo(){
    return this.codigo
  }

  getEstado(){
    return this.estado
  }
  
}

class Convenio{

  constructor(pcodigoConvenio,pnombreConvenio,pdescripcionConvenio,pinstitucionConvenio,pcostoConvenio, ){

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
