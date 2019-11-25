import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  constructor(private afAuth : AngularFireAuth) {

  }

  ngOnDestroy() {
    this.afAuth.auth.signOut();
  }
}
