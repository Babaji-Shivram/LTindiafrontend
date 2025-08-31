# 🔄 Advanced Workflow Automation - Database Schema

## Overview
This document outlines the database tables needed to implement advanced workflow automation while integrating with your existing LT India ERP database structure.

## 🗄️ Proposed New Tables

### 1. **WorkflowDefinition** - Workflow Templates
```sql
CREATE TABLE WorkflowDefinition (
    WorkflowId INT IDENTITY(1,1) PRIMARY KEY,
    WorkflowName NVARCHAR(100) NOT NULL,
    WorkflowDescription NVARCHAR(500),
    EntityType NVARCHAR(50) NOT NULL, -- 'Lead', 'Quote', 'Contract'
    IsActive BIT DEFAULT 1,
    IsSystem BIT DEFAULT 0, -- System workflows can't be deleted
    CreatedDate DATETIME DEFAULT GETDATE(),
    CreatedBy INT, -- FK to Users
    ModifiedDate DATETIME,
    ModifiedBy INT,
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);
```

### 2. **WorkflowStage** - Stages in Workflow
```sql
CREATE TABLE WorkflowStage (
    StageId INT IDENTITY(1,1) PRIMARY KEY,
    WorkflowId INT NOT NULL,
    StageName NVARCHAR(100) NOT NULL,
    StageOrder INT NOT NULL,
    StageColor NVARCHAR(7), -- Hex color #2c4170
    RequiresApproval BIT DEFAULT 0,
    ApprovalRoleId INT, -- FK to BSRoleMaster
    AutoTransitionMinutes INT, -- Auto-move after X minutes
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (WorkflowId) REFERENCES WorkflowDefinition(WorkflowId),
    FOREIGN KEY (ApprovalRoleId) REFERENCES BSRoleMaster(lRoleId)
);
```

### 3. **WorkflowTransition** - Valid Stage Movements
```sql
CREATE TABLE WorkflowTransition (
    TransitionId INT IDENTITY(1,1) PRIMARY KEY,
    WorkflowId INT NOT NULL,
    FromStageId INT NOT NULL,
    ToStageId INT NOT NULL,
    TransitionName NVARCHAR(100),
    IsAutomatic BIT DEFAULT 0,
    RequiresApproval BIT DEFAULT 0,
    ApprovalRoleId INT,
    ConditionScript NVARCHAR(MAX), -- JSON rules
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (WorkflowId) REFERENCES WorkflowDefinition(WorkflowId),
    FOREIGN KEY (FromStageId) REFERENCES WorkflowStage(StageId),
    FOREIGN KEY (ToStageId) REFERENCES WorkflowStage(StageId),
    FOREIGN KEY (ApprovalRoleId) REFERENCES BSRoleMaster(lRoleId)
);
```

### 4. **WorkflowRule** - Business Rules Engine
```sql
CREATE TABLE WorkflowRule (
    RuleId INT IDENTITY(1,1) PRIMARY KEY,
    RuleName NVARCHAR(100) NOT NULL,
    WorkflowId INT NOT NULL,
    TriggerEvent NVARCHAR(50), -- 'StageChange', 'ValueChange', 'TimeElapsed'
    ConditionJson NVARCHAR(MAX), -- JSON conditions
    ActionJson NVARCHAR(MAX), -- JSON actions
    Priority INT DEFAULT 10,
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    FOREIGN KEY (WorkflowId) REFERENCES WorkflowDefinition(WorkflowId),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);
```

