# Debugging node-tap tests in VS Code

by [Trivikram Kamat](https://github.com/trivikr)

This recipe shows how to use the built-in Node Debugger to debug [node-tap](https://github.com/tapjs/node-tap) tests.

## The example

The test folder contains two files that test the lib/calc.js file.

To try the example you'll need to install dependencies by running:

`npm install`

## Configure launch.json File for your test framework

* Click on the Debugging icon in the Activity Bar to bring up the Debug view.
  Then click on the gear icon to configure a launch.json file, selecting **Node** for the environment:

* Replace content of the generated launch.json with the following configurations:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Tap current file",
      "program": "${workspaceFolder}/${relativeFile}",
      "cwd": "${workspaceFolder}"
    }
  ]
}
```


## Debugging the current test

You can debug the test you're editing by following the steps below:

1. Set a breakpoint in a test file

2. Go to the Debug view, select the **'Tap current file'** configuration, then press F5 or click the green play button.

3. Your breakpoint will now be hit
