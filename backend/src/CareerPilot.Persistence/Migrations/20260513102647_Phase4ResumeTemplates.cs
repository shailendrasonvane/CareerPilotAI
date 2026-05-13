using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CareerPilot.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Phase4ResumeTemplates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FontSize",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LayoutSpacing",
                table: "Resumes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SectionSpacing",
                table: "Resumes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TemplateId",
                table: "Resumes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ResumeTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TemplateKey = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PreviewImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPremium = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResumeTemplates", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ResumeTemplates",
                columns: new[] { "Id", "CreatedDate", "IsActive", "IsPremium", "PreviewImageUrl", "TemplateKey", "TemplateName", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, false, null, "modern", "Modern Professional", null },
                    { 2, new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, false, null, "corporate", "Corporate Classic", null },
                    { 3, new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, false, null, "minimal", "Minimalist Clean", null },
                    { 4, new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, true, null, "creative", "Creative Edge", null },
                    { 5, new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, false, null, "ats", "ATS Optimizer", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Resumes_TemplateId",
                table: "Resumes",
                column: "TemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resumes_ResumeTemplates_TemplateId",
                table: "Resumes",
                column: "TemplateId",
                principalTable: "ResumeTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resumes_ResumeTemplates_TemplateId",
                table: "Resumes");

            migrationBuilder.DropTable(
                name: "ResumeTemplates");

            migrationBuilder.DropIndex(
                name: "IX_Resumes_TemplateId",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "FontSize",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "LayoutSpacing",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "SectionSpacing",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "Resumes");
        }
    }
}
