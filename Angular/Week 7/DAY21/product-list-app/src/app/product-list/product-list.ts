import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id : number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { rate: number; count: number },
  tags: string[],
  isFeatured: boolean
}

@Component({
  selector: 'app-product-list',
  imports: [FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})

export class ProductListComponent {
  filterKeyword: string = '';

  products: Product[] = [];

  ngOnInit() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        this.products = data;
      })
      .catch(err => console.error('Error fetching products:', err));
  }

  getColor(rate: number) {
    if (rate >= 4) return 'green';
    if (rate >= 3) return 'orange';
    return 'red';
  }
}
