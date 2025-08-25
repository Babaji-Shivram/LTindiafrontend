import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  imports: [CommonModule],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LT India ERP');
  
  activeSection = 'dashboard';
  activeMastersTab = 'parties';

  showSection(sectionId: string, event: Event) {
    event.preventDefault();
    this.activeSection = sectionId;
  }
  
  showMastersTab(tabId: string, event: Event) {
    event.preventDefault();
    this.activeMastersTab = tabId;
  }
}