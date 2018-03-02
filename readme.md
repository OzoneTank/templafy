Templafy
========

## Install

    npm install -g templafy

## Usage

    Usage: templafy <options> [template | json] [path]

    Options:
      -h, --help
      -p, --print                  print
      -t, --template               forces template mode even if json file

    Options in json mode:
      -i, --interactive            prompts input from user

    Options in template mode:
      --vars=vars                  info to use for template

    Options in vars:
      -m, --mode=noreplace         (default) writes file if none exists
                 replace           replaces file
                 prepend           adds data to beginning of file
                 append            adds data to file
                 [#]               inserts at line
      --leftVar=leftVar            looks for match /*{ by default
      --rightVar=rightVar          looks for match }*/ by default


## Examples

### Template Example

  make a template: message_js

    console.log('/*{message}*/');

  run:

    >templafy message_js helloWorld.js
    helloWorld.js message: hello world
    >templafy message_js templafyRules.js
    templafyRules.js message: templafy rules!

  result: ./helloWorld.js

    console.log('hello world');

  result: ./templafyRules.js

    console.log('templafy rules!');

### Structure.json Example

  make a structure: test.json

    {
      "src": {
        "foo.js" {
          "template": "message_js",
          "message": "foo"
        },
        "bar.js" {
          "template": "message_js",
          "message": "bar"
        }
      }
    }

  run:

    >templafy test.json build

  generates:

    build/
      src/
        foo.js
        bar.js
