import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './_views/about/about.component'
import { AccountComponent } from './_views/account/account.component'
import { ConfigComponent } from './_views/account/components/config/config.component'
import { LoginComponent } from './_views/account/components/login/login.component'
import { RegisterComponent } from './_views/account/components/register/register.component'
import { HomeComponent } from './_views/home/home.component'

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
