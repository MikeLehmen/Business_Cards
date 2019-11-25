import { Component, OnInit } from '@angular/core';
import { BusinessCardService } from '../business-card/service/business-cards.service';
import { Observable } from 'rxjs';
import { IBusinessCardID } from '../business-card/model/business-card.model';

@Component({
  selector: 'app-business-card-list',
  templateUrl: './business-card-list.component.html',
  styleUrls: ['./business-card-list.component.css']
})
export class BusinessCardListComponent implements OnInit {
  private cardsRef: Observable<IBusinessCardID[]>;

  constructor(private cards: BusinessCardService) { }

  ngOnInit() {
    this.cardsRef = this.cards.getItemRef();
  }

}
