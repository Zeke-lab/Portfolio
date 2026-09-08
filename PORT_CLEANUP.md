# Development Port Cleanup

Run these commands from PowerShell at the project root.

## Clean project ports

This stops processes using the backend and Vite development ports:

```powershell
$ports = 4000,4010,5173,5174,5175,5176,5177
$processIds = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $ports -contains $_.LocalPort } |
  Select-Object -ExpandProperty OwningProcess -Unique
$processIds | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

## Check project ports

```powershell
$ports = 4000,4010,5173,5174,5175,5176,5177
Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $ports -contains $_.LocalPort } |
  Select-Object LocalAddress,LocalPort,OwningProcess
```

No output means those ports are free.

## Stop every Node process

Use this only when you want to stop all Node.js applications currently running on your computer, not just this portfolio project:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

## Start the project again

Backend:

```powershell
Set-Location .\backend
npm run dev
```

Frontend, in a second PowerShell window:

```powershell
Set-Location .\frontend
npm run dev -- --host localhost --port 5173
```
