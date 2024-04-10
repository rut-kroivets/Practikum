using AutoMapper.Execution;
using Microsoft.EntityFrameworkCore;
using Organization.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> employees { get; set; }
        public DbSet<Position> positions { get; set; }
        public DbSet<Role> roles { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=organization_DB");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Position>()
                .HasOne(v => v.Role)
                .WithMany()
                .HasForeignKey(v => v.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Employee>()
                .HasMany(m => m.Positions)
                .WithOne(v => v.Employee)
                .OnDelete(DeleteBehavior.Cascade); // Configure cascade delete behavior
            base.OnModelCreating(modelBuilder);
        }
    }
}
