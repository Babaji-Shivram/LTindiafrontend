/**
 * CRM Approval Workflow Interfaces
 * Purpose: Handle multi-level approval processes
 */

export interface CrmApprovalWorkflow {
  workflowID: string;
  entityType: 'LEAD' | 'ENQUIRY' | 'QUOTE' | 'CONTRACT' | 'DISCOUNT' | 'PRICING';
  entityID: string;
  workflowName: string;
  currentStage: string;
  currentStageOrder: number;
  totalStages: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  initiatedBy: string;
  initiatedOn: Date;
  completedOn?: Date;
  
  // Workflow stages and history
  stages: ApprovalStage[];
  history: ApprovalHistory[];
}

export interface ApprovalStage {
  stageID: string;
  workflowID: string;
  stageName: string;
  stageOrder: number;
  approverID: string;
  approverName: string;
  approverRole: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SKIPPED';
  approvedOn?: Date;
  remarks?: string;
  isRequired: boolean;
  canDelegate: boolean;
  timeoutHours?: number;
}

export interface ApprovalHistory {
  historyID: string;
  workflowID: string;
  stageID: string;
  action: 'SUBMIT' | 'APPROVE' | 'REJECT' | 'DELEGATE' | 'RECALL';
  actionBy: string;
  actionByName: string;
  actionOn: Date;
  remarks: string;
  previousApprover?: string;
  newApprover?: string;
}

export interface ApprovalAction {
  workflowID: string;
  stageID: string;
  action: 'APPROVE' | 'REJECT' | 'DELEGATE';
  remarks: string;
  approverID: string;
  delegateToID?: string;
}

export interface CreateApprovalRequest {
  entityType: 'LEAD' | 'ENQUIRY' | 'QUOTE' | 'CONTRACT' | 'DISCOUNT' | 'PRICING';
  entityID: string;
  workflowType: string;
  initiatedBy: string;
  remarks?: string;
  urgentApproval?: boolean;
}

export interface ApprovalDashboardData {
  pendingApprovals: PendingApproval[];
  myApprovals: PendingApproval[];
  recentApprovals: ApprovalHistory[];
  approvalStats: ApprovalStats;
}

export interface PendingApproval {
  workflowID: string;
  entityType: string;
  entityID: string;
  entityDescription: string;
  currentStage: string;
  pendingSince: Date;
  initiatedBy: string;
  initiatedByName: string;
  urgentApproval: boolean;
  value?: number;
  daysWaiting: number;
}

export interface ApprovalStats {
  totalPending: number;
  approvedToday: number;
  rejectedToday: number;
  averageApprovalTime: number;
  overdueApprovals: number;
}

export interface ApprovalFilterOptions {
  entityType?: string[];
  status?: string[];
  approver?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  urgentOnly?: boolean;
  overdueOnly?: boolean;
}
