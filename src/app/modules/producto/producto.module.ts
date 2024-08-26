import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { ModsworkshopComponent } from './pages/modsworkshop/modsworkshop.component';
import { SoporteComponent } from './pages/soporte/soporte.component';


// COMPONENTES LOCALES
import { CardComponent } from './components/card/card.component';
import { CardJuegosComponent } from './components/card-juegos/card-juegos.component';


@NgModule({
  declarations: [
    ProductoComponent,
    JuegosComponent,
    ModsworkshopComponent,
    SoporteComponent,
    CardComponent,
    CardJuegosComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    ProductoComponent,
    JuegosComponent,
    ModsworkshopComponent,
    ProductoComponent,
    SoporteComponent,
    CardComponent,
    CardJuegosComponent
  ]
})
export class ProductoModule { }
