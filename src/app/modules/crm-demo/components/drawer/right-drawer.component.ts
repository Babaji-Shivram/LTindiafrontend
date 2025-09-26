import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DrawerData {
  id: string;
  title: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  stage: string;
  value: number;
  probability: number;
  priority: 'low' | 'medium' | 'high';
  temperature: 'cold' | 'warm' | 'hot';
  owner: string;
  source: string;
  expectedClose: string;
  notes: string;
  daysInStage: number;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description: string;
  date: Date;
  user: string;
  status?: 'completed' | 'pending' | 'overdue';
}

interface QualificationCriteria {
  id: string;
  name: string;
  description: string;
  status: 'met' | 'not-met' | 'partial';
  required: boolean;
  score: number;
  maxScore: number;
}

interface ShippingDocument {
  id: string;
  name: string;
  status: 'missing' | 'uploaded' | 'verified' | 'expiring';
  uploadedDate?: Date;
  expiryDate?: Date;
  required: boolean;
}

interface Enquiry {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'open' | 'responded' | 'closed';
  value?: number;
}

interface Quote {
  id: string;
  title: string;
  value: number;
  date: Date;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  validUntil: Date;
}

interface ApprovalRule {
  id: string;
  type: 'value' | 'discount' | 'credit';
  threshold: number;
  triggered: boolean;
  message: string;
}

type TabType = 'summary' | 'activities' | 'qualification' | 'enquiries' | 'quotes' | 'history' | 'approvals';

