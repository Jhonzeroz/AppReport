import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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

constructor(private http: HttpClient, private router: Router){}
  onLogin() {
   this.http.post('https://freeapi.miniprojectideas.com/api/User/Login', this.loginObj).subscribe((res:any)=>{
    if (res.result) {
      alert('Login Correcto');
      localStorage.setItem('LoginToken', res.data.token);
      this.router.navigateByUrl('/home');
    } else {
      alert(res.message);
    }
   })
  }


}
