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
  selector: 'app-reportes',
  standalone: true,
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:CustomeInterceptor,
      multi:true
    }
  ],
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
  
})
export class ReportesComponent implements OnInit {
  users: any[] = [];
  nombreUsuario: string = '';
  correoUsuario: string = '';
  identificador: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal) {} // Inject NgbModal

  ngOnInit(): void {
    const token = localStorage.getItem('LoginToken');
    this.nombreUsuario = localStorage.getItem('NombreUsuario') || '';
    this.correoUsuario = localStorage.getItem('Correo') || '';
    this.identificador = localStorage.getItem('Identificador') || '';
    const identificador = 1;
   

 

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      this.http.get('http://localhost:5124/api/Reportes/Lista', { headers: headers })
        .subscribe(
          (response: any) => {
            if (response && response.response) {
              this.users = response.response.filter((reporte: any) => reporte.userReporte === identificador);
    
            } else {
              console.error('La respuesta no tiene el formato esperado:', response);
            }
          },
          (error) => {
            console.error('Error al obtener usuarios:', error);
    
            
          }
        );
    } else {
      console.warn('No hay token de autenticación. Realiza la solicitud sin token.');
      
      this.http.get('http://localhost:5124/api/Reportes/Lista')
        .subscribe(
          (response: any) => {
            if (response && response.response) {
              this.users = response.response.filter((reporte: any) => reporte.userReporte === +identificador);
              
            } else {
              console.error('La respuesta no tiene el formato esperado:', response);
            }
          },
          (error) => {
            console.error('Error al obtener usuarios:', error);
    
           
          }
        );
    }
    
    











   
  }

  editReport(user: any) {
    const modalRef = this.modalService.open(ReportModalComponent, { size: 'lg' });
    modalRef.componentInstance.user = user;
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
