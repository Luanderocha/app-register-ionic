import { Component, OnInit } from '@angular/core';
import { IData } from '../models/IData.model';
import { RegistrationDataService } from './registration-data.service';

@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html',
  styleUrls: ['./registration-data.component.scss'],
})
export class RegistrationDataComponent implements OnInit {
  userData: IData;

  constructor(private registrationDataService: RegistrationDataService) {}

  ngOnInit() {
    this.registrationDataService
      .getData()
      .valueChanges()
      .subscribe((res) => (this.userData = res));
  }
}
