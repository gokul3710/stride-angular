import { FormGroup } from '@angular/forms'

export function passwordChecker (controlName: string , compareControlName: string){
    return (formGroup: FormGroup)=>{
        const password = formGroup.controls[controlName]
        const confirmPassword = formGroup.controls[compareControlName]
        if((password.value as string).trim().length < 8){
            password.setErrors({'minlength' : true})
        }
        if(password.value != confirmPassword.value){
            confirmPassword.setErrors({'mustMatch': true})
        }else{
            confirmPassword.setErrors(null)
        }
    }
}