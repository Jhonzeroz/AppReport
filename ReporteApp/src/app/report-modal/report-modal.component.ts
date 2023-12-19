
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomeInterceptor } from '../services/custome.interceptor';
@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  imports: [FormsModule,HttpClientModule],
  styleUrls: ['./report-modal.component.css'],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:CustomeInterceptor,
      multi:true
    }
  ],
  standalone: true 
})
export class ReportModalComponent {
  @Input() user: any;

  // Agrega HttpClient al constructor
  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {}

  // Agregar función para guardar cambios
  saveChanges() {
    const editUrl = 'http://localhost:5124/api/Reportes/Editar';
    this.http.put(editUrl, this.user)
      .subscribe(
        (res: any) => {
          // Asegúrate de acceder a 'res.mensaje'
          alert(res.mensaje);
          this.activeModal.close('Save click');
        },
        (error) => {
          console.error('Error al editar el reporte:', error);
          alert('Error al editar el reporte. Consulta la consola para más detalles.');
        }
      );
  }
  
  
  
  
}
