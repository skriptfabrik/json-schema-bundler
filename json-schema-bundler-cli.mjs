#!/usr/bin/env node

import $RefParser from '@apidevtools/json-schema-ref-parser';
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import minimist from 'minimist';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(await readFile(path.join(__dirname, 'package.json')));

const argv = minimist(process.argv.slice(2), {
    boolean: ['d', 'h', 'p', 's', 'v', 'y'],
    string: ['c'],
    alias: {
        c: 'circular',
        d: 'dereference',
        h: 'help',
        p: 'pretty',
        s: 'silent',
        v: 'version',
        y: 'yaml',
    },
});

if (argv.v) {
    console.log(pkg.version);
    process.exit(0);
}

if (argv.h || argv._.length < 1) {
    console.error(
        `JSON Schema Bundler\n\n${chalk.yellow('Usage:')}\n%s\n\n${chalk.yellow('Arguments:')}\n%s\n\n${chalk.yellow('Options:')}\n%s\n\n${chalk.yellow('Examples:')}\n%s`,
        `  ${path.basename(process.argv[1])} [options] <input>`,
        `  ${chalk.green('input')}  The path of the input schema file`,
        [
            `  ${chalk.green('-c, --circular')}     Resolving circular reference strategy, when doing dereference (-d). Possible values: true, false, ignore (default: true)`,
            `  ${chalk.green('-d, --dereference')}  Replacing each reference with its resolved value`,
            `  ${chalk.green('-h, --help')}         Display this help message`,
            `  ${chalk.green('-p, --pretty')}       Pretty print output`,
            `  ${chalk.green('-s, --silent')}       Silent mode`,
            `  ${chalk.green('-v, --version')}      Print version number`,
            `  ${chalk.green('-y, --yaml')}         Output as YAML document instead of JSON`,
        ].join('\n'),
        [
            `  Bundle all references in ${chalk.magenta('schema.json')} with internal $ref pointers and print output to ${chalk.magenta('stdout')}:`,
            ``,
            `    ${chalk.green(`${path.basename(process.argv[1])} schema.json`)}`,
            ``,
            `  Dereference all references in ${chalk.magenta('schema.json')} and print output to ${chalk.magenta('stdout')}:`,
            ``,
            `    ${chalk.green(`${path.basename(process.argv[1])} -d schema.json`)}`,
        ].join('\n')
    );
    process.exit(argv.h ? 0 : 1);
}

const input = path.resolve(argv._[0]);

argv.s || console.error(`Bundling ${input}`);

let schema;

try {
    if (argv.d) {
        let circular = true; // default value for `dereference`
        switch (argv.c) {
            case 'false':
                circular = false;
                break;
            case 'ignore':
                circular = argv.c;
                break;
            default:
                break;
        }
        schema = await $RefParser.dereference(input, {dereference: {circular: circular}});
    } else {
        schema = await $RefParser.bundle(input);
    }
} catch (err) {
    argv.s || console.error(err);
    process.exit(1);
}

if (argv.y) {
    console.log(YAML.stringify(schema));
} else {
    console.log(JSON.stringify(schema, undefined, argv.p ? 2 : undefined));
}
