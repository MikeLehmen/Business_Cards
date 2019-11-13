import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.afAuth.user.pipe(
            take(1),
            map( (user) => !!user),
            tap( (loggedIn) => {
                if (!loggedIn) {
                    this.router.navigate(['login']);
                }
            })
        );
    }
}