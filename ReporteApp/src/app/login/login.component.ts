import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginObj: any = {
    "EmailId": "",
    "Password": ""
  }

  formValid = false;
  loginForm: FormGroup;
  onFormChange() {
    this.formValid = this.loginObj.EmailId.trim() !== '' && this.loginObj.Password.trim() !== '';
  }


  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.loginObj = { EmailId: '', Password: '' };
    this.loginForm = this.formBuilder.group({
      EmailId: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  



onLogin() {
  this.http.post('http://localhost:5124/api/Autenticacion/Validar', this.loginObj).subscribe({
    next: (res: any) => {
      if (res.result) {
        alert("Inicio de sesión exitoso: " + res.message);
        localStorage.setItem('LoginToken', res.data.token);
        localStorage.setItem('Correo', res.data.correo);
        localStorage.setItem('NombreUsuario', res.data.nombre);
        localStorage.setItem('Identificador', res.data.iduser);
        this.router.navigateByUrl('/home');
      } else {
        alert("Error al iniciar sesión: " + res.message);
      }
    },
    error: (error: any) => {
      console.error("Error en la petición HTTP:", error);
    },
  });
}

}
