# CareerPilot AI Onboarding

## Project Purpose
CareerPilot AI is a full-stack SaaS application designed for career guidance, likely involving resume building and job search assistance.

## Tech Stack
- **Backend**: ASP.NET Core 9, Entity Framework Core, SQL Server, JWT Authentication.
- **Frontend**: React, Vite, Tailwind CSS, Redux.
- **Architecture**: Clean Architecture (API, Application, Domain, Infrastructure, Persistence).

## Code Style and Conventions
- **C#**: Standard .NET naming conventions (PascalCase for classes/methods, camelCase for local variables). Clean Architecture layers are well-defined.
- **JavaScript**: React components, Redux for state management.

## Key Components
- `AuthService`: Handles registration, login, forgot password, and reset password.
- `EmailService`: Currently a mock implementation that only logs emails to the console.
- `UnitOfWork`: Generic repository pattern for data access.

## Current Issues
- `EmailService` does not actually send emails; it only logs them. This is why "Reset Password" emails are not received.

## Commands
- **Backend**: `dotnet run --project backend/src/CareerPilot.API/CareerPilot.API.csproj`
- **Frontend**: `npm run dev` in `frontend` directory.
