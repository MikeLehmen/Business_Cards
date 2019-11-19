import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IBusinessCardTest } from '../business-card/model/business-card.model';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<IBusinessCardTest>;
  private items: Observable<IBusinessCardTest[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.itemsCollection = this.afs.collection('cards-proto');
    this.items = this.itemsCollection.valueChanges();
  }



}
