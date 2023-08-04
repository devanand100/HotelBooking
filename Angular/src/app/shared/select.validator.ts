import { AbstractControl } from "@angular/forms";

export function selectValidator(control:AbstractControl){
    const category = control.get('category');
   

     if( category?.pristine )
        return null

        if(control.value == 0)
         return {wrong : true}

    return null ;
}
