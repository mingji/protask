import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { TaskListModalComponent } from './components/dashboard/modal/taskListModal/taskListModal.component'
import { TaskModalComponent } from './components/dashboard/modal/taskModal/taskModal.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    RequestResetComponent,
    ResponseResetComponent,

    TaskListModalComponent,
    TaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,

    NgbModule.forRoot(),
  ],
  providers: [
    JarwisService, 
    TokenService, 
    AuthService, 
    TaskService, 
    AfterLoginService, 
    BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TaskListModalComponent,
    TaskModalComponent
  ]
})
export class AppModule { }
