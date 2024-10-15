import { Injectable } from '@angular/core';
// servicio en la nube de autentificación de firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
// Accedemos directamente al servicio Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Observables para obtener cambios
import { Observable } from 'rxjs';

// Itera colección leyendo información actual
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Propiedad privada para guardar rol de usuario
  private rolUsuario: string | null = null;

  // referenciar auth de firebase en el servicio
  constructor(
    private auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore
  ) { }

  // FUNCIÓN PARA REGISTRO
  registrar(email: string, password: string){
    // retorna el valor que es creado con el método "createEmail..."
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
  // FUNCIÓN PARA INICIO DE SESIÓN
  iniciarSesion(email: string, password: string){
    // validar la información del usuario -> saber si existe en la colección
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  // FUNCIÓN PARA CERRAR SESIÓN
  cerrarSesion(){
    // devuelve una promesa vacía -> quita token
    return this.auth.signOut();
  }

  // FUNCIÓN PARA TOMAR EL UID
  async obtenerUid(){
    // Nos va a generar una promesa y la constante la va a capturar
    const user = await this.auth.currentUser;

    /*
    Si el usuario no respeta la estructura de la interfaz/
    Si tuvo problemas para el registro -> ej.: mal internet
    */

    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }

  // FUNCIÓN PARA OBTENER EMAIL
  obtenerUsuario(email: string){
    /**
     * retornamos del servicioFirestore la coleccion de 'Usuarios', buscamos una referencia en los email registrados
     * y los comparamos con los que ingrese el usuario al iniciar sesion, y lo obtiene con el '.get()'
     * Lo vuelve una promesa => de un resultado RESUELTO o RECHAZADO
     */
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
  }

  obtenerRol(uid: string): Observable <string | null> {
    /* Accedemos a colección de usuarios, buscnado por UID, obteniendo cambios en valores.
    Al enviar info. por tubería, "mapeamos" la colección, obtenemos  un usuario especifico
    y buscamos su atributo "rol", aún si este es "nulo"
    */
    return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges()
    .pipe(map((usuario: any) => usuario ? usuario.rol: null));
  }


    // Enviar el rol obtenido -> asignarlo al rol de la variable local
  setUsuarioRol(rol: string){
    this.rolUsuario = rol;
  }


  // Obtener el rol y asignarlo al rol en la variable local
  getUsuarioRol(): string | null {
    return this.rolUsuario;
  }

}


