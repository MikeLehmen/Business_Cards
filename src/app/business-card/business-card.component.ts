import { Component, OnInit, Input } from '@angular/core';
import { IBusinessCardTestID } from './model/business-card.model';
import { BusinessCardService } from './service/business-cards.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() data: IBusinessCardTestID;

  constructor(private cards: BusinessCardService) {

   }

  ngOnInit() {
    
  }

  delete(): void {
    this.cards.delete(this.data);
  }

}
