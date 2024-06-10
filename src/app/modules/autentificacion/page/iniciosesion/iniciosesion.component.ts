import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
hide=true

//importar la interfaz de usuario -> inicializar
inicio: Usuario ={
  email:'',
  password:'',
  nombre:'',
  apellido:'',
 uid:'',//-> inicializamos con comillas simples porque es string,si fuera nambuer se inicializa con 0
  rol:'',
  
}

//creamos coleccion de usuarios,tipo 'usuario'para arrays
coleccionIniciosesion: Usuario[]= [];

//funcion para el registro de nuevos usuarios
inisiarsesion(){
  //constante credencial va a reguardar la informacion que ingrese el usuario 
  const credenciales = {
    uid: this.inicio.uid,
    nombre: this.inicio.nombre,
    apellido: this.inicio.apellido,
    email:this.inicio.email,
    rol:this.inicio.rol,
    password:this.inicio.password
  }
  //Enviamos la nueva informacion como un nuevo objeto a la colecion de usuario
  this.coleccionIniciosesion.push(credenciales)
  // llamamos a los datos locales que esatn en registro
const sUsuarioEncontrado = localStorage.getItem(credenciales.email)

if(sUsuarioEncontrado){
  const oUsuarioEncontrado = JSON.parse(sUsuarioEncontrado)
  const contrasena = oUsuarioEncontrado.password
  console.log('contraseña ='+ contrasena)
  if(contrasena == credenciales.password)
    alert("Funciona")
    else{
      alert("no funciona")
    }
} else{
  console.log('User date not found in local storage')
}
const compra = localStorage.getItem('contra')

  this.limpiar()




}
limpiar(){
  const inputs ={
    email:this.inicio.email,
    password:this.inicio.password
   }
  }

}
