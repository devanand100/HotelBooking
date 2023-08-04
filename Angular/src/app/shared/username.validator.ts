import { AbstractControl } from "@angular/forms";

export function ValidateUsername(control:AbstractControl) : any{
    if(control.value == "admin"){
        return {falsename:true}
    }
    return null;
}