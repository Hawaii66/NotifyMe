#!/usr/bin/env node
// File: index.ts

import { Command } from "commander";
import { z } from "zod";
import * as fs from "fs/promises";
import { getPackageManager } from "./packagemanager";
import { execa } from "execa";

const ArgsSchema = z
  .object({
    serviceId: z
      .string({ message: "Service id must be a string" })
      .regex(/^\d+$/, { message: "Service id must only consist of digits" })
      .transform(Number),
    secret: z.string(),
    writeEnv: z.enum(["yes", "no"]),
    destination: z.string(),
  })
  .strict();

async function WriteFile(options: z.infer<typeof ArgsSchema>) {
  const directory = process.cwd();
  const path = `${directory}${options.destination}`;

  const dir = path.split(".")[0].split("/");
  const dirPath = dir.slice(0, dir.length - 1).join("/");

  console.log("Writing script to: ", path);

  await fs.mkdir(dirPath, { recursive: true });

  const content = await fs.readFile("./src/script.txt");
  await fs.writeFile(path, content, "utf-8");

  if (options.writeEnv) {
    console.log("Writing environment variables to: .env");
    var envContent = await fs.readFile(".env", "utf-8");

    envContent += `\n\nNOTIFY_ME_SERVICE_ID=${options.serviceId}\nNOTIFY_ME_SECRET=${options.secret}`;
    await fs.writeFile(".env", envContent, "utf-8");
  }

  console.log("Done writing to files");
}

async function InstallDependencies() {
  const cwd = process.cwd();
  const packageManager = await getPackageManager(cwd);

  const dependencies = ["zod"];

  console.log("Installing dependencies with packagemanager: ", packageManager);
  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...dependencies],
    {
      cwd,
    }
  );

  console.log("Done installing packages");
}

const init = new Command()
  .name("init")
  .description("add the code")
  .option("--service-id <string>", "The id of your service")
  .option("--secret <string>", "The secret of your service")
  .option(
    "--write-env <string>",
    "Write the environment variables to the .env file in your root directory",
    "no"
  )
  .option(
    "--destination <string>",
    "Where to write the file",
    "/test/notifyme.ts"
  )
  .action(async (opts) => {
    try {
      const parsedOptions = ArgsSchema.parse(opts);

      await WriteFile(parsedOptions);
      await InstallDependencies();
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.log("- - Command parse fail - -");
        e.issues.forEach((issue) =>
          console.log(`\t- ${issue.code}: ${issue.message}`)
        );
        console.log("- - - - - - - - - - - - - -");
      }
      throw e;
    }
  });
const program = new Command()
  .name("Notify Me")
  .description("add the package for sending logs")
  .version("1.0.0", "-v, --version", "display the version number")
  .addCommand(init);

program.parse();
