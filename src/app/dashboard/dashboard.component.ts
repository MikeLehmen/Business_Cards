import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) {

  }

  ngOnInit() {

  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

}
