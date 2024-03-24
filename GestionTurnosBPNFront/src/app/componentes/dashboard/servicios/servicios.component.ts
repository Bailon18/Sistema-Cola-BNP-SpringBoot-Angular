import { Component, OnInit } from '@angular/core';
import { Servicio } from './servicio';
import { ServiciosService } from './servicios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit{

  servicios: Servicio[] = [];

  constructor(
    private servicioService: ServiciosService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

    this.servicioService.listarServicios().subscribe({

      next: (resp) => {
        this.servicios = resp.map(servicio => {
          return {
            ...servicio,
            imagen: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + servicio.imagen)
          }
        })
      },
      error: (error) => {
      }
    })
  }

}
