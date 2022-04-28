import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { AddComponent } from './component/add/add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateComponent } from './update/update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../app/service/auth.interceptor';


import { ToastrModule } from 'ngx-toastr';

 
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddComponent,
    UpdateComponent,
    LoginComponent,
    SigninComponent, 
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatCardModule,
    // MatMomentDateModule,
    MatGridListModule
 

  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },         
  { provide: LOCALE_ID, useValue: "en-GB" },
  {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]

  
})
export class AppModule { }

