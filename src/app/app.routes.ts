import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:Layout,
        canActivate: [authGuard],
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }
];
