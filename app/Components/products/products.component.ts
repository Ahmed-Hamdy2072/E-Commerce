import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: IProduct[] = []
  Catergories: any = []
  loading: boolean = false
  CartOfPrd: any[] = []

  constructor(private prdservice: ProductsService, private router: Router) {

  }
  ngOnInit(): void {
    this.getProducts()
    this.getCatergory()
  }

  getProducts() {
    this.loading = true
    this.prdservice.getAllProduct().subscribe((prd: any) => {
      this.products = prd;
      this.loading = false
    })
  }
  getCatergory() {
    this.loading = true
    this.prdservice.getCatergories().subscribe((cat: any) => {
      this.Catergories = cat;

      this.loading = false

    })
  }

  FilterCat(event: any) {
    let catValue = event.target.value;
    (catValue == "0") ? this.getProducts() : this.getPrdByCat(catValue)
  }
  getPrdByCat(cID: string) {
    this.loading = true
    this.prdservice.getPrdByCatID(cID).subscribe((prd: any) => {
      this.products = prd
      this.loading = false
    });
  }
  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.CartOfPrd = JSON.parse(localStorage.getItem("cart")!)
      let existItem = this.CartOfPrd.findIndex(item => item.item.id === event.id)
      if (existItem==-1) { alert("This product is already exist.") } else {


      }
    } else {
      this.CartOfPrd.push(event)
      localStorage.setItem("cart", JSON.stringify(this.CartOfPrd))
    }



  }



}
