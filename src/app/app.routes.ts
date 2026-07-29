import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { AlertPage } from './alert-page/alert-page';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'signup', component: Signup },
    { path: 'alerts', component: AlertPage }
];
