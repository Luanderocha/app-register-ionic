import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  ) { }

  ngOnInit() {
    this.getProfessions();
  }

  getProfessions() {
    this.listProfessionService.getProfessions().subscribe(res => {
      this.listProfessions = res;
    });
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }

  delete(id) {
    this.listProfessionService.deleteProfession(id).subscribe(res => {
      this.openToast('Profession Delete!', 'success')
      this.getProfessions();
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
      color: color
    });
    toast.present();
  }

}
