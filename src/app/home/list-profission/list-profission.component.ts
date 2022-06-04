import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Profession } from '../classes/profession';
import { IProfession } from '../models/IProfession.model';
import { ListProfessionService } from './list-profession.service';

@Component({
  selector: 'app-list-profission',
  templateUrl: './list-profission.component.html',
  styleUrls: ['./list-profission.component.scss'],
})
export class ListProfissionComponent implements OnInit {
  listProfessions: IProfession[];

  constructor(
    private listProfessionService: ListProfessionService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.getProfessions();
  }

  getProfessions() {
    this.listProfessionService
      .getProfessions()
      .snapshotChanges()
      .subscribe((res) => {
        this.listProfessions = [];
        res.forEach((i) => {
          let pro = i.payload.toJSON();
          pro['$key'] = i.key;
          this.listProfessions.push(pro as Profession);
        });
      });
  }

  delete(id) {
    this.listProfessionService
      .deleteProfession(id)
      .then((res) => {
        this.openToast('Profession Delete!', 'success');
        this.getProfessions();
      })
      .catch((error) => {
        this.openToast('Erro Delete' + error, 'danger');
      });
  }

  edit(id) {
    this.router.navigateByUrl(`home/edit/${id}`);
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
