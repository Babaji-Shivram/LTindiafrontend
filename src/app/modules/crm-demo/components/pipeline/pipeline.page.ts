import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Subject, takeUntil, combineLatest, BehaviorSubject } from 'rxjs';

import { MockDataService } from '../../services/mock-data.service';
import { GuardService } from '../../services/guard.service';
import { ToastService } from '../shared/toast.service';
import { Lead, Stage, SavedView, TableDensity, TablePreset, HistoryEntry } from '../../services/models';
import { FilterByStagePipe, CurrencySumPipe, AvgProbabilityPipe, FindStagePipe } from '../shared/pipes';
import { LeadTableComponent } from '../table/lead-table.component';

// ViewMode interface for view switching
interface ViewMode {
  id: 'board' | 'table';
  name: string;
}

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    FilterByStagePipe,
    CurrencySumPipe,
    AvgProbabilityPipe,
    FindStagePipe,
    LeadTableComponent
  ],
  templateUrl: './pipeline.page.html',
  styleUrls: ['./pipeline.page.scss']
})
export class PipelinePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Data
  leads: Lead[] = [];
  stages: Stage[] = [];
  filteredLeads: Lead[] = [];
  
  // View state
  currentView: ViewMode = { id: 'board', name: 'Board' };
  viewModes: ViewMode[] = [
    { id: 'board', name: 'Board' },
    { id: 'table', name: 'Table' }
  ];
  
  // Filters and search
  searchTerm = '';
  selectedStages: string[] = [];
  selectedOwners: string[] = [];
  selectedPriorities: string[] = [];
  selectedTemperatures: string[] = [];
  
  // Table configuration
  currentDensity: TableDensity = { 
    id: 'comfortable', 
    name: 'Comfortable',
    fontSize: '14px',
    rowHeight: '40px',
    padding: '12px'
  };
  
  densityOptions: TableDensity[] = [
    { id: 'compact', name: 'Compact', fontSize: '13px', rowHeight: '32px', padding: '8px' },
    { id: 'comfortable', name: 'Comfortable', fontSize: '14px', rowHeight: '40px', padding: '12px' },
    { id: 'spacious', name: 'Spacious', fontSize: '15px', rowHeight: '48px', padding: '16px' }
  ];
  
  currentPreset: TablePreset = { 
    id: 'sales', 
    name: 'Sales View',
    columns: ['company', 'contact', 'stage', 'value', 'probability', 'owner', 'actions'],
    description: 'Standard sales view with key fields'
  };
  
  presetOptions: TablePreset[] = [
    { 
      id: 'compact', 
      name: 'Compact', 
      columns: ['company', 'value', 'stage', 'actions'],
      description: 'Minimal view with essential fields'
    },
    { 
      id: 'sales', 
      name: 'Sales View', 
      columns: ['company', 'contact', 'stage', 'value', 'probability', 'owner', 'actions'],
      description: 'Comprehensive sales tracking view'
    },
    { 
      id: 'ops-approval', 
      name: 'Ops-Approval', 
      columns: ['company', 'contact', 'stage', 'value', 'priority', 'daysInStage', 'approvalStatus', 'actions'],
      description: 'Operations and approval workflow view'
    }
  ];
  
  // Saved views
  savedViews: SavedView[] = [];
  currentSavedView: SavedView | null = null;
  
  // Selection and bulk actions
  selectedLeads: number[] = [];
  showBulkActions = false;
  
  // Drawer state
  drawerOpen = false;
  selectedLead: Lead | null = null;
  
  // Approval banner
  showApprovalBanner = false;
  approvalLead: Lead | null = null;
  
  constructor(
    private mockDataService: MockDataService,
    private guardService: GuardService,
    private toastService: ToastService
  ) {}
  
  ngOnInit() {
    this.loadData();
    this.loadSavedViews();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.drawerOpen) {
      this.closeDrawer();
    }
  }
  
  private loadData() {
    this.leads = this.mockDataService.getLeads();
    this.stages = this.mockDataService.getStages();
    this.applyFilters();
  }
  
  private loadSavedViews() {
    this.savedViews = this.mockDataService.getSavedViews();
  }
  
  // View switching
  switchView(viewId: 'board' | 'table') {
    this.currentView = this.viewModes.find(v => v.id === viewId) || this.viewModes[0];
  }
  
  // Search and filtering
  onSearchChange() {
    this.applyFilters();
  }
  
  toggleStageFilter(stageId: string) {
    const index = this.selectedStages.indexOf(stageId);
    if (index === -1) {
      this.selectedStages.push(stageId);
    } else {
      this.selectedStages.splice(index, 1);
    }
    this.applyFilters();
  }
  
  clearFilters() {
    this.searchTerm = '';
    this.selectedStages = [];
    this.selectedOwners = [];
    this.selectedPriorities = [];
    this.selectedTemperatures = [];
    this.currentSavedView = null;
    this.applyFilters();
  }
  
  private applyFilters() {
    let filtered = [...this.leads];
    
    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.company.toLowerCase().includes(term) ||
        lead.contactName.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term)
      );
    }
    
    // Stage filter
    if (this.selectedStages.length > 0) {
      filtered = filtered.filter(lead => this.selectedStages.includes(lead.stageId));
    }
    
    // Priority filter
    if (this.selectedPriorities.length > 0) {
      filtered = filtered.filter(lead => this.selectedPriorities.includes(lead.priority));
    }
    
    // Temperature filter
    if (this.selectedTemperatures.length > 0) {
      filtered = filtered.filter(lead => this.selectedTemperatures.includes(lead.temperature));
    }
    
    // Saved view filter
    if (this.currentSavedView) {
      if (this.currentSavedView.id === 'stuck-leads') {
        filtered = filtered.filter(lead => {
          const stage = this.stages.find(s => s.id === lead.stageId);
          return stage && lead.daysInStage > stage.targetDays;
        });
      }
    }
    
    this.filteredLeads = filtered;
  }
  
  // Saved views
  applySavedView(view: SavedView) {
    this.currentSavedView = view;
    
    // Reset filters
    this.selectedStages = view.query.stageIds || [];
    this.selectedPriorities = view.query.priorities || [];
    this.selectedTemperatures = view.query.temperatures || [];
    this.searchTerm = view.query.search || '';
    
    this.applyFilters();
    
    this.toastService.show('info', 'View Applied', `Applied saved view: ${view.name}`);
  }
  
  // New lead
  addNewLead() {
    const newLead = {
      company: 'New Company',
      contactName: 'New Contact',
      stageId: 'prospect',
      value: 0,
      probability: 10,
      temperature: 'cold' as const,
      priority: 'medium' as const,
      expectedClose: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      owner: 'Current User',
      source: 'Manual',
      phone: '',
      email: '',
      notes: ''
    };
    
    const createdLead = this.mockDataService.addLead(newLead);
    this.openDrawer(createdLead);
    
    this.toastService.show('success', 'Lead Created', 'New lead has been created successfully');
  }
  
  // Lead selection
  onLeadSelect(lead: Lead) {
    this.openDrawer(lead);
  }
  
  onTableRowSelected(lead: Lead) {
    this.openDrawer(lead);
  }
  
  onLeadSelectionChange(leadIds: number[]) {
    this.selectedLeads = leadIds;
    this.showBulkActions = leadIds.length > 0;
  }
  
  // Stage changes (from kanban drag/drop)
  onStageChange(leadId: number, newStageId: string) {
    const lead = this.leads.find(l => l.lid === leadId);
    if (!lead) return;
    
    const guardResult = this.guardService.canAdvanceStage(lead, newStageId);
    
    if (guardResult.allowed) {
      const oldStageId = lead.stageId;
      lead.stageId = newStageId;
      lead.daysInStage = 0;
      this.mockDataService.updateLead(lead);
      
      // Add history entry
      this.mockDataService.addHistoryEntry({
        leadId: lead.lid,
        action: 'Stage Changed',
        fromStage: oldStageId,
        toStage: newStageId,
        remarks: `Advanced from ${this.getStageNameById(oldStageId)} to ${this.getStageNameById(newStageId)}`,
        system: false
      });
      
      // Check if approval required
      const newStage = this.stages.find(s => s.id === newStageId);
      if (newStage?.requiresApproval || this.requiresApproval(lead)) {
        this.showApprovalBanner = true;
        this.approvalLead = lead;
      }
      
      this.toastService.show('success', 'Stage Updated', `${lead.company} moved to ${this.getStageNameById(newStageId)}`);
    } else {
      this.toastService.show('error', 'Cannot Advance Stage', guardResult.blockers.join(', '));
    }
  }
  
  private requiresApproval(lead: Lead): boolean {
    return lead.value > 250000;
  }
  
  public getStageNameById(stageId: string): string {
    return this.stages.find(s => s.id === stageId)?.name || stageId;
  }
  
  // Bulk actions
  bulkAssign(owner: string) {
    this.selectedLeads.forEach(leadId => {
      const lead = this.leads.find(l => l.lid === leadId);
      if (lead) {
        lead.owner = owner;
        this.mockDataService.updateLead(lead);
      }
    });
    
    this.toastService.show('success', 'Bulk Assignment', `Assigned ${this.selectedLeads.length} leads to ${owner}`);
    
    this.selectedLeads = [];
    this.showBulkActions = false;
  }
  
  bulkChangePriority(priority: 'low' | 'medium' | 'high') {
    this.selectedLeads.forEach(leadId => {
      const lead = this.leads.find(l => l.lid === leadId);
      if (lead) {
        lead.priority = priority;
        this.mockDataService.updateLead(lead);
      }
    });
    
    this.toastService.show('success', 'Priority Updated', `Updated priority for ${this.selectedLeads.length} leads`);
    
    this.selectedLeads = [];
    this.showBulkActions = false;
  }
  
  bulkAdvanceStage() {
    let successCount = 0;
    let failureCount = 0;
    
    this.selectedLeads.forEach(leadId => {
      const lead = this.leads.find(l => l.lid === leadId);
      if (lead) {
        const nextStage = this.getNextStage(lead.stageId);
        if (nextStage) {
          const guardResult = this.guardService.canAdvanceStage(lead, nextStage.id);
          if (guardResult.allowed) {
            lead.stageId = nextStage.id;
            lead.daysInStage = 0;
            this.mockDataService.updateLead(lead);
            successCount++;
          } else {
            failureCount++;
          }
        }
      }
    });
    
    if (successCount > 0) {
      this.toastService.show('success', 'Bulk Advance', `Advanced ${successCount} leads successfully`);
    }
    
    if (failureCount > 0) {
      this.toastService.show('warning', 'Partial Success', `${failureCount} leads could not be advanced due to qualification requirements`);
    }
    
    this.selectedLeads = [];
    this.showBulkActions = false;
  }
  
  private getNextStage(currentStageId: string): Stage | null {
    const currentStage = this.stages.find(s => s.id === currentStageId);
    if (!currentStage) return null;
    
    return this.stages.find(s => s.sortOrder === currentStage.sortOrder + 1) || null;
  }
  
  exportCSV() {
    const selectedData = this.filteredLeads.filter(lead => 
      this.selectedLeads.length === 0 || this.selectedLeads.includes(lead.lid)
    );
    
    const csvData = this.convertToCSV(selectedData);
    this.downloadCSV(csvData, 'leads-export.csv');
    
    this.toastService.show('success', 'Export Complete', `Exported ${selectedData.length} leads to CSV`);
  }
  
  private convertToCSV(data: Lead[]): string {
    const headers = ['Company', 'Contact', 'Stage', 'Value', 'Probability', 'Temperature', 'Priority', 'Owner'];
    const rows = data.map(lead => [
      lead.company,
      lead.contactName,
      this.getStageNameById(lead.stageId),
      lead.value.toString(),
      lead.probability.toString(),
      lead.temperature,
      lead.priority,
      lead.owner
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
  
  private downloadCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  
  // Table configuration
  changeDensity(density: TableDensity) {
    this.currentDensity = density;
  }
  
  changePreset(preset: TablePreset) {
    this.currentPreset = preset;
  }
  
  // Drawer management
  openDrawer(lead: Lead) {
    this.selectedLead = lead;
    this.drawerOpen = true;
  }
  
  closeDrawer() {
    this.drawerOpen = false;
    this.selectedLead = null;
  }
  
  onDrawerLeadUpdate(updatedLead: Lead) {
    this.mockDataService.updateLead(updatedLead);
  }
  
  // Approval actions
  approveRequest() {
    if (this.approvalLead) {
      this.toastService.show('success', 'Approval Granted', `Request for ${this.approvalLead.company} has been approved`);
      
      // Mock email notification
      setTimeout(() => {
        this.toastService.show('info', 'Email Sent', 'Approval notification sent to sales team');
      }, 1000);
      
      this.showApprovalBanner = false;
      this.approvalLead = null;
    }
  }
  
  rejectRequest() {
    if (this.approvalLead) {
      this.toastService.show('warning', 'Request Rejected', `Request for ${this.approvalLead.company} has been rejected`);
      
      this.showApprovalBanner = false;
      this.approvalLead = null;
    }
  }
  
  requestMoreInfo() {
    if (this.approvalLead) {
      this.toastService.show('info', 'Information Requested', 'Additional information has been requested from the sales team');
      
      this.showApprovalBanner = false;
      this.approvalLead = null;
    }
  }
  
  // Utility methods
  getUniqueOwners(): string[] {
    return [...new Set(this.leads.map(lead => lead.owner))];
  }
  
  getFilterChipText(): string {
    const chips = [];
    if (this.selectedStages.length > 0) {
      chips.push(`${this.selectedStages.length} stages`);
    }
    if (this.selectedPriorities.length > 0) {
      chips.push(`${this.selectedPriorities.length} priorities`);
    }
    if (this.selectedTemperatures.length > 0) {
      chips.push(`${this.selectedTemperatures.length} temperatures`);
    }
    return chips.join(', ');
  }
  
  // Table methods
  selectAllLeads(event: any) {
    if (event.target.checked) {
      this.selectedLeads = this.filteredLeads.map(lead => lead.lid);
    } else {
      this.selectedLeads = [];
    }
    this.showBulkActions = this.selectedLeads.length > 0;
  }
  
  toggleLeadSelection(leadId: number, event: any) {
    if (event.target.checked) {
      this.selectedLeads.push(leadId);
    } else {
      const index = this.selectedLeads.indexOf(leadId);
      if (index > -1) {
        this.selectedLeads.splice(index, 1);
      }
    }
    this.showBulkActions = this.selectedLeads.length > 0;
  }
}
