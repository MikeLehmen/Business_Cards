import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  private items: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.itemsCollection = this.afs.collection('test');
    this.items = this.itemsCollection.valueChanges(); 
  }

}
