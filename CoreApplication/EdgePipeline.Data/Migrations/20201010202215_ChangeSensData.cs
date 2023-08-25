using Microsoft.EntityFrameworkCore.Migrations;

namespace IoTMonitoring.Data.Migrations
{
    public partial class ChangeSensData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SensorsValues_Sensors_SensorId",
                table: "SensorsValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SensorsValues",
                table: "SensorsValues");

            migrationBuilder.DropColumn(
                name: "PersonsJson",
                table: "SensorsValues");

            migrationBuilder.RenameTable(
                name: "SensorsValues",
                newName: "SensorValue");

            migrationBuilder.RenameIndex(
                name: "IX_SensorsValues_SensorId",
                table: "SensorValue",
                newName: "IX_SensorValue_SensorId");

            migrationBuilder.AlterColumn<int>(
                name: "SensorId",
                table: "SensorValue",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FreqValuesJson",
                table: "SensorValue",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SensorValue",
                table: "SensorValue",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SensorValue_Sensors_SensorId",
                table: "SensorValue",
                column: "SensorId",
                principalTable: "Sensors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SensorValue_Sensors_SensorId",
                table: "SensorValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SensorValue",
                table: "SensorValue");

            migrationBuilder.DropColumn(
                name: "FreqValuesJson",
                table: "SensorValue");

            migrationBuilder.RenameTable(
                name: "SensorValue",
                newName: "SensorsValues");

            migrationBuilder.RenameIndex(
                name: "IX_SensorValue_SensorId",
                table: "SensorsValues",
                newName: "IX_SensorsValues_SensorId");

            migrationBuilder.AlterColumn<int>(
                name: "SensorId",
                table: "SensorsValues",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "PersonsJson",
                table: "SensorsValues",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SensorsValues",
                table: "SensorsValues",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SensorsValues_Sensors_SensorId",
                table: "SensorsValues",
                column: "SensorId",
                principalTable: "Sensors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
