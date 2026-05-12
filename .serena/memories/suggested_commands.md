# Suggested Commands

## Running the Application
### Backend
```powershell
cd backend
dotnet run --project src/CareerPilot.API/CareerPilot.API.csproj
```

### Frontend
```powershell
cd frontend
npm run dev
```

## Database Migrations
```powershell
cd backend
dotnet ef migrations add InitialCreate --project src/CareerPilot.Persistence --startup-project src/CareerPilot.API
dotnet ef database update --project src/CareerPilot.Persistence --startup-project src/CareerPilot.API
```

## Testing
```powershell
dotnet test
```
