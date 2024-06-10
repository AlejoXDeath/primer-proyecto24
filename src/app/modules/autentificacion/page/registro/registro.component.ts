import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// importamos servicio de autentificación
import { AuthService } from '../../services/auth.service';
// importamos componente de rutas de angular
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //input de la contraseña para ver los carácteres o no
  hide = true;

  // ####################################################### Importaciones de interfaz 'Usuario

  // IMPORTAR LA INTERFAZ DE USUARIO -> INICIALIZAR
  usuarios: Usuario = {
    uid: '', // -> inicializamos con comillas simples porque es STRING                                                                
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  //CREAMOS COLECCIÓN DE USUARIOS, TIPO 'USUARIO' PARA ARRAYS
  coleccionUsuarios: Usuario[] = [];

  // ###################################################### Fin importaciones

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ){}

  // FUNCIÓN PARA EL REGISTRO DE NUEVOS USUARIOS
  async registrar(){
    // constante credenciales va a resguardar la información que ingrese el usuario
    /* EL REGISTRO LOCAL
    const credenciales = {
      uid: this.usuarios.uid, //definimos al atributo de la interfazz con una variable local
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password,
    } */
   

    // REGISTRO CON SERVICIO
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    const res = this.servicioAuth.registrar(credenciales.email, credenciales.password)
    // el metodo THEN es una promesa que devuelve el mismo valor si todo sale ok
    .then(res=> {
      alert("'Se pudo registrar con éxito! :)");

      // el método NAVIGATE nos redirecciona a otra vista
      this.servicioRutas.navigate(['/inicio']);
    })
    //el método CATCH captura una falla y la vuelve un error cuando la promesa salga mal
    .catch(error =>{
      alert("Hubo un error al registrar un nuevo usuario :( 1 \n"+error);
    })

    // Enviamos la nueva información como un NUEVO OBJETO a la colección de usuarios
    // this.coleccionUsuarios.push(credenciales)


    // Mensaje que saldrá cuando se registre correctamente    
    alert("¡Te registraste con éxito :)")

    // Llamamos a la funcion limpiarinputs() para ejecutarla
    this.limpiarInputs();

    // Mostramos credenciales por consola                                                                                                               
    console.log(credenciales);
    console.log(this.coleccionUsuarios);
  }

 // Función para vaciar los inputs del registro
  limpiarInputs(){
    /*
      En constante "inputs" llamamos a los atributos y los inicializamos
      como vacíos (string= '', number = 0)=
    */
    const inputs= {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido ='',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }

}
