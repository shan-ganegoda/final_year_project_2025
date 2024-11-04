import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  }

  constructor(private fb:FormBuilder){
    this.authForm = this.fb.group({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
    });
  }

  submitForm(){
    console.log(this.authForm.value);
  }

}
