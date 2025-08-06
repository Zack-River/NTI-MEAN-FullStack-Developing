import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
onSubmit(form: any) {
    if (form.valid) {
      alert('Thank you for contacting us!');
      form.reset();
    }
  }
}
