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
  update: boolean;

  constructor(private cards: BusinessCardService) {
    this.update = false;
   }

  ngOnInit() {
    
  }

  delete(): void {
    this.cards.delete(this.data);
  }

  updateCard() {
    this.cards.update(this.data);
    
    this.swapView();
  }

  swapView(): void {
    this.update = !this.update;
  }

}
