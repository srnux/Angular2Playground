import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[popup]'
})
export class PopupDirective {
  private _defaultColor = 'red';
  constructor(private el: ElementRef) { }
  @Input() set defaultColor(colorName: string){
    this._defaultColor = colorName || this._defaultColor;
  }
  @Input('myHighlight') highlightColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this._defaultColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  private highlight(color: string) {
    this.el.nativeElement
    this.el.nativeElement.style.backgroundColor = color;
  }
}
