import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomeInterceptor } from '../services/custome.interceptor';

@Component({
  selector: 'app-home',
  standalone: true,
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:CustomeInterceptor,
      multi:true
    }
  ],
  imports: [FormsModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  users: any[]=[];
  nombreUsuario: string = '';
  correoUsuario: string = '';


  IngresarObj: any = {
    "UserReporte": localStorage.getItem('Identificador'),
    "TipoReporte": 1,
    "EstadoReporte":1,
    "Observacion": ""

  }


  constructor(private http: HttpClient, private router: Router){}
 

  ngOnInit() {
    // Retrieve NombreUsuario from localStorage
    this.nombreUsuario = localStorage.getItem('NombreUsuario') || '';
    this.correoUsuario = localStorage.getItem('Correo') || '';

    // Load users
    //this.LoadUsers();
  }

  GuardarReporte() {
   this.http.post('http://localhost:5124/api/Reportes/Guardar', this.IngresarObj).subscribe((res:any)=>{
    if (res.result) {
      alert(res.message);
      this.router.navigateByUrl('/reportes');
    } else {
      alert(res.message);
    }
   })
  }















  //LoadUsers(){
    //this.http.get('https://freeapi.miniprojectideas.com/api/User/GetAllUsers').subscribe((res:any)=>{
      //this.users = res.data;
    //})
  //}

  

}
