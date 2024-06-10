import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//IMPORTAMOS COMPONENTES GLOBALES
import { SharedModule } from './modules/shared/shared.module';

// FIREBASE -> importamos HERRAMIENTAS de la Base de Datos
import { environment } from 'src/environments/environment'; // Vincula a la BD con la APP
import { AngularFireModule } from '@angular/fire/compat'; // Trabaja con las colecciones de información
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Trabaja con la autentificación
import { AngularFireStorageModule } from '@angular/fire/compat/storage' // Trabaja con imágenes y archivos

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // COMPONENTES GLOBALES
    SharedModule,
    // VINCULACION CON FIREBASE
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase dentro del proyecto
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