@Component({
  selector: 'app-right-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.scss'
})
export class RightDrawerComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() data: DrawerData | null = null;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() dataUpdate = new EventEmitter<DrawerData>();

  activeTab: TabType = 'summary';

  // Mock shipping documents
  shippingDocuments: ShippingDocument[] = [
    { id: '1', name: 'IEC Certificate', status: 'verified', uploadedDate: new Date('2024-01-10'), required: true },
    { id: '2', name: 'GSTIN Certificate', status: 'uploaded', uploadedDate: new Date('2024-01-15'), required: true },
    { id: '3', name: 'PAN Card', status: 'verified', uploadedDate: new Date('2024-01-05'), required: true },
    { id: '4', name: 'CIN Certificate', status: 'missing', required: false },
    { id: '5', name: 'MSME Certificate', status: 'expiring', uploadedDate: new Date('2024-01-01'), expiryDate: new Date('2024-03-01'), required: false }
  ];

  // Mock enquiries
  enquiries: Enquiry[] = [
    {
      id: '1',
      title: 'Container Shipping Rates - Mumbai to New York',
      description: 'Inquiry about 20ft container shipping rates and transit time',
      date: new Date('2024-01-10'),
      status: 'responded',
      value: 85000
    },
    {
      id: '2',
      title: 'Bulk Cargo Transportation',
      description: 'Requirements for bulk coal transportation from Chennai',
      date: new Date('2024-01-15'),
      status: 'open',
      value: 150000
    }
  ];

  // Mock quotes
  quotes: Quote[] = [
    {
      id: '1',
      title: 'Q2024-001: Container Shipping Package',
      value: 85000,
      date: new Date('2024-01-12'),
      status: 'sent',
      validUntil: new Date('2024-02-12')
    },
    {
      id: '2',
      title: 'Q2024-002: Annual Logistics Contract',
      value: 500000,
      date: new Date('2024-01-16'),
      status: 'draft',
      validUntil: new Date('2024-03-16')
    }
  ];

  // Mock approval rules
  approvalRules: ApprovalRule[] = [
    {
      id: '1',
      type: 'value',
      threshold: 100000,
      triggered: true,
      message: 'Deal value exceeds $100,000 - requires manager approval'
    },
    {
      id: '2',
      type: 'discount',
      threshold: 15,
      triggered: false,
      message: 'Discount exceeds 15% - requires senior approval'
    },
    {
      id: '3',
      type: 'credit',
      threshold: 30,
      triggered: true,
      message: 'Credit terms exceed 30 days - requires finance approval'
    }
  ];

  // Mock activities data
  activities: Activity[] = [
    {
      id: '1',
      type: 'call',
      title: 'Discovery Call',
      description: 'Initial call to understand their logistics requirements. Discussed current pain points with their freight forwarding process.',
      date: new Date('2024-01-15T10:30:00'),
      user: 'John Smith',
      status: 'completed'
    },
    {
      id: '2',
      type: 'email',
      title: 'Proposal Sent',
      description: 'Sent detailed proposal including pricing for container shipping services.',
      date: new Date('2024-01-16T14:00:00'),
      user: 'John Smith',
      status: 'completed'
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Demo Scheduled',
      description: 'Scheduled product demo for next week to showcase our tracking system.',
      date: new Date('2024-01-20T11:00:00'),
      user: 'Sarah Johnson',
      status: 'pending'
    },
    {
      id: '4',
      type: 'task',
      title: 'Follow-up Required',
      description: 'Follow up on the proposal response and answer any questions.',
      date: new Date('2024-01-18T09:00:00'),
      user: 'John Smith',
      status: 'overdue'
    }
  ];

  // Mock qualification criteria
  qualificationCriteria: QualificationCriteria[] = [
    {
      id: '1',
      name: 'Budget Confirmed',
      description: 'Customer has confirmed available budget for the project',
      status: 'met',
      required: true,
      score: 10,
      maxScore: 10
    },
    {
      id: '2',
      name: 'Decision Maker Identified',
      description: 'We have identified and engaged with the key decision maker',
      status: 'met',
      required: true,
      score: 10,
      maxScore: 10
    },
    {
      id: '3',
      name: 'Timeline Established',
      description: 'Customer has provided clear timeline for implementation',
      status: 'partial',
      required: true,
      score: 6,
      maxScore: 10
    },
    {
      id: '4',
      name: 'Technical Requirements',
      description: 'Technical requirements have been clearly defined',
      status: 'not-met',
      required: false,
      score: 2,
      maxScore: 10
    },
    {
      id: '5',
      name: 'Competition Analysis',
      description: 'Understanding of competitive landscape and positioning',
      status: 'partial',
      required: false,
      score: 7,
      maxScore: 10
    }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      // Reset to summary tab when drawer opens
      this.activeTab = 'summary';
      // Setup focus trap and keyboard listeners
      this.setupKeyboardListeners();
    } else if (changes['isOpen'] && !this.isOpen) {
      this.removeKeyboardListeners();
    }
  }

  private setupKeyboardListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private removeKeyboardListeners(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen) {
      this.onClose();
    }
  };

  onClose(): void {
    this.closeDrawer.emit();
  }

  onOverlayClick(event: Event): void {
    // Only close if clicking the overlay itself, not its children
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onDrawerClick(event: Event): void {
    // Prevent closing when clicking inside the drawer
    event.stopPropagation();
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  onDataChange(): void {
    if (this.data) {
      this.dataUpdate.emit(this.data);
    }
  }

  getOwnerInitials(owner: string): string {
    return owner.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      call: 'phone',
      email: 'mail',
      meeting: 'calendar',
      note: 'file-text',
      task: 'check-square'
    };
    return icons[type] || 'circle';
  }

  getActivityStatusClass(status?: string): string {
    const classes: { [key: string]: string } = {
      completed: 'status--completed',
      pending: 'status--pending',
      overdue: 'status--overdue'
    };
    return status ? classes[status] || '' : '';
  }

  getQualificationStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      met: 'qualification--met',
      'not-met': 'qualification--not-met',
      partial: 'qualification--partial'
    };
    return classes[status] || '';
  }

  getQualificationIcon(status: string): string {
    const icons: { [key: string]: string } = {
      met: 'check-circle',
      'not-met': 'x-circle',
      partial: 'alert-circle'
    };
    return icons[status] || 'circle';
  }

  getQualificationScore(): { score: number; maxScore: number; percentage: number } {
    const totalScore = this.qualificationCriteria.reduce((sum, criteria) => sum + criteria.score, 0);
    const totalMaxScore = this.qualificationCriteria.reduce((sum, criteria) => sum + criteria.maxScore, 0);
    const percentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
    
    return {
      score: totalScore,
      maxScore: totalMaxScore,
      percentage
    };
  }

  getPriorityClass(priority: string): string {
    return `priority--${priority}`;
  }

  getTemperatureClass(temperature: string): string {
    return `temperature--${temperature}`;
  }

  getDocumentStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      missing: 'document--missing',
      uploaded: 'document--uploaded',
      verified: 'document--verified',
      expiring: 'document--expiring'
    };
    return classes[status] || '';
  }

  getDocumentStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      missing: 'Missing',
      uploaded: 'Uploaded',
      verified: 'Verified',
      expiring: 'Expiring'
    };
    return texts[status] || status;
  }

  getEnquiryStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      open: 'enquiry--open',
      responded: 'enquiry--responded',
      closed: 'enquiry--closed'
    };
    return classes[status] || '';
  }

  getQuoteStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      draft: 'quote--draft',
      sent: 'quote--sent',
      accepted: 'quote--accepted',
      rejected: 'quote--rejected',
      expired: 'quote--expired'
    };
    return classes[status] || '';
  }

  getTriggeredApprovalRules(): ApprovalRule[] {
    return this.approvalRules.filter(rule => rule.triggered);
  }

  hasTriggeredApprovals(): boolean {
    return this.getTriggeredApprovalRules().length > 0;
  }

  getNextBestActions(): string[] {
    if (!this.data) return [];
    
    const actions: string[] = [];
    
    // Based on stage and other factors
    switch (this.data.stage.toLowerCase()) {
      case 'prospect':
        actions.push('Schedule discovery call', 'Send company brochure', 'Connect on LinkedIn');
        break;
      case 'qualified':
        actions.push('Prepare proposal', 'Schedule demo', 'Get technical requirements');
        break;
      case 'proposal':
        actions.push('Follow up on proposal', 'Answer questions', 'Schedule negotiation');
        break;
      case 'negotiation':
        actions.push('Finalize terms', 'Prepare contract', 'Get final approvals');
        break;
      case 'closed won':
        actions.push('Send welcome package', 'Schedule onboarding', 'Request testimonial');
        break;
      case 'closed lost':
        actions.push('Schedule post-mortem', 'Add to nurture campaign', 'Request feedback');
        break;
    }

    // Add urgent actions based on conditions
    if (this.data.daysInStage > 30) {
      actions.unshift('Review stage - overdue for movement');
    }
    
    if (this.data.temperature === 'hot') {
      actions.unshift('Priority follow-up required');
    }

    return actions;
  }
}
