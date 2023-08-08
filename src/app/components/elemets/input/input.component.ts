import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm, NgModel, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'pre-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnChanges {
  @Input('inputOptions')inputOptions?:preFormInputOptions;
  @Input('customErr')customErr?:string|null
  @Output('value') inpValueEvent:EventEmitter<preFormInputEvent> = new EventEmitter()
  @ViewChild('formInput', {static:true})formInput?:NgModel  
  @ViewChild('formInput', {static:true, read:ElementRef})formInputRef?: ElementRef<HTMLInputElement>
  constructor(){}
  inputType = 'password'
  inputData = ''

  ngOnChanges(changes: SimpleChanges): void {
    this.inputData = this.inputOptions?.value??''
  }
  passData(){
    this.inpValueEvent.emit({isValid:(this.formInput as NgModel)?.valid??false, value:(this.formInput as NgModel)?.value, errors:(this.formInput as NgModel)?.errors})
  }
  passwordToggle(){
    this.inputType = this.inputType=='password'?'text':'password';
    this.doFocus()
  }
  doFocus(){
    (this.formInputRef as ElementRef<HTMLInputElement>).nativeElement?.focus()
  }
}


export interface preFormInputEvent{isValid:boolean, value:string, errors:ValidationErrors | null | undefined}
export interface preFormInputOptions{
  type:'text'|'password',
  value?:string,
  placeholder?:string,
  validation?:{
    required?:{
      state:boolean|'true'|'false',
      message?:string
    }, 
    minLength?:{
      state:number|string,
      message?:string
    }, 
    maxLength?:{
      state:number|string,
      message?:string
    }, 
    pattern?:{
      state:string,
      message?:string
    }, 
  }

  
}