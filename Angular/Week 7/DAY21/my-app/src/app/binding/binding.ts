import { Component , HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binding.html',
  styleUrl: './binding.css'
})
export class Binding {
  username: string = 'Zack';
  title: string = 'Frontend Developer';
  isDisabled: boolean = false;
  bgDark: string = 'bg-dark text-white';
  tagStyle = { fontSize: '24px' };

  sayHello(event?: Event) {
    if (event) {
      console.log('event target: ', event.target);
      console.log('event Details: ', event);
    }
    alert('Hello, ' + this.username + '!');
  }

}
