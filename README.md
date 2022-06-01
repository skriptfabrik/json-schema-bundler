# JSON Schema Bundler

The missing CLI for the [JSON Schema $Ref Parser](https://github.com/APIDevTools/json-schema-ref-parser).

## Usage

```bash
$ docker run --rm skriptfabrik/json-schema-bundler                      
JSON Schema Bundler (latest)

Usage:
  json-schema-bundler [options] <input>

Options:
  -h, --help    Display this help message
  -p, --pretty  Pretty print output
  -s, --silent  Silent mode
```

Use the following command to bundle (dereference) all references in `openapi.yaml` into a single file `openapi.json`:

```bash
docker run --rm skriptfabrik/json-schema-bundler openapi.yaml > openapi.json
```
