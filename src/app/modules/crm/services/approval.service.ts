import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { 
  CrmApprovalWorkflow, 
  ApprovalAction, 
  CreateApprovalRequest,
  ApprovalDashboardData,
  PendingApproval,
  ApprovalFilterOptions
} from '../interfaces/approval.interface';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  private baseUrl = '/api/crm/approvals'; // Will be configured properly later
  private approvalsSubject = new BehaviorSubject<CrmApprovalWorkflow[]>([]);
  public approvals$ = this.approvalsSubject.asObservable();

  // Mock data for development
  private mockApprovals: CrmApprovalWorkflow[] = [
    {
      workflowID: 'WF-001',
      entityType: 'QUOTE',
      entityID: 'QUO-001',
      workflowName: 'Quote Approval Workflow',
      currentStage: 'Manager Approval',
      currentStageOrder: 1,
      totalStages: 2,
      status: 'PENDING',
      initiatedBy: 'Alex Thompson',
      initiatedOn: new Date('2025-08-27'),
      stages: [
        {
          stageID: 'ST-001',
          workflowID: 'WF-001',
          stageName: 'Manager Approval',
          stageOrder: 1,
          approverID: 'MGR-001',
          approverName: 'Sarah Johnson',
          approverRole: 'Sales Manager',
          status: 'PENDING',
          isRequired: true,
          canDelegate: true,
          timeoutHours: 24
        },
        {
          stageID: 'ST-002',
          workflowID: 'WF-001',
          stageName: 'Director Approval',
          stageOrder: 2,
          approverID: 'DIR-001',
          approverName: 'Mike Chen',
          approverRole: 'Sales Director',
          status: 'PENDING',
          isRequired: true,
          canDelegate: false,
          timeoutHours: 48
        }
      ],
      history: [
        {
          historyID: 'HIS-001',
          workflowID: 'WF-001',
          stageID: 'ST-001',
          action: 'SUBMIT',
          actionBy: 'Alex Thompson',
          actionByName: 'Alex Thompson',
          actionOn: new Date('2025-08-27'),
          remarks: 'Quote submitted for approval'
        }
      ]
    },
    {
      workflowID: 'WF-002',
      entityType: 'ENQUIRY',
      entityID: 'ENQ-002',
      workflowName: 'High Value Enquiry Approval',
      currentStage: 'Regional Manager Approval',
      currentStageOrder: 1,
      totalStages: 1,
      status: 'APPROVED',
      initiatedBy: 'Dana Wilson',
      initiatedOn: new Date('2025-08-26'),
      completedOn: new Date('2025-08-27'),
      stages: [
        {
          stageID: 'ST-003',
          workflowID: 'WF-002',
          stageName: 'Regional Manager Approval',
          stageOrder: 1,
          approverID: 'RGM-001',
          approverName: 'John Davis',
          approverRole: 'Regional Manager',
          status: 'APPROVED',
          approvedOn: new Date('2025-08-27'),
          remarks: 'Approved for processing',
          isRequired: true,
          canDelegate: true,
          timeoutHours: 24
        }
      ],
      history: [
        {
          historyID: 'HIS-002',
          workflowID: 'WF-002',
          stageID: 'ST-003',
          action: 'SUBMIT',
          actionBy: 'Dana Wilson',
          actionByName: 'Dana Wilson',
          actionOn: new Date('2025-08-26'),
          remarks: 'High value enquiry submitted for approval'
        },
        {
          historyID: 'HIS-003',
          workflowID: 'WF-002',
          stageID: 'ST-003',
          action: 'APPROVE',
          actionBy: 'RGM-001',
          actionByName: 'John Davis',
          actionOn: new Date('2025-08-27'),
          remarks: 'Approved for processing'
        }
      ]
    }
  ];

  constructor(private http: HttpClient) {
    this.approvalsSubject.next(this.mockApprovals);
  }

  // Get approval dashboard data
  getApprovalDashboard(): Observable<ApprovalDashboardData> {
    const currentUser = 'MGR-001'; // Would come from auth service
    
    const pendingApprovals: PendingApproval[] = this.mockApprovals
      .filter(workflow => workflow.status === 'PENDING')
      .map(workflow => ({
        workflowID: workflow.workflowID,
        entityType: workflow.entityType,
        entityID: workflow.entityID,
        entityDescription: this.getEntityDescription(workflow.entityType, workflow.entityID),
        currentStage: workflow.currentStage,
        pendingSince: workflow.initiatedOn,
        initiatedBy: workflow.initiatedBy,
        initiatedByName: workflow.initiatedBy,
        urgentApproval: this.isUrgentApproval(workflow),
        value: this.getEntityValue(workflow.entityType, workflow.entityID),
        daysWaiting: Math.floor((Date.now() - workflow.initiatedOn.getTime()) / (1000 * 60 * 60 * 24))
      }));

    const myApprovals = pendingApprovals.filter(approval => 
      this.isCurrentUserApprover(approval.workflowID, currentUser)
    );

    const recentApprovals = this.mockApprovals
      .flatMap(workflow => workflow.history)
      .filter(history => history.action === 'APPROVE' || history.action === 'REJECT')
      .sort((a, b) => b.actionOn.getTime() - a.actionOn.getTime())
      .slice(0, 10);

    const dashboardData: ApprovalDashboardData = {
      pendingApprovals,
      myApprovals,
      recentApprovals,
      approvalStats: {
        totalPending: pendingApprovals.length,
        approvedToday: recentApprovals.filter(h => 
          h.action === 'APPROVE' && 
          h.actionOn.toDateString() === new Date().toDateString()
        ).length,
        rejectedToday: recentApprovals.filter(h => 
          h.action === 'REJECT' && 
          h.actionOn.toDateString() === new Date().toDateString()
        ).length,
        averageApprovalTime: 2.5, // Mock calculation
        overdueApprovals: pendingApprovals.filter(approval => approval.daysWaiting > 2).length
      }
    };

    return of(dashboardData);
  }

  // Get workflow by ID
  getWorkflowById(workflowID: string): Observable<CrmApprovalWorkflow> {
    const workflow = this.mockApprovals.find(w => w.workflowID === workflowID);
    return of(workflow!);
  }

  // Get workflows by entity
  getWorkflowsByEntity(entityType: string, entityID: string): Observable<CrmApprovalWorkflow[]> {
    const workflows = this.mockApprovals.filter(w => 
      w.entityType === entityType && w.entityID === entityID
    );
    return of(workflows);
  }

  // Create new approval workflow
  createApprovalWorkflow(request: CreateApprovalRequest): Observable<CrmApprovalWorkflow> {
    const workflowStages = this.getWorkflowStages(request.workflowType, request.entityType);
    
    const newWorkflow: CrmApprovalWorkflow = {
      workflowID: 'WF-' + Date.now(),
      entityType: request.entityType,
      entityID: request.entityID,
      workflowName: `${request.entityType} Approval Workflow`,
      currentStage: workflowStages[0]?.stageName || 'Initial Stage',
      currentStageOrder: 1,
      totalStages: workflowStages.length,
      status: 'PENDING',
      initiatedBy: request.initiatedBy,
      initiatedOn: new Date(),
      stages: workflowStages.map((stage, index) => ({
        ...stage,
        stageID: `ST-${Date.now()}-${index}`,
        workflowID: 'WF-' + Date.now(),
        status: index === 0 ? 'PENDING' : 'PENDING'
      })),
      history: [
        {
          historyID: 'HIS-' + Date.now(),
          workflowID: 'WF-' + Date.now(),
          stageID: `ST-${Date.now()}-0`,
          action: 'SUBMIT',
          actionBy: request.initiatedBy,
          actionByName: request.initiatedBy,
          actionOn: new Date(),
          remarks: request.remarks || 'Workflow initiated'
        }
      ]
    };

    this.mockApprovals.unshift(newWorkflow);
    this.approvalsSubject.next(this.mockApprovals);
    return of(newWorkflow);
  }

  // Process approval action
  processApprovalAction(action: ApprovalAction): Observable<boolean> {
    const workflowIndex = this.mockApprovals.findIndex(w => w.workflowID === action.workflowID);
    if (workflowIndex === -1) return of(false);

    const workflow = this.mockApprovals[workflowIndex];
    const stageIndex = workflow.stages.findIndex(s => s.stageID === action.stageID);
    if (stageIndex === -1) return of(false);

    // Update stage status
    workflow.stages[stageIndex].status = action.action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    workflow.stages[stageIndex].approvedOn = new Date();
    workflow.stages[stageIndex].remarks = action.remarks;

    // Add to history
    workflow.history.push({
      historyID: 'HIS-' + Date.now(),
      workflowID: action.workflowID,
      stageID: action.stageID,
      action: action.action,
      actionBy: action.approverID,
      actionByName: action.approverID,
      actionOn: new Date(),
      remarks: action.remarks
    });

    // Update workflow status
    if (action.action === 'REJECT') {
      workflow.status = 'REJECTED';
      workflow.completedOn = new Date();
    } else if (action.action === 'APPROVE') {
      // Check if this was the last stage
      if (workflow.currentStageOrder === workflow.totalStages) {
        workflow.status = 'APPROVED';
        workflow.completedOn = new Date();
      } else {
        // Move to next stage
        workflow.currentStageOrder += 1;
        workflow.currentStage = workflow.stages[workflow.currentStageOrder - 1]?.stageName || 'Next Stage';
      }
    }

    this.mockApprovals[workflowIndex] = workflow;
    this.approvalsSubject.next(this.mockApprovals);
    return of(true);
  }

  // Get pending approvals for user
  getPendingApprovalsForUser(userID: string): Observable<PendingApproval[]> {
    const pendingApprovals = this.mockApprovals
      .filter(workflow => workflow.status === 'PENDING')
      .filter(workflow => this.isCurrentUserApprover(workflow.workflowID, userID))
      .map(workflow => ({
        workflowID: workflow.workflowID,
        entityType: workflow.entityType,
        entityID: workflow.entityID,
        entityDescription: this.getEntityDescription(workflow.entityType, workflow.entityID),
        currentStage: workflow.currentStage,
        pendingSince: workflow.initiatedOn,
        initiatedBy: workflow.initiatedBy,
        initiatedByName: workflow.initiatedBy,
        urgentApproval: this.isUrgentApproval(workflow),
        value: this.getEntityValue(workflow.entityType, workflow.entityID),
        daysWaiting: Math.floor((Date.now() - workflow.initiatedOn.getTime()) / (1000 * 60 * 60 * 24))
      }));

    return of(pendingApprovals);
  }

  // Private helper methods
  private getWorkflowStages(workflowType: string, entityType: string): any[] {
    // Mock workflow stages - would be configured in database
    if (entityType === 'QUOTE' && workflowType === 'STANDARD') {
      return [
        {
          stageName: 'Manager Approval',
          stageOrder: 1,
          approverID: 'MGR-001',
          approverName: 'Sarah Johnson',
          approverRole: 'Sales Manager',
          isRequired: true,
          canDelegate: true,
          timeoutHours: 24
        },
        {
          stageName: 'Director Approval',
          stageOrder: 2,
          approverID: 'DIR-001',
          approverName: 'Mike Chen',
          approverRole: 'Sales Director',
          isRequired: true,
          canDelegate: false,
          timeoutHours: 48
        }
      ];
    }
    
    return [
      {
        stageName: 'Manager Approval',
        stageOrder: 1,
        approverID: 'MGR-001',
        approverName: 'Manager',
        approverRole: 'Manager',
        isRequired: true,
        canDelegate: true,
        timeoutHours: 24
      }
    ];
  }

  private isCurrentUserApprover(workflowID: string, userID: string): boolean {
    const workflow = this.mockApprovals.find(w => w.workflowID === workflowID);
    if (!workflow) return false;
    
    const currentStage = workflow.stages.find(s => s.stageOrder === workflow.currentStageOrder);
    return currentStage?.approverID === userID;
  }

  private isUrgentApproval(workflow: CrmApprovalWorkflow): boolean {
    const hoursSinceInitiated = (Date.now() - workflow.initiatedOn.getTime()) / (1000 * 60 * 60);
    return hoursSinceInitiated > 48; // Urgent if pending more than 48 hours
  }

  private getEntityDescription(entityType: string, entityID: string): string {
    // Mock descriptions - would be fetched from respective entities
    if (entityType === 'QUOTE') {
      return `Quote ${entityID} - Ocean Freight Service`;
    } else if (entityType === 'ENQUIRY') {
      return `Enquiry ${entityID} - Customer Service Request`;
    }
    return `${entityType} ${entityID}`;
  }

  private getEntityValue(entityType: string, entityID: string): number | undefined {
    // Mock values - would be fetched from respective entities
    if (entityType === 'QUOTE') {
      return 172000;
    } else if (entityType === 'ENQUIRY') {
      return 85000;
    }
    return undefined;
  }
}
