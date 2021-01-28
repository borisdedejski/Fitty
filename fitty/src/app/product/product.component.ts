import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() productName: string;
  //Event Name - Function name
  @Output() productClicked = new EventEmitter();


  constructor(private productsService: ProductsService) {
    this.productName = '';
  }

  ngOnInit(): void {
  }

  onClicked() {
    this.productsService.deleteProduct(this.productName);
  }
}
