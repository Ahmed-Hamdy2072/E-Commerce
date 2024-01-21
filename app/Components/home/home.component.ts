import { Component } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any = []
  Totalprice: number = 0
  constructor(private prdService: ProductsService) {






  }
  ngOnInit(): void {
    this.prdService.getLimitedPrd().subscribe((res) => {
      this.products = res

    })
  }




}
