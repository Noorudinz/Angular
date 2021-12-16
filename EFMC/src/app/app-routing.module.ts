import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PriceFactorComponent } from './price-factor/price-factor.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'building',
    loadChildren: () => import('./building-master/building.module').then(m => m.BuildingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'flat-owners',
    loadChildren: () => import('./flat-owners/flat-owners.module').then(m => m.FlatOwnerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'import-files',
    loadChildren: () => import('./import-files/import-files.module').then(m => m.ImportFilesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'price-factor',
    component: PriceFactorComponent
  },
  {
    path: 'email-setting',
    component: EmailSettingComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
