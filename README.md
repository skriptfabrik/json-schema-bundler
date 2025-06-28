# JSON Schema Bundler

[![NPM Version](https://img.shields.io/npm/v/@skriptfabrik/json-schema-bundler)](https://www.npmjs.com/package/@skriptfabrik/json-schema-bundler)
[![NPM Downloads](https://img.shields.io/npm/dt/@skriptfabrik/json-schema-bundler)](https://www.npmjs.com/package/@skriptfabrik/json-schema-bundler)
[![Continuous Integration](https://img.shields.io/github/actions/workflow/status/skriptfabrik/json-schema-bundler/ci.yml)](https://github.com/skriptfabrik/json-schema-bundler/actions/workflows/ci.yml)

> The missing CLI for the [JSON Schema $Ref Parser](https://github.com/APIDevTools/json-schema-ref-parser)

## Installation

Install using [npm](https://docs.npmjs.com/about-npm/) as global package:

```bash
npm install -g @skriptfabrik/json-schema-bundler
```

## Usage

```bash
json-schema-bundler --help
```

```text
JSON Schema Bundler

Usage:
  json-schema-bundler [options] <input>

Arguments:
  input  The path of the input schema file

Options:  
  -c, --circular     Resolving circular reference strategy, when doing dereference (-d). Possible values: true, false, ignore (default: true)
  -d, --dereference  Replacing each reference with its resolved value
  -h, --help         Display this help message
  -p, --pretty       Pretty print output
  -s, --silent       Silent mode
  -v, --version      Print version number
  -y, --yaml         Output as YAML document instead of JSON

Examples:
  Bundle all references in schema.json with internal $ref pointers and print output to stdout:

    json-schema-bundler schema.json

  Dereference all references in schema.json and print output to stdout:

    json-schema-bundler -d schema.json
```

## Docker

Use the following command to bundle all references in `schema.json` and print the output to `stdout`:

```bash
docker run --rm -v `pwd`:/work -w /work skriptfabrik/json-schema-bundler schema.json
```

To dereference all references in `schema.json` and print the output to `stdout` add the `-d` option:

```bash
docker run --rm -v `pwd`:/work -w /work skriptfabrik/json-schema-bundler -d schema.json
```
