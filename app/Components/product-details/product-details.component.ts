import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  ID: any
  product: any
  Quantity: number = 1
  prdAdd: any
  CartOfPrd: any[] = []
  constructor(private route: ActivatedRoute, private router: Router, private prdService: ProductsService) {
    this.ID = this.route.snapshot.paramMap.get("pid")
    console.log(this.ID);


  }
  ngOnInit(): void {
    this.getSinglePrd(this.ID)
  }
  addToCart() {
    this.prdAdd = { item: this.product, quantity: this.Quantity }
    if ("cart" in localStorage) {
      this.CartOfPrd = JSON.parse(localStorage.getItem("cart")!)
      let existItem = this.CartOfPrd.find(item => item.item.id == this.ID)
      if (existItem) { alert("This product is already exist.") } else {
        this.CartOfPrd.push(this.prdAdd)
        localStorage.setItem("cart", JSON.stringify(this.CartOfPrd))
      }
    } else {
      this.CartOfPrd.push(this.prdAdd)
      localStorage.setItem("cart", JSON.stringify(this.CartOfPrd))
    }
  }

  getSinglePrd(pid: number) {

    this.prdService.getPrdByID(pid).subscribe(res => {
      this.product = res
      console.log(this.product);

    })

  }



}
