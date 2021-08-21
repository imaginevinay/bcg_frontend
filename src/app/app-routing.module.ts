import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { PolicyCentreComponent } from './components/pages/policy-centre/policy-centre.component';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardComponent    
  },
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch: 'full'
  },
  {
    path : 'policies',
    component : PolicyCentreComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
