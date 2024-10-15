import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/page/inicio/inicio.component';

// Guardián para la vista de Administrador
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard';

const routes: Routes = [
  //RUTA INICIAL / PRINCIPAL AL COMPONENTE
  {path:"", component: InicioComponent },

  // CARGA PEREZOSA -> RUTA AL MODULO INICIO
  // loadChildren: indica que será ruta hija del módulo raíz
  // ()=>: Funcion flecha que importará la dirección del módulo
  // .then: Promesa que nos devolverá un valor resuelto o rechazado
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/producto/producto.module').then(m=>m.ProductoModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule),
    // Definimos al guardian que proteja la ruta de Admin y que espere un rol de tipo "admin"
    canActivate: [rutaProtegidaGuard], data: { role: 'admin' }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
