import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autoTypography]',
  standalone: true
})
export class AutoTypographyDirective implements OnInit {
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const element = this.el.nativeElement;
    const tagName = element.tagName.toLowerCase();
    
    // Automatically apply typography classes based on HTML tag
    switch (tagName) {
      case 'h1':
        this.renderer.addClass(element, 'page-title');
        break;
      case 'h2':
        this.renderer.addClass(element, 'section-header');
        break;
      case 'h3':
        this.renderer.addClass(element, 'subsection-header');
        break;
      case 'h4':
      case 'h5':
      case 'h6':
        this.renderer.addClass(element, 'component-header');
        break;
      case 'p':
        this.renderer.addClass(element, 'body-text');
        break;
      case 'span':
        if (element.classList.contains('secondary')) {
          this.renderer.addClass(element, 'secondary-text');
        } else {
          this.renderer.addClass(element, 'body-text');
        }
        break;
    }
  }
}
