import { Component, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RightDrawerComponent } from '../drawer/right-drawer.component';

interface ActivityIcon {
  icon: string;
  type: 'call' | 'email' | 'document';
  tooltip: string;
  date: Date;
}

interface KanbanCard {
  id: string;
  title: string;
  company: string;
  value: number;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  daysInStage: number;
  contactName: string;
  email: string;
  phone: string;
  stage: string;
  probability: number;
  temperature: 'hot' | 'warm' | 'cold';
  source: string;
  expectedClose: string;
  notes: string;
  activities?: ActivityIcon[];
}

interface NewCardForm {
  title: string;
  company: string;
  value: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface ColumnMetrics {
  count: number;
  totalValue: number;
  avgProbability: number;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, RightDrawerComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit {
  isDrawerOpen = false;
  selectedCard: KanbanCard | null = null;
  isCompactMode = false;
  showAddFormFor: string | null = null;
  newCardForm: NewCardForm = { title: '', company: '', value: 0 };

  private cardIdCounter = 11;

  private generateMockActivities(): ActivityIcon[] {
    const activities: ActivityIcon[] = [
      { icon: '📞', type: 'call', tooltip: 'Last call: 2 days ago', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { icon: '📧', type: 'email', tooltip: 'Email sent: 1 day ago', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { icon: '📑', type: 'document', tooltip: 'Document shared: 3 hours ago', date: new Date(Date.now() - 3 * 60 * 60 * 1000) }
    ];
    return activities.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  columns: KanbanColumn[] = [
    {
      id: 'prospect',
      title: 'Prospect',
      cards: [
        {
          id: '1',
          title: 'Import/Export Services',
          company: 'Global Logistics Ltd',
          value: 45000,
          owner: 'John Smith',
          priority: 'high',
          daysInStage: 3,
          contactName: 'Michael Johnson',
          email: 'michael@globallogistics.com',
          phone: '+1-555-0123',
          stage: 'Prospect',
          probability: 25,
          temperature: 'warm',
          source: 'Website',
          expectedClose: '2024-03-15',
          notes: 'Interested in our container shipping services for their Asia-Pacific routes.'
        },
        {
          id: '2',
          title: 'Customs Clearance',
          company: 'Trade Solutions Inc',
          value: 28000,
          owner: 'Sarah Johnson',
          priority: 'medium',
          daysInStage: 1,
          contactName: 'Emily Davis',
          email: 'emily@tradesolutions.com',
          phone: '+1-555-0124',
          stage: 'Prospect',
          probability: 20,
          temperature: 'cold',
          source: 'Referral',
          expectedClose: '2024-04-01',
          notes: 'Need detailed quote for monthly customs processing services.'
        }
      ]
    },
    {
      id: 'qualified',
      title: 'Qualified',
      cards: [
        {
          id: '4',
          title: 'Warehousing Solutions',
          company: 'Storage Plus LLC',
          value: 65000,
          owner: 'Maria Garcia',
          priority: 'high',
          daysInStage: 2,
          contactName: 'Lisa Anderson',
          email: 'lisa@storageplus.com',
          phone: '+1-555-0126',
          stage: 'Qualified',
          probability: 45,
          temperature: 'hot',
          source: 'Website',
          expectedClose: '2024-03-20',
          notes: 'Qualified lead. Need 50,000 sq ft warehouse space with climate control.'
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.columns.forEach(column => {
      column.cards.forEach(card => {
        if (!card.activities) {
          card.activities = this.generateMockActivities();
        }
      });
    });
  }

  onCardClick(card: KanbanCard): void {
    this.selectedCard = card;
    this.isDrawerOpen = true;
  }

  onDrawerClose(): void {
    this.isDrawerOpen = false;
    this.selectedCard = null;
  }

  onCardUpdate(updatedData: any): void {
    for (const column of this.columns) {
      const cardIndex = column.cards.findIndex(card => card.id === updatedData.id);
      if (cardIndex !== -1) {
        column.cards[cardIndex] = { 
          ...column.cards[cardIndex], 
          ...updatedData,
          activities: column.cards[cardIndex].activities || []
        };
        break;
      }
    }
  }

  getOwnerInitials(owner: string): string {
    return owner.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  toggleCompactMode(checked: boolean): void {
    this.isCompactMode = checked;
  }

  showAddForm(columnId: string): void {
    this.showAddFormFor = columnId;
    this.newCardForm = { title: '', company: '', value: 0 };
  }

  hideAddForm(): void {
    this.showAddFormFor = null;
  }

  isAddFormValid(): boolean {
    return this.newCardForm.title.trim().length > 0 && 
           this.newCardForm.company.trim().length > 0;
  }

  addCard(columnId: string): void {
    if (!this.isAddFormValid()) return;

    const column = this.columns.find(col => col.id === columnId);
    if (!column) return;

    const newCard: KanbanCard = {
      id: (this.cardIdCounter++).toString(),
      title: this.newCardForm.title.trim(),
      company: this.newCardForm.company.trim(),
      value: this.newCardForm.value || 0,
      owner: 'Current User',
      priority: 'medium',
      daysInStage: 0,
      contactName: '',
      email: '',
      phone: '',
      stage: column.title,
      probability: this.getDefaultProbability(columnId),
      temperature: 'cold',
      source: 'Manual Entry',
      expectedClose: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: '',
      activities: []
    };

    column.cards.unshift(newCard);
    this.hideAddForm();
  }

  private getDefaultProbability(columnId: string): number {
    const probabilities: { [key: string]: number } = {
      'prospect': 20,
      'qualified': 40,
      'proposal': 60,
      'negotiation': 80,
      'closed-won': 100,
      'closed-lost': 0
    };
    return probabilities[columnId] || 20;
  }

  getActivityTooltip(activity: ActivityIcon): string {
    return activity.tooltip;
  }

  // Column metrics calculations
  getColumnMetrics(column: KanbanColumn): ColumnMetrics {
    const count = column.cards.length;
    const totalValue = column.cards.reduce((sum, card) => sum + card.value, 0);
    const avgProbability = count > 0 ? 
      column.cards.reduce((sum, card) => sum + card.probability, 0) / count : 0;
    
    return { count, totalValue, avgProbability };
  }

  formatPercentage(value: number): string {
    return `${Math.round(value)}%`;
  }

  // Drag and Drop functionality
  onDragStart(event: DragEvent, card: KanbanCard): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', JSON.stringify({
        cardId: card.id,
        sourceColumn: card.stage
      }));
      event.dataTransfer.effectAllowed = 'move';
      
      // Add visual feedback
      const target = event.target as HTMLElement;
      target.classList.add('drag-preview');
      
      // Clean up after a short delay
      setTimeout(() => {
        target.classList.remove('drag-preview');
      }, 0);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    
    // Add visual feedback to column
    const target = event.currentTarget as HTMLElement;
    const content = target.querySelector('.kanban__column-content');
    if (content) {
      content.classList.add('drag-over');
    }
  }

  onDragLeave(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    const content = target.querySelector('.kanban__column-content');
    if (content) {
      content.classList.remove('drag-over');
    }
  }

  onDrop(event: DragEvent, targetColumn: KanbanColumn): void {
    event.preventDefault();
    
    // Remove visual feedback
    const target = event.currentTarget as HTMLElement;
    const content = target.querySelector('.kanban__column-content');
    if (content) {
      content.classList.remove('drag-over');
    }
    
    const data = event.dataTransfer?.getData('text/plain');
    if (!data) return;

    const { cardId, sourceColumn } = JSON.parse(data);
    
    // Don't move if dropping in same column
    if (sourceColumn === targetColumn.title) return;
    
    // Find source column and card
    const sourceCol = this.columns.find(col => col.title === sourceColumn);
    if (!sourceCol) return;

    const cardIndex = sourceCol.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;

    // Move card to target column
    const card = sourceCol.cards.splice(cardIndex, 1)[0];
    card.stage = targetColumn.title;
    targetColumn.cards.push(card);
    
    // Update probability based on stage
    this.updateCardProbabilityForStage(card, targetColumn.id);
  }

  private updateCardProbabilityForStage(card: KanbanCard, stageId: string): void {
    const stageProbabilities: { [key: string]: number } = {
      'prospect': 20,
      'qualified': 40,
      'proposal': 60,
      'negotiation': 80,
      'closed-won': 100,
      'closed-lost': 0
    };
    
    if (stageProbabilities[stageId] !== undefined) {
      card.probability = stageProbabilities[stageId];
    }
  }

  onCardKeyDown(event: KeyboardEvent, card: KanbanCard): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onCardClick(card);
    }
  }

  onAddFormKeyDown(event: KeyboardEvent, columnId: string): void {
    if (event.key === 'Enter' && this.isAddFormValid()) {
      event.preventDefault();
      this.addCard(columnId);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.hideAddForm();
    }
  }
}
