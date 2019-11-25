import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IBusinessCardID } from '../business-card/model/business-card.model';
import { BusinessCardService } from '../business-card/service/business-cards.service';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit {
  private foundCards: IBusinessCardID[];
  private searchByModel: string;
  private searchHit: boolean;

  private itemsRef: Observable<IBusinessCardID[]>;

  constructor(private afs: AngularFirestore, private cardService: BusinessCardService) { 
    this.foundCards = [];
    this.searchHit = true;
    this.searchByModel = "f_name";
  }

  ngOnInit() {
    this.itemsRef = this.cardService.getItemRef();
  }

  clearCards() : void {
    // searchHit flag still true, prevents miss message from showing
    this.foundCards = [];
  }

  search(form: any) {

    this.foundCards = [];

    var result = this.cardService.search(this.searchByModel, form.value.searchTerm);

    result.get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        this.searchHit = false;
      }
      else {
        this.searchHit = true;
        querySnapshot.forEach( (doc) => {

          const data = doc.data();

          const card : IBusinessCardID = {
            f_name : data.f_name,
            l_name : data.l_name,
            email : data.email,
            phone_number : data.phone_number,
            misc_text : data.misc_text,
            image : data.image,
            id: doc.id
          };

          this.foundCards.push(card);
        }) 
      }
    }).catch( (error) => {
        console.log(error);
    });

  }
  
  
}