### 5. **WorkflowInstance** - Active Workflow Executions
```sql
CREATE TABLE WorkflowInstance (
    InstanceId INT IDENTITY(1,1) PRIMARY KEY,
    WorkflowId INT NOT NULL,
    EntityId NVARCHAR(20) NOT NULL, -- Lead.id, Quote.id, etc.
    EntityType NVARCHAR(50) NOT NULL,
    CurrentStageId INT NOT NULL,
    StartedDate DATETIME DEFAULT GETDATE(),
    StartedBy INT,
    CompletedDate DATETIME,
    Status NVARCHAR(20) DEFAULT 'Active', -- 'Active', 'Completed', 'Suspended'
    FOREIGN KEY (WorkflowId) REFERENCES WorkflowDefinition(WorkflowId),
    FOREIGN KEY (CurrentStageId) REFERENCES WorkflowStage(StageId),
    FOREIGN KEY (StartedBy) REFERENCES Users(UserId)
);
```

### 6. **WorkflowHistory** - Audit Trail
```sql
CREATE TABLE WorkflowHistory (
    HistoryId INT IDENTITY(1,1) PRIMARY KEY,
    InstanceId INT NOT NULL,
    FromStageId INT,
    ToStageId INT NOT NULL,
    TransitionDate DATETIME DEFAULT GETDATE(),
    TransitionBy INT,
    TransitionReason NVARCHAR(500),
    AutomationTriggered BIT DEFAULT 0,
    ApprovalRequired BIT DEFAULT 0,
    ApprovalStatus NVARCHAR(20), -- 'Pending', 'Approved', 'Rejected'
    ApprovedBy INT,
    ApprovedDate DATETIME,
    FOREIGN KEY (InstanceId) REFERENCES WorkflowInstance(InstanceId),
    FOREIGN KEY (FromStageId) REFERENCES WorkflowStage(StageId),
    FOREIGN KEY (ToStageId) REFERENCES WorkflowStage(StageId),
    FOREIGN KEY (TransitionBy) REFERENCES Users(UserId),
    FOREIGN KEY (ApprovedBy) REFERENCES Users(UserId)
);
```

### 7. **WorkflowApproval** - Approval Requests
```sql
CREATE TABLE WorkflowApproval (
    ApprovalId INT IDENTITY(1,1) PRIMARY KEY,
    InstanceId INT NOT NULL,
    TransitionId INT NOT NULL,
    RequesterUserId INT NOT NULL,
    ApproverRoleId INT NOT NULL,
    ApproverUserId INT, -- Assigned approver
    RequestDate DATETIME DEFAULT GETDATE(),
    RequiredByDate DATETIME,
    Status NVARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected', 'Escalated'
    ApprovalNotes NVARCHAR(1000),
    ApprovedDate DATETIME,
    EscalationLevel INT DEFAULT 0,
    FOREIGN KEY (InstanceId) REFERENCES WorkflowInstance(InstanceId),
    FOREIGN KEY (TransitionId) REFERENCES WorkflowTransition(TransitionId),
    FOREIGN KEY (RequesterUserId) REFERENCES Users(UserId),
    FOREIGN KEY (ApproverRoleId) REFERENCES BSRoleMaster(lRoleId),
    FOREIGN KEY (ApproverUserId) REFERENCES Users(UserId)
);
```

### 8. **WorkflowTask** - Auto-generated Tasks
```sql
CREATE TABLE WorkflowTask (
    TaskId INT IDENTITY(1,1) PRIMARY KEY,
    InstanceId INT NOT NULL,
    TaskName NVARCHAR(200) NOT NULL,
    TaskDescription NVARCHAR(1000),
    AssignedToUserId INT,
    AssignedToRoleId INT,
    DueDate DATETIME,
    Priority NVARCHAR(20) DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Critical'
    Status NVARCHAR(20) DEFAULT 'Open', -- 'Open', 'InProgress', 'Completed', 'Cancelled'
    CreatedDate DATETIME DEFAULT GETDATE(),
    CompletedDate DATETIME,
    CompletedBy INT,
    FOREIGN KEY (InstanceId) REFERENCES WorkflowInstance(InstanceId),
    FOREIGN KEY (AssignedToUserId) REFERENCES Users(UserId),
    FOREIGN KEY (AssignedToRoleId) REFERENCES BSRoleMaster(lRoleId),
    FOREIGN KEY (CompletedBy) REFERENCES Users(UserId)
);
```

