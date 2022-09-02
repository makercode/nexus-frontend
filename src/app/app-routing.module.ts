import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { AccountComponent } from './account/account.component'
import { ConfigComponent } from './account/components/config/config.component'
import { LoginComponent } from './account/components/login/login.component'
import { RegisterComponent } from './account/components/register/register.component'
import { HomeComponent } from './home/home.component'

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
