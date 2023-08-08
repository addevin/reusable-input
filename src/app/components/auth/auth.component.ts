import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  preFormInputEvent,
  preFormInputOptions,
} from '../elemets/input/input.component';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  formData = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
  });
  customErr: { [key: string]: string | null } = {
    name: null,
    username: null,
    password: null,
    repassword: null,
  };
  formControlOptions: { [key: string]: preFormInputOptions } = {
    name: {
      value:'sdf',
      type: 'text',
      placeholder: 'Enter your name',
      validation: {
        required: { state: false, message: 'Please fill this required input!' },
        minLength: {
          state: 5,
          message: 'Must contain minimum of 5 characters!',
        },
        pattern: {
          state: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}',
          message: 'Must be a valid email!',
        },
      },
    },
    username: {
      type: 'text',
      placeholder: 'Enter new username',
      validation: {
        required: { state: false, message: 'Please fill this required input!' },
        minLength: {
          state: 4,
          message: 'Must contain minimum of 5 characters!',
        },
        pattern: {
          state: '[a-z0-9._]+',
          message: 'username can only contain underscore [ _ ], dot [.], numbers, letters [a-z]!',
        },
      },
    },
    password: {
      type: 'password',
      placeholder: 'Enter Password',
      validation: {
        required: { state: false, message: 'Please fill this required input!' },
        minLength: {
          state: 5,
          message: 'Must contain minimum of 5 characters!',
        },
      },
    },
  };
  success_message:string|null = null
  isFormValid:{ [key: string]: boolean } ={}
  gotNewValue(event: preFormInputEvent, controllerName: string) {
    (
      (this.formData.controls as { [key: string]: any })[
        controllerName
      ] as FormControl
    ).setValue(event.value);
    this.customErr['name'] = null;
    this.customErr['password'] = null;
    this.isFormValid[controllerName] = event.isValid;
  }
  doSubmit() {
    setTimeout(() => {
      if(this.formData.value['password']!=this.formData.value['repassword']){
        this.customErr['password'] = "Password didn't match, try again later...";
      }else{
        console.log('sdfsdfsdf');
        if((Object.values(this.isFormValid)).reduce(
          (acc,curr)=>{
            console.log(curr);
            return (acc==false)?false:((!curr)?false:true);
          }, 
          true
        ))
        {
          this.success_message = 'Inputs are saved, Values are: '+JSON.stringify(this.formData.value)
        }else{
          console.log('form is invalid', (Object.keys(this.isFormValid as object).reduce(
            (acc,curr)=>{
              console.log(curr);
              return (acc==false)?false:((!curr)?false:true);
            }, 
            true
          )));
        }
      }
    }, 1000);
  }
}
