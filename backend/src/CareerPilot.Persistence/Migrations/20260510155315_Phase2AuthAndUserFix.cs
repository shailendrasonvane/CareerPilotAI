using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerPilot.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Phase2AuthAndUserFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedDate", "Email", "FirstName", "IsActive", "IsEmailVerified", "LastName", "PasswordHash", "PasswordResetToken", "PhoneNumber", "ProfileImageUrl", "RefreshToken", "RefreshTokenExpiryTime", "ResetTokenExpires", "Role", "UpdatedDate", "VerificationToken", "VerifiedAt" },
                values: new object[] { 1, new DateTime(2026, 5, 10, 15, 48, 42, 335, DateTimeKind.Utc).AddTicks(7801), "admin@careerpilot.com", "Admin", true, true, "User", "AQAAAAIAAYagAAAAECTfCkZo5PCHSOtJ4HIKvUeiS6guPSv7KY01ttHjwUKNZ3JbjFiWan/k5sVvYQZKhg==", null, null, null, null, null, null, "Admin", null, null, null });
        }
    }
}
