import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient,HttpHeaders  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CustomeInterceptor } from '../services/custome.interceptor';

import { ReportModalComponent } from '../report-modal/report-modal.component';

@Component({
  selector: 'app-search',
  standalone: true,
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:CustomeInterceptor,
      multi:true
    }
  ],
  imports: [FormsModule,HttpClientModule,CommonModule],

  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
  users: any[] = [];
  nombreUsuario: string = '';
  correoUsuario: string = '';
  identificador: string = '';
  numeroReporte: number = 0;
 

  constructor(private http: HttpClient, private modalService: NgbModal) {} // Inject NgbModal

  ngOnInit(): void {
    const token = localStorage.getItem('LoginToken');
    this.nombreUsuario = localStorage.getItem('NombreUsuario') || '';
    this.correoUsuario = localStorage.getItem('Correo') || '';
    this.identificador = localStorage.getItem('Identificador') || '';
    const identificador = 1;
    this.numeroReporte = 0; // Inicializar con null
  }


 

  BuscarReportes() {
    this.http.post<any>('http://localhost:5124/api/Reportes/Buscar/', { reporteId: this.numeroReporte })
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            // Actualiza los datos en la tabla
            this.users = res.data; // Asume que 'res.data' contiene los reportes
          } else {
            alert("Error al buscar reportes: " + res.message);
          }
        },
        error: (error: any) => {
          console.error("Error en la petición HTTP:", error);
        },
      });
  }
  

  getTipoReporteDescripcion(tipoReporte: number): string {
    switch (tipoReporte) {
      case 1:
        return 'Oscilacion de Voltaje';
      case 2:
        return 'Predio sin energia';
      case 3:
        return 'Acometida en el suelo';
      case 4:
        return 'Caja de abonado en mal estado';
      default:
        return 'Tipo de reporte no especificado';
    }
  }


}
