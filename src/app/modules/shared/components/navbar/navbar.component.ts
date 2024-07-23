import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  logueado = true; // booleana para manejo de registro y el inicio de sesión
  deslogueado = false; // booleana para manejo de cierre de sesión

  constructor(
  public servicioAuth: AuthService,
  public servicioRutas: Router
){}


// funcion "ingresar" para invertir los vlaores
ingresar(){
  this.logueado=false;
  this.deslogueado=true;
}

//función "cerrarSesion" devuelve los valores originales
cerrarSesion(){
  this.deslogueado = false;
  this.logueado = true;

// llamamos al método de "cerrar sesión" para limpiar el "token"
  this.servicioAuth.cerrarSesion();

  // redirigimos a la raíz del sitio web
  this.servicioRutas.navigate(['/']);
}

}
