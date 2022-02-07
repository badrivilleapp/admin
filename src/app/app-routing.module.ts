import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './_components/auth/admin-login/admin-login.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  { 
    path: '', 
    // canActivate: [AuthGuard],
    loadChildren: () => import(`./_modules/admin.module`).then(m => m.AdminModule) 
  },
  { path: 'logout', component: AdminLoginComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
