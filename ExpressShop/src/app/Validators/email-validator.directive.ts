import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:EmailValidatorDirective,
    multi:true,
  },]
})
export class EmailValidatorDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const regex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    const value=control.value as string;
    if(value!==null){
    if(!regex.test(value)){
     return {invalidEmail:true}
    }
  }
    return null;
  }

}
