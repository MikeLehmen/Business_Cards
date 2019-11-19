import { Component, OnInit, Input } from '@angular/core';
import { IBusinessCardTest } from './model/business-card.model';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() data: IBusinessCardTest;

  constructor() {

   }

  ngOnInit() {
    
  }

}
