import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-truck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-truck.component.html',
  styleUrls: ['./loading-truck.component.scss']
})
export class LoadingTruckComponent {
  /** Size in px of the SVG viewBox scaled output (width & height). */
  @Input() size = 96;

  /**
   * Speed multiplier (1 = default, 2 = twice as fast, 0.5 = slower).
   * Affects both the truck slide and wheel spin.
   */
  @Input() speed = 1;

  /** Optional: aria-label text for screen readers */
  @Input() label = 'Loading…';

  get styleVars() {
    const baseSlide = 1.4; // seconds
    const baseSpin = 0.7;  // seconds
    const baseLines = 1.2; // seconds
    return {
      '--loader-size': `${this.size}px`,
      '--truck-slide-s': `${(baseSlide / this.speed).toFixed(3)}s`,
      '--wheel-spin-s': `${(baseSpin / this.speed).toFixed(3)}s`,
      '--lines-s': `${(baseLines / this.speed).toFixed(3)}s`
    } as any;
  }
}