$root = "C:\BOOKS Project"

# Create root
New-Item -ItemType Directory -Force -Path $root | Out-Null

# Folders
$folders = @(
    "app",
    "app\library",
    "app\book\[id]",
    "app\analytics",
    "app\add",
    "components",
    "components\books",
    "components\layout",
    "components\home",
    "components\analytics",
    "lib",
    "prisma",
    "public",
    "public\covers"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path (Join-Path $root $folder) | Out-Null
}

# Files
$files = @(
    "app\page.tsx",
    "app\library\page.tsx",
    "app\book\[id]\page.tsx",
    "app\analytics\page.tsx",
    "app\add\page.tsx",

    "components\books\BookCard.tsx",
    "components\books\BookGrid.tsx",
    "components\books\ProgressBar.tsx",

    "components\layout\Sidebar.tsx",
    "components\layout\MobileNav.tsx",

    "components\home\ContinueReading.tsx",
    "components\home\RecentBooks.tsx",
    "components\home\Stats.tsx",

    "components\analytics\ReadingStats.tsx",
    "components\analytics\GenreStats.tsx",

    "lib\db.ts",
    "lib\books.ts",
    "lib\analytics.ts",

    "prisma\schema.prisma"
)

foreach ($file in $files) {
    $path = Join-Path $root $file

    if (-not (Test-Path $path)) {
        New-Item -ItemType File -Force -Path $path | Out-Null
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BOOKS PROJECT STRUCTURE CREATED" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Location: $root" -ForegroundColor Yellow
Write-Host ""