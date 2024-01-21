import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/Services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm=this.fb.group({
    Name: ["", Validators.required],
    eMail: ["", Validators.required],
    password: ["", Validators.required],
})
  constructor(private authService: AuthserviceService, private router: Router,private fb:FormBuilder) {
    
  }
  ngOnInit(): void {
     
  }
  get Name() {
    return this.registerForm.controls["Name"];
  }
  get eMail() {
    return this.registerForm.controls["eMail"];
  }
  get password() {
    return this.registerForm.controls["password"];
  }

  Submit(){
    this.authService.register(this.registerForm.value).subscribe((res:any)=>{
      this.registerForm.reset()
      this.router.navigate(['/login']);
    },err=>{
      alert("Something went wrong")
    })
  }


  
}
