import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CustomeInterceptor } from "./services/custome.interceptor";



@NgModule({
    providers:[
        {
          provide: HTTP_INTERCEPTORS,
          useClass:CustomeInterceptor,
          multi:true
        }
      ],
})


export class AppModule {}