import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/service/auth/auth.service";
import {StorageService} from "../../core/service/auth/storage.service";
import {ToastService} from "../../core/util/toast.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  authForm:FormGroup;

  ngOnInit(): void {
    if(this.ss.isLoggedIn()){
      //window.alert("User Already Logged In,if you need to log in again please log Out First!");
      this.router.navigateByUrl('/main/home');
    }
  }

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private as:AuthService,
    private ss:StorageService,
    private tst:ToastService
  ){
    this.authForm = this.fb.group({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
    });
  }

  submitForm(){
    if(this.authForm.valid){

      const {username, password} = this.authForm.value;

      this.as.login(username,password).subscribe({
        next:(data:any) => {
          this.router.navigateByUrl('/main/home');
          this.authForm.reset();
        },
        error: (error:any) => {
          console.log(error);
          this.tst.handleResult("failed","Invalid Email And Password!");
        }
      })
    }else{
      this.tst.handleResult("Failed","Invalid Email And Password!");
    }
  }

}
