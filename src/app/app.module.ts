// Angular
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { environment } from '../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Views
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HomeComponent } from './_views/home/home.component';
import { AccountComponent } from './_views/account/account.component';
import { AboutComponent } from './_views/about/about.component';
import { RegisterComponent } from './_views/account/_views/register/register.component';
import { LoginComponent } from './_views/account/_views/login/login.component';
import { ConfigComponent } from './_views/account/_views/config/config.component';
import { FooterComponent } from './_components/footer/footer.component';
import { HeaderComponent } from './_components/header/header.component';
import { RecoverComponent } from './_views/account/_views/recover/recover.component';
import { VerifyComponent } from './_views/account/_views/verify/verify.component';
import { SignoutComponent } from './_views/account/_views/signout/signout.component';
import { TermsAndConditionsComponent } from './_views/terms-and-conditions/terms-and-conditions.component';
import { PoliticsAndPrivacyComponent } from './_views/politics-and-privacy/politics-and-privacy.component';
import { DashboardComponent } from './_views/dashboard/dashboard.component';

// Angular pipes
import { SlugifyPipe } from './_pipes/slugify.pipe';

// Angular directives
import { AutowidthDirective } from './_directives/autowidth.directive';

// Angular Components
import { PasswordCheckerComponent } from './_views/account/_views/register/_components/password-checker/password-checker.component';

// Angular material
import { MatToolbarModule,  } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

// Angular Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import {
  UserService,
  AuthService,
  AuthGuardService
} from './_services';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ConfigComponent,
    FooterComponent,
    HeaderComponent,
    RecoverComponent,
    PasswordCheckerComponent,
    VerifyComponent,
    SignoutComponent,
    TermsAndConditionsComponent,
    PoliticsAndPrivacyComponent,
    DashboardComponent,
    SlugifyPipe,
    AutowidthDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // Material
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,

    // Angular fire
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
