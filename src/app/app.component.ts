import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
//import MapboxDirections from "@mapbox/mapbox-gl-directions";
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

mapa = Mapboxgl.Map;
coordinates :any = document.getElementById('coordinates');

lat: any;
lon: any;

  ngOnInit(): void {

    (Mapboxgl as any).accessToken = environment.mapboxkey;
    Mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      null,
      true // Lazy load the plugin
      );
       
    this.mapa = new (Mapboxgl as any).Map ({
    container: 'mapamapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [10.6691389,35.7119595], // starting position LON, LAT
    zoom: 16.9 // starting zoom
    });

    this.createMarker(10.669138,35.7119595);
    //this.mapa.addControl(new (Mapboxgl as any).NavigationControl());

//console.log((Mapboxgl as any).marker.getLngLat());
(this.mapa as any).addControl (
  new MapboxDirections({
  accessToken: Mapboxgl.accessToken
  }),
  'top-left'
  );
  }

createMarker(lon: number, lat: number){
  var marker = new Mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([lon , lat])
    .addTo(this.mapa as any);

      marker.on('drag',()=>{
      var lngLat = marker.getLngLat();
     // console.log(lngLat.lat);
      this.lat=lngLat.lat;
      this.lon=lngLat.lng;
      console.log(this.lat+'___'+this.lon);
    })
    
}

}
