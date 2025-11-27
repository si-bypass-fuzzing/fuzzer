// Import the necessary modules
const fs = require("fs-extra");
const path = require("path");
const webidl2 = require("@ias/webidl2");

/**
 * Comment out preprocessor`#` directives
 * https://github.com/mozilla/gecko-webidl/blob/main/lib/index.js
 * @param {string} text
 */
function commentPreprocessorDirectives(text) {
    return text
        .split("\n")
        .map((l) => (l.startsWith("#") ? `//${l}` : l))
        .join("\n");
}

function stripTrailingCommas(idlText) {
    // remove any comma that is immediately followed by ) or ] or } or ;
    return idlText.replace(/,[\s\n]*(?=[$$\};\]])/g, "");
}

// Function to parse an .idl file and save it as a .json file
async function parseAndSaveIDLFile(sourceFilePath, destFilePath) {
    try {
        const data = await fs.readFile(sourceFilePath, { encoding: "utf-8" });
        const preprocessedData = stripTrailingCommas(
            commentPreprocessorDirectives(data),
        );
        const syntaxTree = webidl2.parse(preprocessedData);
        await fs.writeFile(destFilePath, JSON.stringify(syntaxTree, null, 2));
        // console.log(`Successfully processed and saved to ${destFilePath}`);
    } catch (error) {
        console.error(`Error processing ${sourceFilePath}: ${error.message}`);
    }
}

// Function to process a single file or a directory of .idl files
async function processInput(inputPath, outputPath) {
    const stats = await fs.stat(inputPath);
    if (stats.isFile() && path.extname(inputPath) === ".idl") {
        // If input is a file, parse it and write output to the same name with .json extension
        const destFilePath = outputPath
            ? outputPath
            : inputPath.replace(".idl", ".json");
        await parseAndSaveIDLFile(inputPath, destFilePath);
    } else if (stats.isDirectory()) {
        // If input is a directory, parse all .idl files and write outputs to the destination directory
        const files = await fs.readdir(inputPath);
        for (let file of files) {
            if (path.extname(file) === ".idl") {
                const sourceFilePath = path.join(inputPath, file);
                const destFilePath = path.join(
                    outputPath,
                    path.basename(file, ".idl") + ".json",
                );
                await parseAndSaveIDLFile(sourceFilePath, destFilePath);
            }
        }
    } else {
        console.error("The input path is neither a .idl file nor a directory.");
    }
}

// Check command-line arguments
if (process.argv.length < 3) {
    console.log("Usage: node parse.js <input_path> [output_path]");
    console.log(
        "input_path can be a .idl file or a directory containing .idl files.",
    );
    console.log(
        "output_path is optional for a single file, mandatory if input_path is a directory.",
    );
    process.exit(1);
}

// Retrieve command-line arguments
const inputPath = process.argv[2];
const outputPath = process.argv[3];

// Process the input
processInput(inputPath, outputPath).catch(console.error);
