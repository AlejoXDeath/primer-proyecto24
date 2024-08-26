import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-juegos',
  templateUrl: './card-juegos.component.html',
  styleUrls: ['./card-juegos.component.css']
})
export class CardJuegosComponent {

 // Colección de productos de 
coleccionProductos: Producto[] = [];

coleccionJuegos: Producto[]= [];

productoSeleccionado!: Producto;

modalVisible: boolean = false;

constructor(public servicioCrud: CrudService){}

ngOnInit(): void{
  // Accedemos a método 'obtenerProducto' y nos suscribimos a los cambios
  // recibimos notificación ante modificaciones
  this.servicioCrud.obtenerProducto().subscribe(producto => {
    this.coleccionProductos = producto;

    // Mostrará la colección de esa categoría hasta el momento
    this.mostrarProductoJuegos();
  })
}

// Función para filtrar los productos de tipo "Juegos"
mostrarProductoJuegos(){
  // Iteramos colección de productos con un 'forEach'
  this.coleccionProductos.forEach(producto => {
    // Si es de tipo "alimentación" -> condicional
    if(producto.categoria === "Juegos"){
      // Lo sube/ guarda en la colección de productos de tipo "juego"
      this.coleccionJuegos.push(producto)
    }
  })
}

mostrarVer(info: Producto){
  this.modalVisible = true;

  this.productoSeleccionado = info;
}
}