## 🔗 Integration with Existing Tables

### Modified Lead Table
```sql
-- Add workflow integration to existing Lead table
ALTER TABLE Lead ADD WorkflowInstanceId INT;
ALTER TABLE Lead ADD FOREIGN KEY (WorkflowInstanceId) REFERENCES WorkflowInstance(InstanceId);
```

### Sample Workflow Rules (JSON Format)

#### 1. **Auto-Qualification Rule**
```json
{
  "ruleName": "Auto-Qualify High Value Leads",
  "trigger": "ValueChange",
  "condition": {
    "field": "value",
    "operator": "GreaterThan",
    "value": 500000
  },
  "actions": [
    {
      "type": "StageTransition",
      "targetStage": "Qualified"
    },
    {
      "type": "AssignToUser",
      "roleId": "senior-sales"
    },
    {
      "type": "SendEmail",
      "template": "high-value-lead-notification"
    }
  ]
}
```

#### 2. **Approval Required Rule**
```json
{
  "ruleName": "Require Approval for Large Discounts",
  "trigger": "StageChange",
  "condition": {
    "and": [
      {"field": "stage", "operator": "Equals", "value": "Proposal"},
      {"field": "discount", "operator": "GreaterThan", "value": 10}
    ]
  },
  "actions": [
    {
      "type": "RequireApproval",
      "approverRole": "sales-manager",
      "escalationHours": 24
    },
    {
      "type": "CreateTask",
      "assignToRole": "sales-manager",
      "taskName": "Review High Discount Proposal"
    }
  ]
}
```

#### 3. **Time-Based Escalation**
```json
{
  "ruleName": "Escalate Stale Leads",
  "trigger": "TimeElapsed",
  "condition": {
    "and": [
      {"field": "stage", "operator": "Equals", "value": "New"},
      {"field": "daysInStage", "operator": "GreaterThan", "value": 3}
    ]
  },
  "actions": [
    {
      "type": "SendNotification",
      "recipients": ["owner", "manager"],
      "message": "Lead has been in New stage for 3+ days"
    },
    {
      "type": "UpdatePriority",
      "priority": "High"
    }
  ]
}
```

## 🎯 Implementation Benefits

### For Your Current CRM:
1. **Seamless Integration**: Uses existing User/Role tables
2. **Backwards Compatible**: Current leads continue working
3. **Gradual Rollout**: Can implement per workflow type
4. **Audit Trail**: Complete history of all changes

### Advanced Features Enabled:
1. **Smart Routing**: Auto-assign leads based on value/type
2. **Approval Workflows**: Multi-level approvals with escalation
3. **SLA Management**: Auto-escalation for overdue items
4. **Task Automation**: Auto-create follow-up tasks
5. **Notification Engine**: Email/SMS alerts for stakeholders
6. **Business Intelligence**: Rich analytics on workflow performance

## 🚀 Example Workflow Scenarios

### Scenario 1: High-Value Lead Automation
```
New Lead Created (Value > ₹500K)
  → Auto-assign to Senior Sales Rep
  → Create "Initial Contact" task (Due: 2 hours)
  → Send notification to Sales Manager
  → If no contact in 24h → Escalate to VP Sales
```

### Scenario 2: Discount Approval Workflow
```
Proposal Stage (Discount > 10%)
  → Create approval request
  → Assign to Sales Manager
  → If not approved in 24h → Escalate to VP Sales
  → If approved → Auto-transition to Negotiation
  → Send notification to customer
```

### Scenario 3: Contract Processing
```
Won Lead
  → Auto-create Contract record
  → Generate contract template
  → Assign to Legal team for review
  → Create KYC task for customer
  → Set up payment terms
  → Schedule project kickoff meeting
```

This system would transform your current manual CRM into an intelligent, self-managing workflow engine while maintaining full compatibility with your existing database structure and business processes.
