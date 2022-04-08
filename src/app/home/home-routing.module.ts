import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterComponent } from './form-register/form-register.component';
import { HomePage } from './home.page';
import { LoginComponent } from './login/login.component';
import { RegistrationDataComponent } from './registration-data/registration-data.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'data',
        component: RegistrationDataComponent
      },
      {
        path: 'register',
        component: FormRegisterComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
