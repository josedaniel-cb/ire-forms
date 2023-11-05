const { execSync } = require("child_process")

// '/const cssTemplate = css\`/r node_modules/bootstrap/dist/css/bootstrap.css' \
const sedCommand = `
# Copy Bootstrap CSS
cp src/components/stateful/bootstrap2.ts src/components/stateful/bootstrap2.ts.backup;
sed -i \
  '/const text = \`/r node_modules/bootstrap/dist/css/bootstrap.min.css' \
  src/components/stateful/bootstrap2.ts;

# Replace some CSS selectors
sed -i 's/:root/:host/g' src/components/stateful/bootstrap2.ts

# Compile
rm -R lib;
tsc;

# Restore
cp src/components/stateful/bootstrap2.ts.backup src/components/stateful/bootstrap2.ts;
rm src/components/stateful/bootstrap2.ts.backup;
`

try {
  execSync(sedCommand, { stdio: "inherit", shell: "/bin/bash" })
  console.log("CSS copiado exitosamente.")
} catch (error) {
  console.error("Error al copiar el CSS:", error)
}
