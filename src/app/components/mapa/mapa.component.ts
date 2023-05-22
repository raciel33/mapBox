import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/app/interfaces/interfaces';

import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{

  mapa!: mapboxgl.Map;

  lugares: Lugar[] = [{
    id: '1',
    nombre: 'Fernando',
    lng: -75.75512993582937,
    lat: 45.349977429009954,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Amy',
    lng: -75.75195645527508,
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'Orlando',
    lng: -75.75900589557777,
    lat: 45.34794635758547,
    color: '#19884b'
  }];

  constructor(){

  }

  ngOnInit(): void {
       this.crearMapa();
  }

  crearMapa(){

    //mapboxgl as any: esto lo pongo asi pa quitar el error
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoicmFjaWVsMTk4OCIsImEiOiJjbGh5bTZ3d3kxM250M2VtZDk1cXQ2bG9mIn0.JeWTkQk-qjJ8RtAbaA5d8g';//token de mapBox

     this.mapa = new mapboxgl.Map({
      container: 'mapa', //hace referencia al id del html donde se va mostrar el mapa
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-75.75512993582937 , 45.349977429009954],  //lo centramos en esta position
      zoom:15.8  //la damos zoom para que se vea mejor
    });

    //metemos los lugares definidos en el mapa como marcadores
    for (const marcador of this.lugares) {
      this.agregarMarcador( marcador );
    }
  }

  agregarMarcador( marcador:Lugar ){

    //Info del marcador
    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement( 'button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append( h2, btnBorrar)

   /*nota: la info del marcador la habia creado de esta manera
   pero como tengo que usar el boton de borrar no es conveniente
   */
   /* const html = `<h2>${ marcador.nombre}</h2>
                  <br>
                  <button>Borrar</button>

                  `*/


     //asignamos el div creado al marador
    const customPopup = new mapboxgl.Popup({
      offset:25,
      closeOnClick:false

    }).setDOMContent(div);

    //creacion del marcador y añadimos al mapa
    const marker =  new mapboxgl.Marker({
          draggable: true,
          color: marcador.color
    })
    .setLngLat( [marcador.lng,marcador.lat])
    .setPopup( customPopup)
    .addTo( this.mapa)


    //obtenemos la position del marcador aunque se haya movido
    marker.on('drag', () =>{
      const lngLat = marker.getLngLat();
      console.log( lngLat);
    })

    btnBorrar.addEventListener('click', () =>{
      marker.remove();

      //eliminar por sockets
    })

  }

  crearMarcador(){

    const customMarker: Lugar = {
           id: new Date().toISOString(),
           lng:-75.75512993582937 ,
           lat:  45.349977429009954,
           nombre: 'Sin nombre',
           color: '#' + Math.floor(Math.random()*16777215).toString(16)
    }

    this.agregarMarcador( customMarker )
  }
}
