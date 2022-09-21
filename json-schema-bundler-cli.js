#!/usr/bin/env node

const $RefParser = require('@apidevtools/json-schema-ref-parser');
const minimist = require('minimist');
const path = require('path');
const pkg = require('./package.json');

const argv = minimist(process.argv.slice(2), {
    boolean: ['d', 'h', 'p', 's', 'v'],
    alias: {
        d: 'dereference',
        h: 'help',
        p: 'pretty',
        s: 'silent',
        v: 'version',
    },
});

const colors = {
    end: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    magenta: '\x1b[35m',
};

if (argv.v) {
    console.log(pkg.version);
    process.exit(0);
}

if (argv.h || argv._.length < 1) {
    console.error(
        `JSON Schema Bundler\n\n${colors.yellow}Usage:${colors.end}\n  %s\n\n${colors.yellow}Arguments:${colors.end}\n  %s\n\n${colors.yellow}Options:${colors.end}\n  %s\n\n${colors.yellow}Examples:${colors.end}\n  %s`,
        `${path.basename(process.argv[1])} [options] <input>`,
        `${colors.green}input${colors.end}  The path of the input schema file`,
        [
            `${colors.green}-d, --dereference${colors.end}  Replacing each reference with its resolved value`,
            `${colors.green}-h, --help${colors.end}         Display this help message`,
            `${colors.green}-p, --pretty${colors.end}       Pretty print output`,
            `${colors.green}-s, --silent${colors.end}       Silent mode`,
            `${colors.green}-v, --version${colors.end}      Print version number`,
        ].join('\n  '),
        [
            [
                `Bundle all references in ${colors.magenta}schema.json${colors.end} with internal $ref pointers and print output to ${colors.magenta}stdout${colors.end}:`,
                `${colors.green}${path.basename(process.argv[1])} schema.json${colors.end}`,
            ].join('\n\n    '),
            [
                `Dereference all references in ${colors.magenta}schema.json${colors.end} and print output to ${colors.magenta}stdout${colors.end}:`,
                `${colors.green}${path.basename(process.argv[1])} -d schema.json${colors.end}`,
            ].join('\n\n    '),
        ].join('\n\n  '),
    );
    process.exit(argv.h ? 0 : 1);
}

const input = path.resolve(argv._[0]);

argv.s || console.error(`Bundling ${input}`);

(async () => {
    let schema;

    try {
        if (argv.d) {
            schema = await $RefParser.dereference(input);
        } else {
            schema = await $RefParser.bundle(input);
        }
    } catch (err) {
        argv.s || console.error(err);
        process.exit(1);
    }

    console.log(JSON.stringify(schema, undefined, argv.p ? 2 : undefined));
})();
