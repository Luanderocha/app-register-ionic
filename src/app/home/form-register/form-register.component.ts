import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormRegisterService } from './form-register.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
  formRegister: FormGroup;
  title = 'Register';
  saveButton = 'Register';

  constructor(
    private fb: FormBuilder,
    private formRegisterService: FormRegisterService,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.id) {
      this.title = 'Edit';
      this.saveButton = 'Edit';
      this.formRegisterService
        .getProfessionById(this.id)
        .valueChanges()
        .subscribe((res) => {
          this.formRegister.patchValue(res);
        });
    }
  }

  get id() {
    return this.route.snapshot.params.id;
  }

  createForm() {
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      cpf: [null, Validators.required],
      rg: [null, Validators.required],
      address: [null, Validators.required],
      age: [null, Validators.required],
      profession: [null, Validators.required],
    });
  }

  register() {
    if (this.formRegister.valid) {
      if (this.id) {
        this.formRegisterService
          .updateProfession(this.id, this.formRegister.value)
          .then((res) => {
            this.openToast('Edit success', 'success');
            this.router.navigateByUrl('home/professions');
          })
          .catch((error) => {
            this.openToast('Form Invalid!' + error, 'danger');
          });
      } else {
        this.formRegisterService
          .setProfesssion(this.formRegister.value)
          .then((res) => {
            this.openToast('register success', 'success');
            this.router.navigateByUrl('home/professions');
          })
          .catch((error) => {
            this.openToast('Form Invalid!' + error, 'danger');
          });
      }
    } else {
      this.openToast('Form Invalid!', 'danger');
    }
  }

  async openToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color,
    });
    toast.present();
  }
}
