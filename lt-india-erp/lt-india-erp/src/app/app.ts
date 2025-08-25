import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule]
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