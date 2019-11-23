import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IBusinessCardTestID } from '../business-card/model/business-card.model';
import { BusinessCardService } from '../business-card/service/business-cards.service';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit {


  private itemsRef: Observable<IBusinessCardTestID[]>;

  constructor(private afs: AngularFirestore, private cardService: BusinessCardService) { }

  ngOnInit() {
    this.itemsRef = this.cardService.getItemRef();
  }



}
