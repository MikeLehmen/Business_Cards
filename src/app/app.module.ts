import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';

// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// webcam
import { WebcamModule } from './webcam/webcam.module';

// http
import { HttpClientModule } from '@angular/common/http';

import { NewBusinessCardComponent } from './new-business-card/new-business-card.component';
import { SearchBusinessCardsComponent } from './search-business-cards/search-business-cards.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BusinessCardService } from './business-card/service/business-cards.service';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NewBusinessCardComponent,
    SearchBusinessCardsComponent,
    BusinessCardComponent,
    BusinessCardListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    BusinessCardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
