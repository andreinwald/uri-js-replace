import {expect, test} from 'vitest'
// @ts-ignore
import Ajv from 'ajv';


test("Ajv eslint config", function () {
    // node_modules ln -s ../ uri-js
    // NODE_OPTIONS=--stack-trace-limit=100000 node ./node_modules/.bin/vitest test/ajv.test.ts

    function ajvOrig(additionalOptions = {}) {
        const ajv = new Ajv({
            meta: false,
            useDefaults: true,
            validateSchema: false,
            missingRefs: "ignore",
            verbose: true,
            schemaId: "auto",
            ...additionalOptions
        });

        // ajv.addMetaSchema(metaSchema);
        // eslint-disable-next-line no-underscore-dangle
        // ajv._opts.defaultMeta = metaSchema.id;
        return ajv;
    };
    const baseConfigProperties = {
        $schema: {type: "string"},
        env: {type: "object"},
        extends: {$ref: "#/definitions/stringOrStrings"},
        globals: {type: "object"},
        overrides: {
            type: "array",
            items: {$ref: "#/definitions/overrideConfig"},
            additionalItems: false
        },
        parser: {type: ["string", "null"]},
        parserOptions: {type: "object"},
        plugins: {type: "array"},
        processor: {type: "string"},
        rules: {type: "object"},
        settings: {type: "object"},
        noInlineConfig: {type: "boolean"},
        reportUnusedDisableDirectives: {type: "boolean"},

        ecmaFeatures: {type: "object"} // deprecated; logs a warning when used
    };
    const configSchema = {
        definitions: {
            stringOrStrings: {
                oneOf: [
                    {type: "string"},
                    {
                        type: "array",
                        items: {type: "string"},
                        additionalItems: false
                    }
                ]
            },
            stringOrStringsRequired: {
                oneOf: [
                    {type: "string"},
                    {
                        type: "array",
                        items: {type: "string"},
                        additionalItems: false,
                        minItems: 1
                    }
                ]
            },

            // Config at top-level.
            objectConfig: {
                type: "object",
                properties: {
                    root: {type: "boolean"},
                    ignorePatterns: {$ref: "#/definitions/stringOrStrings"},
                    ...baseConfigProperties
                },
                additionalProperties: false
            },

            // Config in `overrides`.
            overrideConfig: {
                type: "object",
                properties: {
                    excludedFiles: {$ref: "#/definitions/stringOrStrings"},
                    files: {$ref: "#/definitions/stringOrStringsRequired"},
                    ...baseConfigProperties
                },
                required: ["files"],
                additionalProperties: false
            }
        },
        $ref: "#/definitions/objectConfig"
    };

    let ajv = ajvOrig();
    let validate = ajv.compile(configSchema)
    let valid = validate(['emptyArray']);
    // if (!valid) console.error(validate.errors)
    // expect(valid).toBeTruthy();
});



