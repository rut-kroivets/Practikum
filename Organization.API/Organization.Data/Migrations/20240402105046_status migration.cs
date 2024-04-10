using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Organization.Data.Migrations
{
    public partial class statusmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "employees",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "employees");
        }
    }
}
