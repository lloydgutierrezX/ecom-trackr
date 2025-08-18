import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ItemsComponent } from './pages/items/items.component';
import { authGuard } from './guards/auth/auth.guard';
import { VerifyComponent } from './pages/auth/verify/verify.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'management/categories',
        component: CategoriesComponent
      },
      {
        path: 'management/clients',
        component: ClientsComponent
      },
      {
        path: 'management/items',
        component: ItemsComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
