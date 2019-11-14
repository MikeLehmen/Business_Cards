import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  private items: Observable<any>;   // don't forget to unsub in destroy!

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.itemsCollection = this.afs.collection('test');
    this.items = this.itemsCollection.valueChanges(); 
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  // takes whole form so it can reset it
  stubPush(form: any): void {
    this.itemsCollection.add({ 
      f_name: form.value.f_name,
      l_name: form.value.l_name,
      email: form.value.email
    });

    form.reset();   // clear fields
  }

}
