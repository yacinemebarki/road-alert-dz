import { AddPost } from './add-post/add-post';
import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { AlertPage } from './alert-page/alert-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'signup', component: Signup },
    { path: 'alerts', component: AlertPage },
    { path: 'add-post', component: AddPost },
    { path: 'admin-dashboard', component: AdminDashboard}
];
