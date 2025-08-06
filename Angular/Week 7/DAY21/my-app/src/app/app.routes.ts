import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Binding } from './binding/binding';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'binding',
    component: Binding,
  },
  {
    path: '**',
    redirectTo: ''
  },
];
