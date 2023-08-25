using Microsoft.EntityFrameworkCore.Migrations;

namespace IoTMonitoring.Data.Migrations
{
    public partial class AddState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "AverageValues",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "AverageValues");
        }
    }
}
