import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/Services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
    loginForm=this.fb.group({
      eMail: ["", Validators.required],
      password: ["", Validators.required]
    })
    users: any[] = []
    admins: any[] = []
    constructor(private fb: FormBuilder, private authService: AuthserviceService, private router: Router) {
  
    }
    ngOnInit(): void {
      this.authService.getUsers().subscribe((res: any) => {
        this.users=res

       
      })
    }
    get eMail() {
      return this.loginForm.controls["eMail"];
    }
    get password() {
      return this.loginForm.controls["password"];
    }

  
    Submit() {
     if(this.users.find(x=>x.email==this.loginForm.value.eMail && x.password==this.loginForm.value.password)){
      this.router.navigate(['dashboard'])
     }
  }}

