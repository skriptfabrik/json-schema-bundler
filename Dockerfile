FROM node:18.2.0-alpine

LABEL maintainer="Daniel Schröder <daniel.schroeder@skriptfabrik.com>"

ARG JSON_SCHEMA_BUNDLER_VERSION=latest

ENV JSON_SCHEMA_BUNDLER_VERSION=${JSON_SCHEMA_BUNDLER_VERSION}
ENV JSON_SCHEMA_REF_PARSER_VERSION=9.0.9
ENV MINIMIST_VERSION=1.2.6

COPY json-schema-bundler-cli.js /usr/local/lib/json-schema-bundler-cli.js

RUN set -eux; \
    npm install -g \
      json-schema-ref-parser@${JSON_SCHEMA_REF_PARSER_VERSION} \
      minimist@${MINIMIST_VERSION}; \
    rm -Rf ~/.npm; \
    ln -s /usr/local/lib/json-schema-bundler-cli.js /usr/local/bin/json-schema-bundler

ENTRYPOINT [ "json-schema-bundler" ]
