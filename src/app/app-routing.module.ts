import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './login/login.guard';
import { NewBusinessCardComponent } from './new-business-card/new-business-card.component';
import { SearchBusinessCardsComponent } from './search-business-cards/search-business-cards.component';

const dashboardChildRoutes: Routes = [
  { path: 'new', component: NewBusinessCardComponent },
  { path: 'search', component: SearchBusinessCardsComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' } 
]

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    children: dashboardChildRoutes
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
  // not found path goes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
