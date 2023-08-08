import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconStore } from './icons.store';

@Directive({
  selector: '[appIcons]'
})
export class IconsDirective implements OnChanges{
  @Input('appIcons')appIcons?:{name:string, w:string, h:string}
  constructor(private elRef:ElementRef, private icons:IconStore) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.appIcons){
      (this.elRef.nativeElement as HTMLElement).innerHTML = this.icons.getIcon(this.appIcons.name,this.appIcons.w, this.appIcons.h)
    }
  }
}
