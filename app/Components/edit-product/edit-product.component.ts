import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  @Input() products: any[] = []
  Catergories: any[] = []
  prd = []
  editForm!: FormGroup
  base64: any
  ID: any;
  base64Images: string[] = []


  constructor(private prdservice: ProductsService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {

  }
  ngOnInit(): void {
    this.ID = this.route.snapshot.paramMap.get("prdid")
    this.createForm()
    this.getPrdByID(this.ID)
    this.getCatergory()

  }

  getPrdByID(ID: number) {

    this.prdservice.getPrdByID(this.ID).subscribe(res => {
      this.editForm.patchValue({
        Title: res.title,
        Category: res.category,
        Description: res.description,
        Price: res.price,
        ID: res.id,
        Image: res.image
      })
      this.base64 = res.image
    })

  }
  getCatergory() {
    this.prdservice.getCatergories().subscribe((cat: any) => {
      this.Catergories = cat;
      console.log(this.Catergories);



    })
  }
  createForm() {
    this.editForm = this.fb.group({
      Title: ["", Validators.required],
      Category: ["", Validators.required],
      Description: ["", Validators.required],
      Price: ["", Validators.required],
      ID: ["", Validators.required],
      Image: ["", Validators.required]

    })
  }



  getImagePath(item: any) {
    const file = item.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onload = () => {
      this.base64 = reader.result;
      this.base64Images.push(this.base64);
      this.editForm.get("Image")?.setValue(this.base64)

    };
  }
  EditPrd(item: any) {

    this.editForm.patchValue({
      Title: item.title,
      Category: item.category,
      Description: item.description,
      Price: item.price,
      ID: item.id,
      Image: item.image
    })
    this.base64 = item.image

  }
  Submit() {
    const Model = {
      title: this.editForm.value.Title,
      category: this.editForm.value.Category,
      description: this.editForm.value.Description,
      price: this.editForm.value.Price,
      image: this.base64,
      id: this.editForm.value.ID
    }

    this.prdservice.editProduct(Model.id, Model).subscribe((res: any) => {
      alert("This Product added Successfuly")
      window.history.back()
    }), (err: Error) => {
      console.log(err)
    };
  }



}
