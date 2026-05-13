using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerPilot.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTemplateImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 1,
                column: "PreviewImageUrl",
                value: "/templates/modern.png");

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 2,
                column: "PreviewImageUrl",
                value: "/templates/corporate.png");

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 3,
                column: "PreviewImageUrl",
                value: "/templates/minimal.png");

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 4,
                column: "PreviewImageUrl",
                value: "/templates/creative.png");

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 5,
                column: "PreviewImageUrl",
                value: "/templates/ats.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 1,
                column: "PreviewImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 2,
                column: "PreviewImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 3,
                column: "PreviewImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 4,
                column: "PreviewImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "ResumeTemplates",
                keyColumn: "Id",
                keyValue: 5,
                column: "PreviewImageUrl",
                value: null);
        }
    }
}
