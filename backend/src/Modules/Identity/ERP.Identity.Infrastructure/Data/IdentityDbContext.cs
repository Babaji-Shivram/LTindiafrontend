using Microsoft.EntityFrameworkCore;
using ERP.BuildingBlocks.Data.Models;

namespace ERP.Identity.Infrastructure.Data;

public class IdentityDbContext : DbContext
{
    public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
    {
    }

    // Using existing database tables
    public DbSet<BsUserM> BsUserMs { get; set; }
    public DbSet<BsUserToken> BsUserTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure BsUserM entity
        modelBuilder.Entity<BsUserM>(entity =>
        {
            entity.HasKey(e => e.LId);
            entity.ToTable("BsUserM");
            
            entity.Property(e => e.LId).HasColumnName("lId");
            entity.Property(e => e.SName).HasColumnName("sName").HasMaxLength(255);
            entity.Property(e => e.SEmail).HasColumnName("sEmail").HasMaxLength(255);
            entity.Property(e => e.LType).HasColumnName("lType");
            entity.Property(e => e.LRoleId).HasColumnName("lRoleId");
            entity.Property(e => e.SCode).HasColumnName("sCode").HasMaxLength(255);
            entity.Property(e => e.LoginActive).HasColumnName("loginActive");
            entity.Property(e => e.LastLoginDate).HasColumnName("lastLoginDate");
            entity.Property(e => e.IpAddress).HasColumnName("ipAddress").HasMaxLength(50);
            
            // Configure relationship with tokens
            entity.HasMany(d => d.BsUserTokens)
                  .WithOne(p => p.User)
                  .HasForeignKey(d => d.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure BsUserToken entity
        modelBuilder.Entity<BsUserToken>(entity =>
        {
            entity.HasKey(e => e.LId);
            entity.ToTable("BsUserToken");
            
            entity.Property(e => e.LId).HasColumnName("lId");
            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.Token).HasColumnName("token");
            entity.Property(e => e.RefreshToken).HasColumnName("refreshToken");
            entity.Property(e => e.ExpiryDate).HasColumnName("expiryDate");
        });

        base.OnModelCreating(modelBuilder);
    }
}
