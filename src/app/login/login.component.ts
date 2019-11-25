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
  //authObservable: Observable<any>;

  private user_account_error: boolean;
  private incorrect_password_error: boolean;
  private invalid_email_error: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router) { 
   // this.authObservable = afAuth.user;
    // this.authObserver = this.authObservable.subscribe(function() {
    //                                           router.navigate(['dashboard']);
    //                                         });
    this.user_account_error = false;
    this.incorrect_password_error = false;
    this.invalid_email_error = false;

    console.log(this.user_account_error);
  }

  onSubmit(form: any) {
    this.login(form.userName, form.pw);
  }

  login(user: string, pass: string) {
    this.clearErrors();

    let true_this = this;

    this.afAuth.auth.signInWithEmailAndPassword(user, pass).then(() => this.router.navigate(['dashboard']))
      .catch( function(error) {
        console.log(error);
        if (error.code == 'auth/user-not-found') {
          console.log("No User Account Exists");
          true_this.user_account_error = true;
        }
        else if (error.code == 'auth/wrong-password') {
          console.log("Incorrect Password");
          true_this.incorrect_password_error = true;
        }
        else if (error.code == 'auth/invalid-email') {
          console.log("Invalid email");
          true_this.invalid_email_error = true;
        }
        else {
          console.log(error);
        }
      });
  }

  private clearErrors(): void {
    this.user_account_error = false;
    this.incorrect_password_error = false;
    this.invalid_email_error = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //this.authObserver.unsubscribe();
  }

}
