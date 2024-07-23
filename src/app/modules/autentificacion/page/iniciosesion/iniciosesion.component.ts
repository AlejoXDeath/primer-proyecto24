import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// IMPORTAMOS SERVICIO DE AUTENTIFICACION
import { AuthService } from '../../services/auth.service';
// IMPORTAMOS 
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true

  // ############################### LOCAL
  //  Definimos colección local de usuarios
  /*
  public coleccionUsuariosLocales: Usuario[];

  constructor() {
    this.coleccionUsuariosLocales = [
      {
        uid: '',
        nombre: 'Dibu',
        apellido: 'Nuñez',
        email: 'santinuñez@gmail.com',
        rol: 'admin',
        password: '123456'
      },
      {
        uid: '',
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juanperez@gmail.com',
        rol: 'vist',
        password: 'abc123'
      },
      {
        uid: '',
        nombre: 'Taliyah',
        apellido: 'Rosales',
        email: 'TliyaRosales@gmail.com',
        rol: 'vist',
        password: 'abcdef'
      }
    ]
  }
  */
  // ############################## FIN LOCAL

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  // ################################## INGRESADO
  // Definimos la interfaz de usuario
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función para iniciar sesión
  async iniciarSesion() {
    // Recibe la información ingresada desde el navegador
    /*
    const credenciales = {
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password
    }
    

    // Repetitiva para recorrer la colección de usuarios locales
    for (let i = 0; i < this.coleccionUsuariosLocales.length; i++) {
      // usuarioLocal corresponde a esa posición en específico
      const usuariolocal = this.coleccionUsuariosLocales[i];

      // Condicional para verificar la existencia del usuario ingresado
      if (usuariolocal.nombre === credenciales.nombre &&
        usuariolocal.apellido === credenciales.apellido &&
        usuariolocal.email === credenciales.email &&
        usuariolocal.rol === credenciales.rol &&
        usuariolocal.password === credenciales.password) {

        // Notificamos al usuario que pudo ingresar
        alert("Ingresaste con éxito!");
        break;
      } else {
        alert("Ocurrió un problema al iniciar sesión");
        break;
      }

    }
      */

    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try {
      // obtenemos usuario de la BD
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      // Condicional verificaba que ese usuario de la BD existiera o que sea igual al de nuestra colección
      if (!usuarioBD || usuarioBD.empty) {
        alert("Correo electrónico no está registrado");
        this.limpiarInputs();
        return;
      }

      // Vinculaba al primer documento de la colección "Usuarios" que se obtenía desde la BD
      const usuarioDoc = usuarioBD.docs[0];

      /* 
      Extrae los datos del documento en forma de "objeto" y se especifica que va a ser del
      tipo "Usuario" (se refiere a la interfaz Usuario de nuestros modelos)
      */
      const usuarioData = usuarioDoc.data() as Usuario;

      // Encripta la contraseña que el usuario envía mediante "Iniciar Sesión"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      /*
      Condicional que compara la contraseña que acabamos de encriptar y que el usuario
      envió con la que recibimos del "usuarioData" 
      */
      if (hashedPassword !== usuarioData.password) {
        alert("Contraseña incorrecta");

        this.usuarios.password = '';
        return;
      }

      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          alert('¡Se pudo ingresar con éxito :)!');

          this.servicioRutas.navigate(['/inicio']);
        })
        .catch(err => {
          alert('Hubo un problema al iniciar sesión :(' + err);

          this.limpiarInputs();
        })
    } catch (error) {
      this.limpiarInputs();
    }


  }

  limpiarInputs() {

    const inputs = {
      email: this.usuarios.email = '',
      password: this.usuarios.password = ''
    }
  }

}

