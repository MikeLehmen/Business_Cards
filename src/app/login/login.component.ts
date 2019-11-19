import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // also try this just using a promise, might be cleaner
  // this observable emits more than I'd like, promise would fix
  authObservable: Observable<any>;
  //authObserver: any; 

  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    this.authObservable = afAuth.user;
    // this.authObserver = this.authObservable.subscribe(function() {
    //                                           router.navigate(['dashboard']);
    //                                         });
    
  }

  onSubmit(form: any) {
    this.login(form.userName, form.pw);
  }

  login(user: string, pass: string) {
    this.afAuth.auth.signInWithEmailAndPassword(user, pass).then(() => this.router.navigate(['dashboard']))
      .catch( function(error) {
        console.log(error);
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //this.authObserver.unsubscribe();
  }

}
