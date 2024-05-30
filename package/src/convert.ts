import * as fs from "fs/promises";

async function main() {
  const replaces: [string, string][] = [];

  var content = await fs.readFile("./src/script.ts", "utf-8");
  replaces.forEach((replace) => {
    content = content.replace(replace[0], replace[1]);
  });

  await fs.writeFile("./src/script.txt", content, "utf-8");
}

main();
