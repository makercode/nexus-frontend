import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './_views/about/about.component'
import { AccountComponent } from './_views/account/account.component'
import { ConfigComponent } from './_views/account/_views/config/config.component'
import { HomeComponent } from './_views/home/home.component'
import { LoginComponent } from './_views/account/_views/login/login.component'
import { RecoverComponent } from './_views/account/_views/recover/recover.component'
import { RegisterComponent } from './_views/account/_views/register/register.component'
import { SignoutComponent } from './_views/account/_views/signout/signout.component'
import { VerifyComponent } from './_views/account/_views/verify/verify.component'

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'cuenta', 
    component: AccountComponent,
    children: [
      {
        path: 'registrate', 
        component: RegisterComponent
      },
      {
        path: 'ingresa', 
        component: LoginComponent
      },
      {
        path: 'configuracion', 
        component: ConfigComponent
      },
      {
        path: 'recupera', 
        component: RecoverComponent
      },
      {
        path: 'verificame', 
        component: VerifyComponent
      },
      {
        path: 'salir', 
        component: SignoutComponent
      },
    ]
  },
  {
    path: 'acerca', 
    component: AboutComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
