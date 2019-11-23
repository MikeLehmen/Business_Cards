import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BusinessCardService } from '../business-card/service/business-cards.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private cardsService: BusinessCardService) {
    
  }

  ngOnInit() {

  }

  logout(): void {
    this.afAuth.auth.signOut().then(() =>  this.router.navigate(['login']) ).catch((err) => console.log(err));
  }

}
