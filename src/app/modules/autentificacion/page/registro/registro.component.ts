import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//importamos servicio de autentificacion 
import { AuthService } from '../../services/auth.service';
// importamos componente de rutas de angular 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  //input de la contraseña para ver los caracteres o no 
  hide = true;
  // ################################################################################# Importaciones de interfaz ''
  //importar la interfaz de usuario -> inicializar
  usuario: Usuario = {
    uid: '',//-> inicializamos con comillas simples porque es string,si fuera nambuer se inicializa con 0
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }
  //##################################################################################### fin de la importacion

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ) { }

  //creamos coleccion de usuarios,tipo 'usuario'para arrays
  coleccionUsuario: Usuario[] = [];

  //funcion para el registro de nuevos usuarios
  async registrar() {
    //constante credencial va a reguardar la informacion que ingrese el usuario 
    /*
    const credenciales = {
      password: this.usuario.password,
      email: this.usuario.email,
      uid: this.usuario.uid,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      rol: this.usuario.rol,

    }
      */
     //Registro con servicio de AUTH  
    const credenciales={
      email:this.usuario.email,
      password:this.usuario.password
    }
    const res = await this.servicioAuth.registrar(credenciales.email,credenciales.password)
    // el metodo then es una promesa que devuele el mismo valor si tdo sale bien 
    .then(res=>{
      alert("Se pudo registrar con exito :)")
      //el meotodo navigate nos redirecciona al inicio
      this.servicioRutas.navigate(['/inicio'])
    })
    // el metodo catch captura una falla y lo convierte en un error cuando la promesa sale mal 
    .catch(error=>{
      alert("Hubo un error al registrar un nuevo usuario :( \n"+error)
    })

  }


  //funcion que limpia los imputs
  limpiar() {
    //en constantes "imputs" llamamos a los atributos y los inicializamos como vacios (string ='',namber=0)
    const inputs = {
      uid: this.usuario.uid = '',
      nombre: this.usuario.nombre = '',
      apellido: this.usuario.apellido = '',
      email: this.usuario.email = '',
      rol: this.usuario.rol = '',
      password: this.usuario.password = '',
    }







   /*
    // mostramos credenciales por consola
     // console.log(credenciales)
    // mostramos la coleccion de usuarios por consola 
    // console.log(this.coleccionUsuario)

    //Enviamos la nueva informacion como un nuevo objeto a la colecion de usuario
    this.coleccionUsuario.push(credenciales)

    //le notificamos al usuario que se registro correctamente  
    alert("Te registrate correctamente")

    // hacemos que la funcion limpiar se aplique
    this.limpiar()

    // almacenamos el arreglo coleccionUsuario
    localStorage.setItem(this.usuario.email, JSON.stringify(credenciales))
  

  
  }
 */

}
}
