const fs = require("fs");
const path = require("path");

console.log("🧹 Suppression des console.log...");

function cleanConsoleLog(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      cleanConsoleLog(filePath);
    } else if (file.name.match(/\.(js|jsx|ts|tsx)$/)) {
      const content = fs.readFileSync(filePath, "utf8");
      const newContent = content
        .split("\n")
        .filter((line) => !line.includes("console.log"))
        .join("\n");

      fs.writeFileSync(filePath, newContent);
    }
  });
}

// Nettoyer API/
if (fs.existsSync("API")) {
  cleanConsoleLog("API");
}

// Nettoyer Go-hope-app/
if (fs.existsSync("Go-hope-app")) {
  cleanConsoleLog("Go-hope-app");
}

console.log("✅ Terminé ! Tous les console.log ont été supprimés.");
