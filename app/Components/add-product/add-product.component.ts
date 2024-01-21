import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addForm!: FormGroup
  Catergories = []
  file: any
  base64: any
  base64Images: string[] = [];
  constructor(private prdservice: ProductsService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.createForm()
    this.getCategories()
  }

  createForm() {
    this.addForm = this.fb.group({
      Title: ["", Validators.required],
      Category: ["",],
      Description: ["", Validators.required],
      Price: ["", Validators.required],
      ID: ["", Validators.required],
      Image: ["", Validators.required]

    })
  }
  Submit() {

    const Model = {
      title: this.addForm.value.Title,
      category: this.addForm.value.Category,
      description: this.addForm.value.Description,
      price: this.addForm.value.Price,
      image: this.base64,
      id: this.addForm.value.ID
    }

    this.prdservice.addProduct(Model).subscribe((res: any) => {
      alert("This Product added Successfuly")
      window.history.back()
    }), (err: any) => {
      console.log(err)
    };


  }
  getimage(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.addForm.get("Image")?.setValue(this.base64)
      this.base64Images.push(this.base64);

    }

  }
  getCategories() {
    this.prdservice.getCatergories().subscribe((res: any) => {
      this.Catergories = res
      console.log(this.Catergories);

    })
  }
}
