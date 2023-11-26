const { execSync } = require("child_process")

const srcFilePath = "src/components/stateful/bootstrap2.ts"
const backupSrcFilePath = `${srcFilePath}.backup`
const cssFilePath = "node_modules/bootstrap/dist/css/bootstrap.min.css"

const sedCommand = `
# Copy Bootstrap CSS
cp ${srcFilePath} ${backupSrcFilePath};
sed -i \
  '/const text = \`/r ${cssFilePath}' \
  ${srcFilePath};

# Replace some CSS selectors
sed -i 's/:root/:host/g' ${srcFilePath}

# Compile
rm -R lib;
tsc;

# Restore
rm ${srcFilePath};
cp ${backupSrcFilePath} ${srcFilePath};
rm ${backupSrcFilePath};
`

try {
  execSync(sedCommand, { stdio: "inherit", shell: "/bin/bash" })
  console.log("CSS copiado exitosamente.")
} catch (error) {
  console.error("Error al copiar el CSS:", error)
}
