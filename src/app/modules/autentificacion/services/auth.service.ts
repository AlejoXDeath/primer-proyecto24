import { Injectable } from '@angular/core';
//Servicio en la nube de autentificacion de firebase 
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
//Referenciar auth de firebase en el servicio
  constructor(public auth: AngularFireAuth) { }

  //FUNCION PARA REGISTRO
registrar(email: string,password:string){
  //retorna el valor que es creado con el metodo "createUser"
  return this.auth.createUserWithEmailAndPassword(email,password);
}
  //FUNCION PARA INICIO DE SESIÓN
  
  iniciarSesion(email:string,password:string){
    //validar la iformacion del usario -> saber si existe en la coleccion 
    return this.auth.signInWithEmailAndPassword(email,password)
  }
  //FUNCION PARA CERRAR SESIÓN
  cerrarSesion(){
    //devuelve una promesa vacía -> qiota token 
    return this.auth.signOut();
  }

  //FUNCION PARA TOMAR UID


}
