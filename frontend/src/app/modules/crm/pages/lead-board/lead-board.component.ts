import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { MockCrmService } from '../../services/mock-crm.service';
import { Lead, LeadStage, LeadStageMS } from '../../models/lead.model';

@Component({
  selector: 'app-lead-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lead-board.component.html',
  styleUrls: ['./lead-board.component.css']
})
export class LeadBoardComponent implements OnInit, AfterViewInit {
  @ViewChild('boardContainer') boardContainer!: ElementRef<HTMLDivElement>;
  
  leads$!: Observable<Lead[]>;
  leadStages$!: Observable<LeadStageMS[]>;
  draggedLead: Lead | null = null;
  isDragging = false;
  canScrollLeft = false;
  canScrollRight = true;
  
  stages: LeadStage[] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Approval Pending', 'Won', 'Lost', 'On Hold', 'Rejected'];

  constructor(private crm: MockCrmService) {}

  ngOnInit() {
    this.leads$ = this.crm.leads$;
    this.leadStages$ = this.crm.getLeadStages();
  }

  ngAfterViewInit() {
    this.updateScrollButtons();
  }

  scrollLeft() {
    const container = this.boardContainer.nativeElement;
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.boardContainer.nativeElement;
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }

  onScroll() {
    this.updateScrollButtons();
  }

  private updateScrollButtons() {
    const container = this.boardContainer.nativeElement;
    this.canScrollLeft = container.scrollLeft > 0;
    this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
  }

  getLeadsByStage(leads: Lead[], stage: LeadStage): Lead[] {
    return leads.filter(lead => lead.stage === stage);
  }

  getStageCount(stage: LeadStage): Observable<number> {
    const stageMS = this.getStageId(stage);
    return this.leads$.pipe(
      map(leads => leads.filter(lead => lead.stage === stage).length)
    );
  }

  getOverdueCount(stage: LeadStage): Observable<number> {
    return this.leads$.pipe(
      map(leads => {
        const now = new Date();
        return leads.filter(lead => {
          if (lead.stage !== stage || !lead.createdOn) return false;
          const createdDate = new Date(lead.createdOn);
          const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff > 7; // More than 7 days in stage
        }).length;
      })
    );
  }

  getTotalValue(leads: Lead[]): number {
    return leads.reduce((total, lead) => total + (lead.value || 0), 0);
  }

  getAverageValue(leads: Lead[]): number {
    if (leads.length === 0) return 0;
    return this.getTotalValue(leads) / leads.length;
  }

  getDaysInStage(lead: Lead): number {
    if (!lead.createdOn) return 0;
    const now = new Date();
    const createdDate = new Date(lead.createdOn);
    return Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  private getStageId(stage: LeadStage): string {
    const stageMap: Record<LeadStage, string> = {
      'New': 'LS-1',
      'Qualified': 'LS-2',
      'Proposal': 'LS-3',
      'Negotiation': 'LS-4',
      'Approval Pending': 'LS-5',
      'Won': 'LS-6',
      'Lost': 'LS-7',
      'On Hold': 'LS-8',
      'Rejected': 'LS-9'
    };
    return stageMap[stage] || 'LS-1';
  }

  getStageClass(stage: string): string {
    const stageClassMap: Record<string, string> = {
      'New': 'stage-new',
      'Qualified': 'stage-qualified',
      'Proposal': 'stage-proposal',
      'Negotiation': 'stage-negotiation',
      'Approval Pending': 'stage-approval',
      'Won': 'stage-won',
      'Lost': 'stage-lost',
      'On Hold': 'stage-hold',
      'Rejected': 'stage-rejected'
    };
    return stageClassMap[stage] || '';
  }

  // Enhanced Drag and Drop handlers
  onDragStart(event: DragEvent, lead: Lead) {
    this.draggedLead = lead;
    this.isDragging = true;
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/html', lead.id);
    
    // Enhanced visual feedback
    const target = event.target as HTMLElement;
    target.style.opacity = '0.7';
    target.style.transform = 'rotate(5deg) scale(1.02)';
    target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    target.style.zIndex = '1000';
    target.setAttribute('data-dragging', 'true');
  }

  onDragEnd(event: DragEvent) {
    // Reset enhanced visual feedback
    const target = event.target as HTMLElement;
    target.style.opacity = '1';
    target.style.transform = '';
    target.style.boxShadow = '';
    target.style.zIndex = '';
    target.removeAttribute('data-dragging');
    this.draggedLead = null;
    this.isDragging = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    
    // Add hover effect to drop zone
    const target = event.currentTarget as HTMLElement;
    if (target.classList.contains('cards')) {
      target.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
      target.style.border = '2px dashed #0ea5e9';
      target.style.borderRadius = '8px';
    }
  }

  onDragLeave(event: DragEvent) {
    // Remove hover effect from drop zone
    const target = event.currentTarget as HTMLElement;
    if (target.classList.contains('cards')) {
      target.style.background = '';
      target.style.border = '';
      target.style.borderRadius = '';
    }
  }

  onDrop(event: DragEvent, targetStage: LeadStage) {
    event.preventDefault();
    
    // Remove drop zone styling
    const target = event.currentTarget as HTMLElement;
    if (target.classList.contains('cards')) {
      target.style.background = '';
      target.style.border = '';
      target.style.borderRadius = '';
    }
    
    if (this.draggedLead && this.draggedLead.stage !== targetStage) {
      // Update the lead's stage with enhanced feedback
      this.crm.updateLeadStage(this.draggedLead.id, targetStage).subscribe({
        next: (updatedLead) => {
          console.log(`✅ Lead ${updatedLead.id} successfully moved to ${targetStage}`);
          // Could add toast notification here
        },
        error: (error) => {
          console.error('❌ Error updating lead stage:', error);
          // Could add error toast notification here
        }
      });
    }
    
    this.draggedLead = null;
    this.isDragging = false;
  }

  // Enhanced utility methods
  formatCurrency(value: number): string {
    if (value >= 10000000) { // 1 crore
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) { // 1 lakh
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) { // 1 thousand
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value.toLocaleString()}`;
  }

  getStageColor(stageName: string): string {
    const stageColors: { [key: string]: string } = {
      'New': '#3b82f6',
      'Qualified': '#8b5cf6',
      'Proposal': '#f59e0b',
      'Negotiation': '#ef4444',
      'Approval Pending': '#06b6d4'
    };
    return stageColors[stageName] || '#6b7280';
  }

  getPriorityClass(priority?: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  }
}
