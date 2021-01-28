import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
    productName = 'A Book';
    isDisabled = true;
    products = [''];
    private productsSubscription: Subscription;

    //With private we store it in a class property (shorthand)
    constructor(private productsService: ProductsService) {
        this.productsSubscription = new Subscription();
    }

    ngOnInit() {
        this.products = this.productsService.getProducts();

        //Fetch products again like componentWillUpdate in React
        this.productsSubscription = this.productsService.productsUpdated.subscribe(()=> {
            this.products = this.productsService.getProducts();
        });
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }

    onAddProduct(form: any) {
        if (form.valid) {
            this.productsService.addProduct(form.value.productName)
        }
    }

    onRemoveProduct(productName: string) {
        this.products = this.products.filter(p => p !== productName);
    }
}
