import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-103.4972323, 25.5627186],
      zoom: 14,
    });

    const market = new mapboxgl.Marker({
      color: 'purple',
    })
      .setLngLat([-103.4972323, 25.5627186])
      .addTo(map);

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {}
}
