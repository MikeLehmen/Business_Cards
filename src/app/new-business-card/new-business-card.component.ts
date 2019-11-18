import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-business-card',
  templateUrl: './new-business-card.component.html',
  styleUrls: ['./new-business-card.component.css']
})
export class NewBusinessCardComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.itemsCollection = this.afs.collection('test');
  }

  // takes whole form so it can reset it
  pushData(form: any): void {
    this.itemsCollection.add({
      f_name: form.value.f_name,
      l_name: form.value.l_name,
      email: form.value.email
    });

    form.reset(); // clear fields
  }

}
