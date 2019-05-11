"use strict";

import clear from "rollup-plugin-clear";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";
<<<<<<< HEAD
import multiEntry from "rollup-plugin-multi-entry";
=======
>>>>>>> 64a9bbc54713b5781262ddec53a805d6e3f1ceec

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
<<<<<<< HEAD
} else if ((cfg = require("./screeps.json")[dest]) == null) {
=======
} else if ((cfg = require("./screeps")[dest]) == null) {
>>>>>>> 64a9bbc54713b5781262ddec53a805d6e3f1ceec
  throw new Error("Invalid upload destination");
}

export default {
  input: "src/main.ts",
  output: {
<<<<<<< HEAD
    file: "dist/main.js",
=======
    file: "../main.js",
>>>>>>> 64a9bbc54713b5781262ddec53a805d6e3f1ceec
    format: "cjs",
    sourcemap: true
  },

  plugins: [
<<<<<<< HEAD
    // multiEntry(),
    clear({ targets: ["dist"] }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    screeps({ config: cfg, dryRun: cfg == null })
=======
    clear({ targets: ["dist"] }),
    resolve(),
    commonjs(),
    typescript({tsconfig: "./tsconfig.json"}),
    screeps({config: cfg, dryRun: cfg == null})
>>>>>>> 64a9bbc54713b5781262ddec53a805d6e3f1ceec
  ]
}
