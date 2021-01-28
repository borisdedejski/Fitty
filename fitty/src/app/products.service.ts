import { Subject } from 'rxjs';


export class ProductsService {
    private products = ['A Book'];
    productsUpdated = new Subject();

    addProduct(productName: string) {
        this.products.push(productName);
        //To emit products, it will trigger a new fetch
        this.productsUpdated.next();
    }

    getProducts() {
        //Copy of the array to be able to edit from the outside
        //without changing the array above.
        return [...this.products];
    }

    deleteProduct(productName: string) {
        this.products = this.products.filter(p => p !== productName);
        this.productsUpdated.next(); // Inform components interested in it
    }

}
