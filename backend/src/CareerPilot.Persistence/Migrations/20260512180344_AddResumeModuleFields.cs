using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerPilot.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddResumeModuleFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "ResumeLanguages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ResumeCertificates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "ResumeCertificates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "ResumeAwards",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "ResumeLanguages");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ResumeCertificates");

            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "ResumeCertificates");

            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "ResumeAwards");
        }
    }
}
