import { Injectable } from '@angular/core';
//importamos la base de datos de firestore y accedemos a las colecciones 
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
// definimos de forma privada la coleccion usuarios para que no sea acecible en toda la aplicacion.lo definimos como una coleccion de firestore que respete la estructura de nuestra interfaz 'usuario'
  private usuariosCollection:AngularFirestoreCollection<Usuario>
  constructor(private database:AngularFirestore) { 
    /* 
    Usuariocollection va a definir la nueva coleccion 'usuarios' que estara en nuestra base de datos 
    */
    this.usuariosCollection = this.database.collection<Usuario>('usuarios');

  }
}
