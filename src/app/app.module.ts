import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { initializeApp,provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAuth,getAuth } from '@angular/fire/auth'
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './account/components/register/register.component';
import { LoginComponent } from './account/components/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
