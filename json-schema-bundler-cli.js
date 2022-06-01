#!/usr/bin/env node

const $RefParser = require('json-schema-ref-parser');
const minimist = require('minimist');
const path = require('path');

const argv = minimist(process.argv.slice(2), {
  boolean: ['h', 'p', 's'],
  alias: {
    h: 'help',
    p: 'pretty',
    s: 'silent',
  },
});

if (argv.h || argv._.length < 1) {
  console.error(
    'JSON Schema Bundler (%s)\n\n\x1b[33mUsage:\x1b[0m\n  %s\n\n\x1b[33mOptions:\x1b[0m\n  %s\n  %s\n  %s',
    process.env['JSON_SCHEMA_BUNDLER_VERSION'],
    `${path.basename(process.argv[1])} [options] <input>`,
    '-h, --help    Display this help message',
    '-p, --pretty  Pretty print output',
    '-s, --silent  Silent mode'
  );
  process.exit(argv.h ? 0 : 1);
}

const input = path.resolve(argv._[0]);

argv.s || console.error(`Bundling ${input}`);

(async () => {
  let schema;

  try {
    schema = await $RefParser.dereference(input);
  } catch (err) {
    argv.s || console.error(err);
    process.exit(1);
  }

  console.log(JSON.stringify(schema, undefined, argv.p ? 2 : undefined));
})();
