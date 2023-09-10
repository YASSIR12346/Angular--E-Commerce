import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:NumberValidatorDirective,
    multi:true,
  },]
})
export class NumberValidatorDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const regex = RegExp('^[0-9]{10}$');
    const value=control.value as string;
    if(value!==null){
    if(!regex.test(value)){
     return {invalidNumber:true}
    }
  }
    return null;
  }
 

}
