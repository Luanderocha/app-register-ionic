import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IUser } from '../models/IUser.model';
import { LoginService } from './login.service';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  login = true;

  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    public loginService: LoginService,
    public router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  register() {
    this.formLogin.reset();
    this.login = false;
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  createUserGoogle() {
    this.loginService
      .googleAuth()
      .then((res) => {
        this.openToast('You have been successfully logged in!', 'success');
        this.router.navigateByUrl('home/data');
      })
      .catch((err) => {
        this.openToast(err, 'danger', 5000);
      });
  }

  createUserlogin() {
    const payload: IUser = this.formLogin.value;
    if (this.formLogin.valid) {
      this.loginService
        .singUp(payload)
        .then((res) => {
          this.openToast('sucess register', 'success');
          this.formLogin.reset();
          this.login = true;
        })
        .catch((err) => {
          this.openToast(err, 'danger', 5000);
        });
    } else {
      this.openToast('Form Invalid !', 'danger');
    }
  }

  userLogin() {
    const payload: IUser = this.formLogin.value;
    if (this.formLogin.valid) {
      this.loginService
        .singIn(payload)
        .then((res) => {
          this.openToast('sucess Login', 'success');
          this.formLogin.reset();
          this.router.navigateByUrl('home/data');
        })
        .catch((err) => {
          this.openToast(err, 'danger', 5000);
        });
    } else {
      this.openToast('Form Invalid !', 'danger');
    }
  }
  async openToast(message, color, duration?) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration | 2000,
      position: 'top',
      color: color,
    });
    toast.present();
  }
}
