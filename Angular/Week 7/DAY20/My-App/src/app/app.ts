import { Component } from '@angular/core';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Navbar } from './navbar/navbar'; // If you have a navbar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Contact, Navbar],
  template: `
    <app-navbar
      (showHome)="activePage = 'home'"
      (showContact)="activePage = 'contact'">
    </app-navbar>

    <app-home *ngIf="activePage === 'home'"></app-home>
    <app-contact *ngIf="activePage === 'contact'"></app-contact>
  `,
})
export class App {
  activePage = 'home';
}
