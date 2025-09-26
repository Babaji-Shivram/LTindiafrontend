import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostBinding, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lead } from '../../services/models';
import { GuardService } from '../../services/guard.service';

type TableDensity = 'compact' | 'comfortable' | 'spacious';
type SortDirection = 'asc' | 'desc' | null;
type SortableColumn = 'title' | 'company' | 'value' | 'stageId' | 'probability' | 'daysInStage' | 'weightedValue';
type GroupingMode = null | 'stage' | 'owner' | 'priority';

@Component({
  selector: 'app-lead-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead-table.component.html',
  styleUrls: ['./lead-table.component.scss']
})
export class LeadTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') get hostClasses() {
    return `density--${this.density}`;
  }
  
  @ViewChild('tableWrapper', { static: false }) tableWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('tableHead', { static: false }) tableHead!: ElementRef<HTMLTableSectionElement>;
  @ViewChildren('dataRow') dataRowEls!: QueryList<ElementRef<HTMLTableRowElement>>;
  @ViewChild('drawerEl', { static: false }) drawerEl!: ElementRef<HTMLDivElement>;
  
  @Output() rowSelected = new EventEmitter<Lead>();
  
  density: TableDensity = 'comfortable';
  quickFilter: string = '';
  showColumnManager = false;
  visibleColumns: Set<string> = new Set();
  columnWidths: { [key: string]: number } = {};
  currentSortColumn: SortableColumn | null = null;
  currentSortDirection: SortDirection = null;
  // Header shadow state (template binding safeguard)
  shadowHeader = false;
  // Grouping
  groupingMode: GroupingMode = null;
  collapsedGroups: Set<string> = new Set();
  
  // State management
  isLoading: boolean = false;
  isEmpty: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';
  
  private scrollListener?: () => void;
  private originalLeads: Lead[] = [];
  // Drawer
  openDrawerLead: Lead | null = null;
  private lastFocusedLeadId: number | null = null;

  // Toasts
  toasts: { id:number; type:'success'|'error'|'info'; title:string; message:string; details?:string[] }[] = [];
  private toastSeq = 0;
  // Saved Views
  savedViews = [
    { id: 'my', label: 'My Leads' },
    { id: 'stuck', label: 'Stuck >7d' },
    { id: 'approval', label: 'Approval Pending' },
    { id: 'hot', label: 'Hot Deals' },
    { id: 'new', label: 'New This Week' },
  ];
  private viewFilters: Record<string,(l:Lead)=>boolean> = {
    my: (_l)=> true, // could filter by owner later
    stuck: (l)=> l.daysInStage > 7,
    approval: (l)=> (l as any).stageId==='approval_pending',
    hot: (l)=> l.temperature==='hot' || l.priority==='high',
    new: (l)=> (Date.now()-l.createdDate.getTime())/86400000 <= 7
  };
  private viewsStateKey = 'crmDemo.table.views';
  private activeViewKey = 'crmDemo.table.activeView';
  private viewConfigs: Record<string, any> = {};
  activeView: string | null = null;
  private stageOrder: Record<string, number> = { prospect:1, qualified:2, proposal:3, negotiation:4, approval_pending:5, ready_quote:6, won:7, lost:8 };
  leads: Lead[] = [
    {
      lid: 1,
      company: 'Global Logistics Ltd',
      contactName: 'Michael Johnson',
      email: 'michael@globallogistics.com',
      phone: '+1-555-0123',
      value: 45000,
      stageId: 'prospect',
      probability: 25,
      priority: 'high',
      temperature: 'warm',
      source: 'Website',
      owner: 'John Smith',
      expectedClose: new Date('2024-03-15'),
      daysInStage: 3,
      createdDate: new Date('2024-01-10'),
      lastActivityDate: new Date('2024-01-15'),
      notes: 'Initial contact made, interested in import/export services'
    },
    {
      lid: 2,
      company: 'Trade Solutions Inc',
      contactName: 'Emily Davis',
      email: 'emily@tradesolutions.com',
      phone: '+1-555-0124',
      value: 28000,
      stageId: 'prospect',
      probability: 20,
      priority: 'medium',
      temperature: 'cold',
      source: 'Referral',
      owner: 'Sarah Johnson',
      expectedClose: new Date('2024-04-01'),
      daysInStage: 1,
      createdDate: new Date('2024-01-12'),
      lastActivityDate: new Date('2024-01-14'),
      notes: 'Referred by existing client, needs customs clearance'
    },
    {
      lid: 3,
      company: 'Ocean Express',
      contactName: 'Robert Wilson',
      email: 'robert@oceanexpress.com',
      phone: '+1-555-0125',
      value: 67000,
      stageId: 'qualified',
      probability: 45,
      priority: 'low',
      temperature: 'cold',
      source: 'Cold Call',
      owner: 'Mike Chen',
      expectedClose: new Date('2024-05-15'),
      daysInStage: 5,
      createdDate: new Date('2024-01-08'),
      lastActivityDate: new Date('2024-01-13'),
      notes: 'Freight forwarding requirements discussed'
    },
    {
      lid: 4,
      company: 'Maritime Corp',
      contactName: 'James Wilson',
      email: 'james@maritimecorp.com',
      phone: '+1-555-0126',
      value: 125000,
      stageId: 'qualified',
      probability: 45,
      priority: 'high',
      temperature: 'hot',
      source: 'Trade Show',
      owner: 'Lisa Wang',
      expectedClose: new Date('2024-02-28'),
      daysInStage: 7,
      createdDate: new Date('2024-01-05'),
      lastActivityDate: new Date('2024-01-12'),
      notes: 'Large container shipping contract potential'
    },
    {
      lid: 5,
      company: 'Sky Freight',
      contactName: 'Lisa Anderson',
      email: 'lisa@skyfreight.com',
      phone: '+1-555-0127',
      value: 89000,
      stageId: 'proposal',
      probability: 65,
      priority: 'medium',
      temperature: 'warm',
      source: 'LinkedIn',
      owner: 'David Brown',
      expectedClose: new Date('2024-03-10'),
      daysInStage: 4,
      createdDate: new Date('2024-01-07'),
      lastActivityDate: new Date('2024-01-11'),
      notes: 'Air cargo services proposal submitted'
    },
    {
      lid: 6,
      company: 'Global Supply Co',
      contactName: 'Mark Thompson',
      email: 'mark@globalsupply.com',
      phone: '+1-555-0128',
      value: 156000,
      stageId: 'proposal',
      probability: 65,
      priority: 'high',
      temperature: 'hot',
      source: 'Webinar',
      owner: 'Jennifer Liu',
      expectedClose: new Date('2024-02-15'),
      daysInStage: 12,
      createdDate: new Date('2024-01-01'),
      lastActivityDate: new Date('2024-01-10'),
      notes: 'Supply chain management solution proposal pending'
    },
    {
      lid: 7,
      company: 'Storage Plus',
      contactName: 'Sarah Martinez',
      email: 'sarah@storageplus.com',
      phone: '+1-555-0129',
      value: 92000,
      stageId: 'negotiation',
      probability: 80,
      priority: 'medium',
      temperature: 'warm',
      source: 'Email Campaign',
      owner: 'Tom Wilson',
      expectedClose: new Date('2024-03-01'),
      daysInStage: 8,
      createdDate: new Date('2024-01-03'),
      lastActivityDate: new Date('2024-01-09'),
      notes: 'Warehouse solutions contract in negotiation'
    },
    {
      lid: 8,
      company: 'Border Express',
      contactName: 'Carlos Rodriguez',
      email: 'carlos@borderexpress.com',
      phone: '+1-555-0130',
      value: 178000,
      stageId: 'negotiation',
      probability: 80,
      priority: 'high',
      temperature: 'hot',
      source: 'Partner',
      owner: 'Emma Davis',
      expectedClose: new Date('2024-02-05'),
      daysInStage: 15,
      createdDate: new Date('2023-12-25'),
      lastActivityDate: new Date('2024-01-08'),
      notes: 'Cross-border transport contract almost finalized'
    }
  ];

  constructor(private guardService: GuardService) {}

  ngOnInit(): void {
    // Store original leads array for sorting
    this.originalLeads = [...this.leads];
    // Load density from localStorage
    const d = localStorage.getItem('crmDemo.table.density') as TableDensity;
    if (d) this.density = d;
    // Load visible columns from localStorage
    const cols = localStorage.getItem('crmDemo.table.visibleColumns');
    if (cols) {
      try {
        this.visibleColumns = new Set(JSON.parse(cols));
      } catch {}
    } else {
      this.visibleColumns = new Set([
        'title','company','contactName','value','stageId','probability','priority','temperature','owner','expectedClose','daysInStage','lastActivityDate'
      ]);
    }
    // Load column widths
    const widths = localStorage.getItem('crmDemo.table.columnWidths');
    if (widths) {
      try {
        this.columnWidths = JSON.parse(widths);
      } catch {}
    }
  // Load saved view configs
  this.loadViewConfigs();
  const av = localStorage.getItem(this.activeViewKey);
  if (av) this.activeView = av || null;
  if (this.activeView) this.applyView(this.activeView, true);
  // Check for empty state
    if (this.leads.length === 0) {
      this.setEmptyState();
    } else {
      this.setDataState();
    }
  }

  ngAfterViewInit(): void {
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    if (this.scrollListener && this.tableWrapper?.nativeElement) {
      this.tableWrapper.nativeElement.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupScrollListener(): void {
    if (this.tableWrapper?.nativeElement && this.tableHead?.nativeElement) {
      this.scrollListener = () => {
        const scrollTop = this.tableWrapper.nativeElement.scrollTop;
        if (scrollTop > 0) {
          this.tableHead.nativeElement.classList.add('scrolled');
        } else {
          this.tableHead.nativeElement.classList.remove('scrolled');
        }
      };
      
      this.tableWrapper.nativeElement.addEventListener('scroll', this.scrollListener);
    }
  }

  setDensity(density: TableDensity): void {
    this.density = density;
    localStorage.setItem('crmDemo.table.density', density);
  }

  toggleColumnManager() {
    this.showColumnManager = !this.showColumnManager;
  }
  setColumnVisible(key: string, visible: boolean) {
    if (visible) this.visibleColumns.add(key);
    else this.visibleColumns.delete(key);
    localStorage.setItem('crmDemo.table.visibleColumns', JSON.stringify(Array.from(this.visibleColumns)));
  }
  setColumnWidth(key: string, width: number) {
    this.columnWidths[key] = width;
    localStorage.setItem('crmDemo.table.columnWidths', JSON.stringify(this.columnWidths));
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  getTemperatureClass(temperature: string): string {
    return `temperature-${temperature}`;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getOwnerInitials(owner: string): string {
    return owner.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  }

  onRowClick(lead: Lead): void {
  this.lastFocusedLeadId = lead.lid;
  this.openDrawer(lead);
  this.rowSelected.emit(lead);
  }

  onRowKeydown(event: KeyboardEvent, lead: Lead): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onRowClick(lead);
    }
    if(event.key === 'Escape' && this.openDrawerLead){
      this.closeDrawer();
    }
  }

  onColumnSort(column: string): void {
    if(!this.isSortable(column)) return;
    const col = column as SortableColumn;
    if (this.currentSortColumn === col) {
      // Toggle direction: asc -> desc -> null -> asc
      this.currentSortDirection = 
        this.currentSortDirection === 'asc' ? 'desc' :
        this.currentSortDirection === 'desc' ? null : 'asc';
    } else {
      // New column, start with ascending
      this.currentSortColumn = col;
      this.currentSortDirection = 'asc';
    }

  this.applySorting();
  this.persistActiveViewState();
  }

  private applySorting(): void {
    if (!this.currentSortColumn || !this.currentSortDirection) {
      // Reset to original order
      this.leads = [...this.originalLeads];
      this.currentSortColumn = null;
      this.currentSortDirection = null;
      return;
    }

    this.leads = [...this.originalLeads].sort((a, b) => {
      const aValue = this.getSortValue(a, this.currentSortColumn!);
      const bValue = this.getSortValue(b, this.currentSortColumn!);

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;

      return this.currentSortDirection === 'desc' ? -comparison : comparison;
    });
  }

  private getSortValue(lead: Lead, column: SortableColumn): any {
    switch (column) {
      case 'title':
      case 'company':
        return lead.company.toLowerCase();
      case 'value':
        return lead.value;
      case 'stageId':
        return this.stageOrder[lead.stageId] || 99;
      case 'probability':
        return lead.probability;
      case 'daysInStage':
        return lead.daysInStage;
      case 'weightedValue':
        return this.getWeightedValue(lead);
      default:
        return '';
    }
  }

  getSortDirection(column: string): SortDirection {
    if(!this.isSortable(column)) return null;
    return this.currentSortColumn === column ? this.currentSortDirection : null;
  }

  getAriaSort(column: string): string {
    if(!this.isSortable(column)) return 'none';
    const direction = this.getSortDirection(column);
    switch (direction) {
      case 'asc': return 'ascending';
      case 'desc': return 'descending';
      default: return 'none';
    }
  }

  isSortable(column: string): boolean {
    return ['title', 'company', 'value', 'stageId', 'probability', 'daysInStage', 'weightedValue'].includes(column);
  }

  // State management methods
  setLoadingState(): void {
    this.isLoading = true;
    this.isEmpty = false;
    this.hasError = false;
  }

  setEmptyState(): void {
    this.isLoading = false;
    this.isEmpty = true;
    this.hasError = false;
  }

  setErrorState(message: string = 'Unable to load leads'): void {
    this.isLoading = false;
    this.isEmpty = false;
    this.hasError = true;
    this.errorMessage = message;
  }

  setDataState(): void {
    this.isLoading = false;
    this.isEmpty = false;
    this.hasError = false;
  }

  onClearFilters(): void {
    // Reset to show all leads
    this.leads = [...this.originalLeads];
    this.currentSortColumn = null;
    this.currentSortDirection = null;
    this.setDataState();
  }

  onRetry(): void {
    this.setLoadingState();
    // Simulate loading delay
    setTimeout(() => {
      this.leads = [...this.originalLeads];
      this.setDataState();
    }, 1000);
  }

  // Temporary test method for visual states (remove in production)
  testStates(): void {
    console.log('Testing visual states...');
    
    // Test loading state
    this.setLoadingState();
    
    setTimeout(() => {
      // Test empty state
      this.setEmptyState();
      
      setTimeout(() => {
        // Test error state
        this.setErrorState('Network connection failed. Please check your internet connection and try again.');
        
        setTimeout(() => {
          // Back to normal data state
          this.leads = [...this.originalLeads];
          this.setDataState();
        }, 3000);
      }, 3000);
    }, 3000);
  }

  // ================= Added Enhancements =================
  // Quick filter (applied in getDisplayedLeads)
  getDisplayedLeads(): Lead[] {
    let list = [...this.originalLeads];
    if (this.activeView) {
      const fn = this.viewFilters[this.activeView];
      if (fn) list = list.filter(fn);
    }
    if (this.quickFilter) {
      const q = this.quickFilter.toLowerCase();
      list = list.filter(l => l.company.toLowerCase().includes(q) || l.contactName.toLowerCase().includes(q));
    }
    if (this.currentSortColumn && this.currentSortDirection) {
      list.sort((a,b)=>{
        const av = this.getSortValue(a,this.currentSortColumn!);
        const bv = this.getSortValue(b,this.currentSortColumn!);
        if (av<bv) return this.currentSortDirection==='asc'?-1:1;
        if (av>bv) return this.currentSortDirection==='asc'?1:-1;
        return 0;
      });
    }
    return list;
  }

  // Grouped structure used by template when groupingMode set
  getGroupedLeads(): { key:string; label:string; items: Lead[]; metrics:{ count:number; sumValue:number; avgProb:number; sumWeighted:number } }[] {
    const data = this.getDisplayedLeads();
    if(!this.groupingMode) return [];
    const map = new Map<string, Lead[]>();
    data.forEach(l=>{
      let key: string = '';
      if(this.groupingMode==='stage') key = (l as any).stageId || 'unknown';
      else if(this.groupingMode==='owner') key = l.owner || 'Unassigned';
      else if(this.groupingMode==='priority') key = (l as any).priority || 'unknown';
      if(!map.has(key)) map.set(key, []);
      map.get(key)!.push(l);
    });
    let groups = Array.from(map.entries()).map(([key, items])=>{
      const sumValue = items.reduce((a,b)=> a + (b.value||0), 0);
      const sumWeighted = items.reduce((a,b)=> a + this.getWeightedValue(b), 0);
      const avgProb = items.length? (items.reduce((a,b)=> a + (b.probability||0), 0) / items.length) : 0;
      let label = key;
      if(this.groupingMode==='stage') label = key.replace(/_/g,' ');
      return { key, label, items, metrics: { count: items.length, sumValue, avgProb, sumWeighted } };
    });
    // sort groups depending on mode
    if(this.groupingMode==='stage') {
      groups.sort((a,b)=> (this.stageOrder[a.key]||99) - (this.stageOrder[b.key]||99));
    } else {
      groups.sort((a,b)=> a.key.localeCompare(b.key));
    }
    return groups;
  }

  setGrouping(mode: GroupingMode){
    if(this.groupingMode===mode) return; // no change
    this.groupingMode = mode;
    this.collapsedGroups.clear();
    this.persistActiveViewState();
  }
  toggleGroup(key:string){
    if(this.collapsedGroups.has(key)) this.collapsedGroups.delete(key); else this.collapsedGroups.add(key);
    this.persistActiveViewState();
  }
  isGroupCollapsed(key:string){ return this.collapsedGroups.has(key); }

  // Weighted value derived column
  getWeightedValue(l: Lead){ return Math.round((l.value || 0) * (l.probability||0) / 100); }
  formatWeighted(l: Lead){ return this.formatCurrency(this.getWeightedValue(l)); }
  getVisibleColumnKeys(){ return ['title','company','contactName','value','weightedValue','stageId','probability','priority','temperature','owner','expectedClose','daysInStage','lastActivityDate'].filter(c=> c==='weightedValue'? this.visibleColumns.has('weightedValue') : this.visibleColumns.has(c)); }
  totalColumnSpan(){ return 1 + this.getVisibleColumnKeys().length; } // 1 for select column

  // Selection
  selectedIds: Set<number> = new Set();
  toggleRowSelection(id: number, checked: boolean) { checked ? this.selectedIds.add(id) : this.selectedIds.delete(id); }
  allVisibleSelected(): boolean { const rows = this.getDisplayedLeads(); return rows.length>0 && rows.every(r=>this.selectedIds.has(r.lid)); }
  toggleSelectAll(checked: boolean) { const rows = this.getDisplayedLeads(); rows.forEach(r=> checked? this.selectedIds.add(r.lid) : this.selectedIds.delete(r.lid)); }
  clearSelection() { this.selectedIds.clear(); }

  // Bulk stage advance (placeholder)
  bulkStagePickerOpen = false;
  stageAdvanceTarget: string | null = null;
  bulkMessage = '';
  private bulkMessageTimeout: any;
  openAdvanceStagePicker(){ this.bulkStagePickerOpen = true; }
  cancelAdvanceStage(){ this.bulkStagePickerOpen=false; this.stageAdvanceTarget=null; }
  confirmAdvanceStage(){
    if(!this.stageAdvanceTarget) return;
    const target = this.stageAdvanceTarget;
    const failures: {lead: Lead; blockers: string[]}[] = [];
    let advanced = 0;
    this.getDisplayedLeads().forEach(l=>{
      if(this.selectedIds.has(l.lid)){
        const res = this.guardService.canAdvanceStage(l as any, target);
        if(res.allowed){
          (l as any).stageId = target;
            this.updateProbabilityForStage(l as any);
          advanced++;
        } else {
          failures.push({ lead: l, blockers: res.blockers });
        }
      }
    });
    this.bulkStagePickerOpen=false; this.stageAdvanceTarget=null;
    if(failures.length){
      const summary = failures.slice(0,3).map(f=>`${f.lead.company}: ${f.blockers[0]||'Blocked'}`).join('; ')+ (failures.length>3?'…':'');
      this.announceBulk(`Advanced ${advanced}. Blocked ${failures.length}. ${summary}`);
  this.addToast('error', 'Stage Advance', `${failures.length} lead(s) blocked`, failures.map(f=>`${f.lead.company} – ${f.blockers.join(', ')}`));
    } else {
      this.announceBulk(`Advanced ${advanced} lead(s)`);
  this.addToast('success','Stage Advance',`Advanced ${advanced} lead(s)`);
    }
    this.persistActiveViewState();
  }
  private announceBulk(msg: string){
    this.bulkMessage = msg;
    if(this.bulkMessageTimeout) clearTimeout(this.bulkMessageTimeout);
    this.bulkMessageTimeout = setTimeout(()=> this.bulkMessage='', 4000);
  }

  // CSV Export
  exportCsv(){
    const rows = this.getDisplayedLeads();
  const defaultCols = ['company','contactName','value','weightedValue','stageId','probability','priority','temperature','owner','expectedClose','daysInStage','lastActivityDate'];
  const keys = Array.from(this.visibleColumns.size? this.visibleColumns : new Set(defaultCols));
    const header = keys.join(',');
    const lines = rows.map(r => keys.map(k => this.escapeCsv(this.getCellValue(r,k))).join(','));
    const csv = [header, ...lines].join('\n');
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  private escapeCsv(v:any){ if(v==null) return ''; const s=String(v).replace(/"/g,'""'); return /[",\n]/.test(s)?`"${s}"`:s; }
  private getCellValue(l:Lead,k:string){ switch(k){ case 'expectedClose': return this.formatDate(l.expectedClose); case 'lastActivityDate': return this.formatDate(l.lastActivityDate); case 'weightedValue': return this.getWeightedValue(l); default: return (l as any)[k]; } }

  // Column resize
  private resizingCol: string | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  onColumnResizeStart(col: string, ev: MouseEvent){ ev.stopPropagation(); this.resizingCol = col; this.resizeStartX = ev.clientX; this.resizeStartWidth = this.columnWidths[col] || this.getDefaultMinWidth(col); window.addEventListener('mousemove', this.onGlobalMouseMove); window.addEventListener('mouseup', this.onGlobalMouseUp); }
  private onGlobalMouseMove = (e: MouseEvent) => { if(!this.resizingCol) return; const delta = e.clientX - this.resizeStartX; const w = Math.max(this.getDefaultMinWidth(this.resizingCol), this.resizeStartWidth + delta); this.columnWidths[this.resizingCol]=w; localStorage.setItem('crmDemo.table.columnWidths', JSON.stringify(this.columnWidths)); };
  private onGlobalMouseUp = ()=> { this.resizingCol=null; window.removeEventListener('mousemove', this.onGlobalMouseMove); window.removeEventListener('mouseup', this.onGlobalMouseUp); };

  getDefaultMinWidth(col:string){ const map:any={ title:180, company:140, contactName:120, value:110, weightedValue:120, stageId:100, probability:90, priority:90, temperature:80, owner:110, expectedClose:120, daysInStage:70, lastActivityDate:120 }; return map[col]||120; }

  trackByLead(_i:number,l:Lead){ return l.lid; }

  applyView(id: string, initialLoad = false){
    const same = this.activeView === id && !initialLoad;
    this.activeView = same ? null : id;
    localStorage.setItem(this.activeViewKey, this.activeView || '');
    if(!same && this.activeView && this.viewConfigs[this.activeView]){
      const cfg = this.viewConfigs[this.activeView];
      if (cfg.density) this.density = cfg.density;
      if (cfg.visibleColumns) this.visibleColumns = new Set(cfg.visibleColumns);
      if (cfg.sort) { this.currentSortColumn = cfg.sort.col; this.currentSortDirection = cfg.sort.dir; }
  if (cfg.groupingMode !== undefined) this.groupingMode = cfg.groupingMode;
  if (cfg.collapsedGroups) this.collapsedGroups = new Set(cfg.collapsedGroups);
    }
  }
  isViewActive(id: string){ return this.activeView === id; }

  private updateProbabilityForStage(lead: any){
    const map: Record<string, number> = { prospect:10, qualified:25, proposal:50, negotiation:75, won:100, lost:0 };
    if(map[lead.stageId] !== undefined) lead.probability = map[lead.stageId];
  }
  private loadViewConfigs(){
    const raw = localStorage.getItem(this.viewsStateKey);
    if(raw){ try { this.viewConfigs = JSON.parse(raw) || {}; } catch { this.viewConfigs = {}; } }
  }
  private persistViewConfigs(){ localStorage.setItem(this.viewsStateKey, JSON.stringify(this.viewConfigs)); }
  private persistActiveViewState(){
    if(!this.activeView) return;
    this.viewConfigs[this.activeView] = {
      density: this.density,
      visibleColumns: Array.from(this.visibleColumns),
  sort: this.currentSortColumn && this.currentSortDirection ? { col: this.currentSortColumn, dir: this.currentSortDirection } : null,
  groupingMode: this.groupingMode,
  collapsedGroups: Array.from(this.collapsedGroups)
    };
    this.persistViewConfigs();
  }

  // Drawer Handling
  openDrawer(lead: Lead){
    this.openDrawerLead = lead;
    setTimeout(()=>{ if(this.drawerEl) this.drawerEl.nativeElement.focus(); }, 0);
  }
  closeDrawer(){
    this.openDrawerLead = null;
    // restore focus to row
    setTimeout(()=>{
      if(this.lastFocusedLeadId != null){
        const row = this.dataRowEls?.find(r=> r.nativeElement.getAttribute('data-lid') === String(this.lastFocusedLeadId));
        if(row) row.nativeElement.focus();
      }
    }, 0);
  }
  onDrawerKeydown(ev: KeyboardEvent){
    if(ev.key === 'Escape'){
      ev.preventDefault();
      this.closeDrawer();
    }
  }

  // Toast helpers
  addToast(type:'success'|'error'|'info', title:string, message:string, details?:string[]){
    const id = ++this.toastSeq;
    this.toasts.push({ id, type, title, message, details });
    setTimeout(()=> this.removeToast(id), type==='error'?8000:5000);
  }
  removeToast(id:number){
    this.toasts = this.toasts.filter(t=>t.id!==id);
  }
}
