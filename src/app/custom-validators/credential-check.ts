import { FormGroup} from '@angular/forms';

export function credentialChecker(controlName: string) {
    return (formGroup: FormGroup) => {
        const credential = formGroup.controls[controlName]

        if (/^\d+$/.test(credential.value)) {
            if (credential.value.length == 10) {
                credential.setErrors(null)
            } else {
                credential.setErrors({ 'validPhone': true })
            }
        } else if (/^[a-zA-Z0-9]+$/.test(credential.value)) {
            if (credential.value.length >= 5) {
                if (/(gmail|com|email)/i.test(credential.value)) {
                    credential.setErrors({ 'validEmail': true })
                } else {
                    credential.setErrors(null)
                }
            } else {
                credential.setErrors({ 'validUsername': true })
            }
        } else {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.value)) {
                    credential.setErrors(null)
            } else {
                credential.setErrors({ 'validEmail': true })
            }
        }
    }
}