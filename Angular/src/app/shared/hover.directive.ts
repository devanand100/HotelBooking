import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { DataService } from '../services/data.service';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private element:ElementRef,private render:Renderer2, private _dataService:DataService) { }

obj = {offsetLeft:"",offsetWidth:""}
  @HostListener('mouseenter') mouseenter(){
 this.obj.offsetLeft =  this.element.nativeElement.offsetLeft;
 this.obj.offsetWidth = this.element.nativeElement.offsetWidth;
 this._dataService.setObj(this.obj);
  }
}

