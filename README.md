# JSON Schema Bundler

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

```bash
JSON Schema Bundler (latest)

Usage:
  json-schema-bundler [options] <input>

Options:
  -h, --help    Display this help message
  -p, --pretty  Pretty print output
  -s, --silent  Silent mode

Examples:
  json-schema-bundler -ps schema.json
```

## Docker

Use the following command to bundle (dereference) all references in `schema.json` and print the output to `stdout`:

```bash
docker run --rm -v `pwd`:/work -w /work skriptfabrik/json-schema-bundler -ps schema.json
```

It is also possible to print the status logs to `stderr` and redirect `stdout` to a file:

```bash
docker run --rm -v `pwd`:/work -w /work skriptfabrik/json-schema-bundler -p schema.json > output.json
```
