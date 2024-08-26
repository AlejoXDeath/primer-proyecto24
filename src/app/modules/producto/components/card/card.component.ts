import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // Definimos colección de productos locales
  coleccionProductos: Producto[]= [];

  // Variable local para seleccionar un producto específico
  productoSeleccionado!: Producto;

  // Variable local para manejar estado de un modal
  modalVisible: boolean= false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  mostrarVer(info: Producto){
    // Cambio estado del modal a true (Ahora es visible)
    this.modalVisible = true;

    // Guardo en variable seleccionado la información de producto elegido
































    
    this.productoSeleccionado = info;
  }
}
