import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// importamos servicio de autentificación
import { AuthService } from '../../services/auth.service';
// importamos componente de rutas de angular
import { Router } from '@angular/router';
//servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
// importamos paquetería de criptación
import * as CryptoJS from 'crypto-js';
// paquetería de alertas personalizadas
import Swal from 'sweetalert2'


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
    public servicioRutas: Router,
    public servicioFirestore: FirestoreService
  ) { }

  // FUNCIÓN PARA EL REGISTRO DE NUEVOS USUARIOS
  async registrar() {
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


    // REGISTRO CON SERVICIO DE AUTH
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
      // el metodo THEN es una promesa que devuelve el mismo valor si todo sale ok
      .then(res => {
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "¡Se pudo registrar con éxito! :)",
          icon: "success"
        });

        // el método NAVIGATE nos redirecciona a otra vista
        this.servicioRutas.navigate(['/inicio']);
      })
      //el método CATCH captura una falla y la vuelve un error cuando la promesa salga mal
      .catch(error => {
        Swal.fire({
          title: "¡Oh no!",
          text: "Hubo un error al registrar un nuevo usuario:( \n" + error,
          icon: "error"
        });
        
      })


    //constante UID captura el identificado de la BD
    const uid = await this.servicioAuth.obtenerUid();

    this.usuarios.uid = uid;
    /**
     * SHA-256: Es un algoritmo de hash seguro que toma una entrada (em este caso la contraseña)
     * y produce una cadena de caracteres hexadecimal que va a representar a su hash
     * toString: convierte el resultado en la cadena de caracteres legible
     */
    this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();

    // Llamamos a la funcion guardarusuario()
    this.guardarUsuario();
    // Llamamos a la funcion limpiarinputs() para ejecutarla
    this.limpiarInputs();

    /*
    // Mostramos credenciales por consola                                                                                                               
    // console.log(credenciales);
    // console.log(this.coleccionUsuarios);
    */
  }

  /* Funcion que accede a servicio FIREBASE y envia la informacion
  agrega junto al UID
  */

  async guardarUsuario() {
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
      .then(res => {
        console.log(this.usuarios);
      })
      .catch(err => {
        console.log('Error => ', err)
      })
  }
  // Función para vaciar los inputs del registro
  limpiarInputs() {
    /*
      En constante "inputs" llamamos a los atributos y los inicializamos
      como vacíos (string= '', number = 0)=
    */
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }

}
