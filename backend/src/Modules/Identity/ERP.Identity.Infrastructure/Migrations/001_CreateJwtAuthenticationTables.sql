-- =============================================
-- JWT Authentication System Database Schema
-- Version: 1.0
-- Author: ERP System
-- Date: 2024-01-20
-- =============================================

-- Create RefreshTokens table for JWT refresh token management
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'RefreshTokens')
BEGIN
    CREATE TABLE [dbo].[RefreshTokens]
    (
        [Id] uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWID(),
        [Token] nvarchar(500) NOT NULL UNIQUE,
        [UserId] nvarchar(100) NOT NULL,
        [ExpiryDate] datetime2 NOT NULL,
        [IsActive] bit NOT NULL DEFAULT 1,
        [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
        [RevokedAt] datetime2 NULL,
        [RevokedByIp] nvarchar(45) NULL,
        [ReplacedByToken] nvarchar(500) NULL
    );

    CREATE NONCLUSTERED INDEX [IX_RefreshTokens_UserId] ON [RefreshTokens] ([UserId]);
    CREATE NONCLUSTERED INDEX [IX_RefreshTokens_Token] ON [RefreshTokens] ([Token]);
    CREATE NONCLUSTERED INDEX [IX_RefreshTokens_ExpiryDate] ON [RefreshTokens] ([ExpiryDate]);
END

-- Create AuditLogs table for security event tracking
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AuditLogs')
BEGIN
    CREATE TABLE [dbo].[AuditLogs]
    (
        [Id] bigint IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [UserId] nvarchar(100) NULL,
        [Action] nvarchar(100) NOT NULL,
        [Resource] nvarchar(200) NULL,
        [Details] nvarchar(MAX) NULL,
        [IpAddress] nvarchar(45) NULL,
        [UserAgent] nvarchar(500) NULL,
        [Timestamp] datetime2 NOT NULL DEFAULT GETUTCDATE(),
        [Success] bit NOT NULL DEFAULT 1
    );

    CREATE NONCLUSTERED INDEX [IX_AuditLogs_UserId] ON [AuditLogs] ([UserId]);
    CREATE NONCLUSTERED INDEX [IX_AuditLogs_Action] ON [AuditLogs] ([Action]);
    CREATE NONCLUSTERED INDEX [IX_AuditLogs_Timestamp] ON [AuditLogs] ([Timestamp]);
    CREATE NONCLUSTERED INDEX [IX_AuditLogs_IpAddress] ON [AuditLogs] ([IpAddress]);
END

-- Create RateLimitCounters table for tracking rate limiting attempts
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'RateLimitCounters')
BEGIN
    CREATE TABLE [dbo].[RateLimitCounters]
    (
        [Id] bigint IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Identifier] nvarchar(200) NOT NULL, -- IP or UserId
        [Action] nvarchar(100) NOT NULL,     -- Login, TokenRefresh, etc.
        [Count] int NOT NULL DEFAULT 1,
        [WindowStart] datetime2 NOT NULL DEFAULT GETUTCDATE(),
        [LastAttempt] datetime2 NOT NULL DEFAULT GETUTCDATE()
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_RateLimitCounters_Identifier_Action] 
    ON [RateLimitCounters] ([Identifier], [Action]);
    
    CREATE NONCLUSTERED INDEX [IX_RateLimitCounters_WindowStart] 
    ON [RateLimitCounters] ([WindowStart]);
END

-- Create Users table if it doesn't exist (basic structure for JWT authentication)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE [dbo].[Users]
    (
        [Id] nvarchar(100) NOT NULL PRIMARY KEY,
        [Username] nvarchar(100) NOT NULL UNIQUE,
        [Email] nvarchar(255) NOT NULL UNIQUE,
        [PasswordHash] nvarchar(500) NOT NULL,
        [FirstName] nvarchar(100) NULL,
        [LastName] nvarchar(100) NULL,
        [IsActive] bit NOT NULL DEFAULT 1,
        [IsEmailVerified] bit NOT NULL DEFAULT 0,
        [CreatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
        [UpdatedAt] datetime2 NOT NULL DEFAULT GETUTCDATE(),
        [LastLoginAt] datetime2 NULL,
        [PasswordChangedAt] datetime2 NOT NULL DEFAULT GETUTCDATE()
    );

    CREATE NONCLUSTERED INDEX [IX_Users_Email] ON [Users] ([Email]);
    CREATE NONCLUSTERED INDEX [IX_Users_Username] ON [Users] ([Username]);
    CREATE NONCLUSTERED INDEX [IX_Users_IsActive] ON [Users] ([IsActive]);
END

-- Insert sample admin user for testing (password: Admin@123)
IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'admin')
BEGIN
    INSERT INTO [Users] 
    ([Id], [Username], [Email], [PasswordHash], [FirstName], [LastName], [IsActive], [IsEmailVerified])
    VALUES 
    (NEWID(), 'admin', 'admin@ltim.com', 
     '$2a$11$8K1p/a0dL2LkqvQOuiLiKe2RQ5lzqL8Y6HpjZVT3E4/8xDjN7j5qm', -- Admin@123
     'System', 'Administrator', 1, 1);
END

-- Add stored procedures for cleanup operations
IF NOT EXISTS (SELECT * FROM sys.procedures WHERE name = 'CleanupExpiredTokens')
BEGIN
    EXEC('CREATE PROCEDURE [dbo].[CleanupExpiredTokens]
    AS
    BEGIN
        SET NOCOUNT ON;
        
        DELETE FROM RefreshTokens 
        WHERE ExpiryDate < GETUTCDATE() OR IsActive = 0;
        
        SELECT @@ROWCOUNT as DeletedTokens;
    END');
END

IF NOT EXISTS (SELECT * FROM sys.procedures WHERE name = 'CleanupOldAuditLogs')
BEGIN
    EXEC('CREATE PROCEDURE [dbo].[CleanupOldAuditLogs]
        @RetentionDays INT = 90
    AS
    BEGIN
        SET NOCOUNT ON;
        
        DELETE FROM AuditLogs 
        WHERE Timestamp < DATEADD(DAY, -@RetentionDays, GETUTCDATE());
        
        SELECT @@ROWCOUNT as DeletedLogs;
    END');
END

IF NOT EXISTS (SELECT * FROM sys.procedures WHERE name = 'CleanupRateLimitCounters')
BEGIN
    EXEC('CREATE PROCEDURE [dbo].[CleanupRateLimitCounters]
    AS
    BEGIN
        SET NOCOUNT ON;
        
        -- Clean counters older than 24 hours
        DELETE FROM RateLimitCounters 
        WHERE WindowStart < DATEADD(HOUR, -24, GETUTCDATE());
        
        SELECT @@ROWCOUNT as DeletedCounters;
    END');
END

PRINT 'JWT Authentication Database Schema Created Successfully!'
PRINT 'Tables: RefreshTokens, AuditLogs, RateLimitCounters, Users'
PRINT 'Indexes: Optimized for query performance'
PRINT 'Procedures: Cleanup operations for maintenance'
PRINT 'Sample admin user created: admin/Admin@123'
