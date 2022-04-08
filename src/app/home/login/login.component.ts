import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IUser } from '../models/IUser.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    console.log("FORM ", this.formLogin);
    const payload: IUser = this.formLogin.value;
    if (this.formLogin.valid) {
      this.loginService.getUser().subscribe(res => {
        if (res.email !== payload.email || res.password !== payload.password) {
          this.openToast("Login Invalid !", 'danger');
        } else {
          this.openToast("Login Sucess", 'success');
        }
      })
    } else {
      this.openToast("Form Invalid !", 'danger');
    }
  }
  async openToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

}
