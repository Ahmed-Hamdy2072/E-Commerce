import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  Exist: boolean = true;
  total: number = 0;

  constructor(private cdr: ChangeDetectorRef) {} // Inject ChangeDetectorRef

  ngOnChanges(changes: SimpleChanges): void {
    this.getCartPrd();
  }

  ngOnInit(): void {
    this.getCartPrd();
  }

  getCartPrd() {
    if ("cart" in localStorage) {
      this.Exist = false;
      this.cart = JSON.parse(localStorage.getItem("cart")!);
      this.getTotal();
    } else {
      this.Exist = true;
      this.cart = [];
    }
  }

  deductAmount(index: number) {
    this.cart[index].quantity--;
    this.updateTotalAndStorage();
  }

  addAmount(index: number) {
    this.cart[index].quantity++;
    this.updateTotalAndStorage();
  }

  delPrd(index: number) {
    this.cart.splice(index, 1);
    this.updateTotalAndStorage();
  }

  updateTotalAndStorage() {
    this.getTotal(); // Calculate total
    localStorage.setItem("cart", JSON.stringify(this.cart)); // Update storage
    this.cdr.detectChanges(); // Ensure view updates
  }

  getTotal() {
    this.total = 0; // Reset total before calculation
    for (let i in this.cart) {
      this.total += this.cart[i].item.price * this.cart[i].quantity;
    }
  }
}
