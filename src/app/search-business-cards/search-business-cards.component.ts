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
  private foundCards: IBusinessCardTestID[];
  private searchByModel: string;
  private searchHit: boolean;

  private itemsRef: Observable<IBusinessCardTestID[]>;

  constructor(private afs: AngularFirestore, private cardService: BusinessCardService) { 
    this.foundCards = [];
    this.searchHit = true;
    this.searchByModel = "f_name";
  }

  ngOnInit() {
    this.itemsRef = this.cardService.getItemRef();
  }

  search(form: any) {
    console.log(this.searchByModel);
    console.log(form.value.searchTerm);

    this.foundCards = [];

    var result = this.cardService.search(this.searchByModel, form.value.searchTerm);
    console.log(result.get());

    result.get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        this.searchHit = false;
      }
      else {
        this.searchHit = true;
        querySnapshot.forEach( (doc) => {

          const data = doc.data();

          const card : IBusinessCardTestID = {
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
