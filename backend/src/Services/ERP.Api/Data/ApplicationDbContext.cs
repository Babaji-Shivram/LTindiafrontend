using ERP.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ERP.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // User Management
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<LoginHistory> LoginHistories { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UserName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Department).HasMaxLength(100);
                entity.Property(e => e.Position).HasMaxLength(100);
                entity.Property(e => e.EmployeeId).HasMaxLength(50);
                entity.Property(e => e.LastLoginLocation).HasMaxLength(200);
                entity.Property(e => e.Status).HasMaxLength(20).HasDefaultValue("Active");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("GETDATE()");
                
                entity.HasIndex(e => e.UserName).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.EmployeeId).IsUnique();
            });

            // Configure Role entity
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Roles");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("GETDATE()");
                
                entity.HasIndex(e => e.Name).IsUnique();
            });

            // Configure LoginHistory entity
            modelBuilder.Entity<LoginHistory>(entity =>
            {
                entity.ToTable("LoginHistory");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.IpAddress).IsRequired().HasMaxLength(45);
                entity.Property(e => e.UserAgent).HasMaxLength(500);
                entity.Property(e => e.DeviceType).HasMaxLength(50);
                entity.Property(e => e.BrowserName).HasMaxLength(100);
                entity.Property(e => e.Location).HasMaxLength(200);
                entity.Property(e => e.FailureReason).HasMaxLength(500);
                
                entity.HasOne(d => d.User)
                      .WithMany(p => p.LoginHistories)
                      .HasForeignKey(d => d.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure UserSession entity
            modelBuilder.Entity<UserSession>(entity =>
            {
                entity.ToTable("UserSessions");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.IpAddress).IsRequired().HasMaxLength(45);
                entity.Property(e => e.DeviceType).HasMaxLength(50);
                entity.Property(e => e.BrowserName).HasMaxLength(100);
                entity.Property(e => e.Location).HasMaxLength(200);
                
                entity.HasOne(d => d.User)
                      .WithMany(p => p.UserSessions)
                      .HasForeignKey(d => d.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure relationships
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed initial data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin", Description = "System Administrator", IsActive = true, IsSystemRole = true, Priority = 1, CreatedDate = DateTime.Now },
                new Role { Id = 2, Name = "Manager", Description = "Department Manager", IsActive = true, IsSystemRole = false, Priority = 2, CreatedDate = DateTime.Now },
                new Role { Id = 3, Name = "Employee", Description = "Regular Employee", IsActive = true, IsSystemRole = false, Priority = 3, CreatedDate = DateTime.Now }
            );

            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    UserName = "admin",
                    Email = "admin@company.com",
                    FirstName = "System",
                    LastName = "Administrator",
                    PhoneNumber = "+91-9876543212",
                    Department = "Administration",
                    Position = "System Admin",
                    EmployeeId = "EMP000",
                    IsActive = true,
                    IsLocked = false,
                    IsEmailVerified = true,
                    TwoFactorEnabled = true,
                    TwoFactorSetupDate = DateTime.Now.AddDays(-90),
                    CreatedDate = DateTime.Now.AddDays(-365),
                    LastLoginDate = DateTime.Now.AddMinutes(-30),
                    LastLoginLocation = "Mumbai, India",
                    PreviousLoginDate = DateTime.Now.AddHours(-8),
                    LoginAttempts = 0,
                    RoleId = 1,
                    Status = "Active"
                },
                new User
                {
                    Id = 2,
                    UserName = "john.doe",
                    Email = "john.doe@company.com",
                    FirstName = "John",
                    LastName = "Doe",
                    PhoneNumber = "+91-9876543210",
                    Department = "Information Technology",
                    Position = "Senior Developer",
                    EmployeeId = "EMP001",
                    IsActive = true,
                    IsLocked = false,
                    IsEmailVerified = true,
                    TwoFactorEnabled = true,
                    TwoFactorSetupDate = DateTime.Now.AddDays(-30),
                    CreatedDate = DateTime.Now.AddDays(-100),
                    LastLoginDate = DateTime.Now.AddHours(-2),
                    LastLoginLocation = "Mumbai, India",
                    PreviousLoginDate = DateTime.Now.AddDays(-1),
                    LoginAttempts = 0,
                    RoleId = 2,
                    Status = "Active"
                },
                new User
                {
                    Id = 3,
                    UserName = "jane.smith",
                    Email = "jane.smith@company.com",
                    FirstName = "Jane",
                    LastName = "Smith",
                    PhoneNumber = "+91-9876543211",
                    Department = "Human Resources",
                    Position = "HR Executive",
                    EmployeeId = "EMP002",
                    IsActive = true,
                    IsLocked = false,
                    IsEmailVerified = true,
                    TwoFactorEnabled = false,
                    CreatedDate = DateTime.Now.AddDays(-85),
                    LastLoginDate = DateTime.Now.AddHours(-5),
                    LastLoginLocation = "Pune, India",
                    PreviousLoginDate = DateTime.Now.AddDays(-2),
                    LoginAttempts = 0,
                    RoleId = 3,
                    Status = "Active"
                }
            );
        }
    }
}
