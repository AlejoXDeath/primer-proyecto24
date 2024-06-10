import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//IMPORTAMOS COMPONENTES GLOBALES
import { SharedModule } from './modules/shared/shared.module';

// FIREBASE -> importamos HERRAMIENTAS DE LA BASE DE DATOS 
import { envarioment } from 'src/environments/environment'; // vincula a la BD con la APP
import {AngularFireModule} from '@angular/fire/compat'; // trabaja con las colecciones de infromación
import {AngularFireAuthModule} from '@angular/fire/compat/auth';// trabaja con la autentificacion 
import {AngularFireStorageModule} from '@angular/fire/compat/storage';//trabaja con imagenes y archivos 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    //Vinculacion de firebase
    AngularFireModule.initializeApp(envarioment.firebaseConfig),//inicializar firebase dentro del proyecto 
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
