import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lt-india-erp');

  showSection(sectionId: string, event: Event) {
    event.preventDefault();
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
    
    // Add active class to clicked nav item
    const clickedItem = (event.target as HTMLElement).closest('.nav-item');
    if (clickedItem) {
      clickedItem.classList.add('active');
    }
  }
  
  showMastersTab(tabId: string, event: Event) {
    event.preventDefault();
    
    // Hide all masters content
    const contents = document.querySelectorAll('.masters-content');
    contents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Remove active class from all masters tabs
    const tabs = document.querySelectorAll('.masters-tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Show selected tab content
    const targetContent = document.getElementById(tabId + '-tab');
    if (targetContent) {
      targetContent.classList.add('active');
    }
    
    // Add active class to clicked tab
    const clickedTab = (event.target as HTMLElement).closest('.masters-tab');
    if (clickedTab) {
      clickedTab.classList.add('active');
    }
  }
}
