import { Component } from '@angular/core';

//IMPORTAMOS INTERFAZ
import { Juego } from 'src/app/models/juego';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO: ARRAY)
  public info: Juego[];

  constructor(){
    this.info = [
      {
        id: "",
        nombre: "Skyrim", 
        genero: "RPG",
        edad: 2011,
        imagen: "",                                 
        alt: "Portada de Skyrim"
      },
      {
        id: "",
        nombre: "Valorant",
        genero: "Shooter",
        edad: 2020,
        imagen: "",
        alt: ""
      },
      {
        id: "",
        nombre: "Hollow Knight",
        genero: "Plataforma",
        edad: 2017,
        imagen: "",
        alt: ""
      }
    ]
  }
}
