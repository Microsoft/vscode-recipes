# Python debugging in VS Code

by [Akshay Avinash (@akshay11298)](https://github.com/akshay11298)

This recipe shows how to debug a Python application using the VS Code extension [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) .

## Getting Started

1. Make sure you have the latest version of [VS Code](https://code.visualstudio.com/) installed.

2. Make sure you have the extension [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) installed.

3. Optionally you can also install a linter to throw out the errors.


## Configure VS Code debugging with a launch.json file

1. Click on the Debugging icon in the Activity Bar to bring up the Debug view.

2. Then click on the gear icon to configure a launch.json file, select **Launch** for the environment.

3. You may get an option of the environments available, select **Python**.

4. The generated json will have a lot of the configurations. You can keep all of them or only the ones you want.

    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Python: Current File (Integrated Terminal)",
                "type": "python",
                "request": "launch",
                "program": "${file}",
                "console": "integratedTerminal"
            },
            {
                "name": "Python: Attach",
                "type": "python",
                "request": "attach",
                "port": 5678,
                "host": "localhost"
            },
            {
                "name": "Python: Module",
                "type": "python",
                "request": "launch",
                "module": "enter-your-module-name-here",
                "console": "integratedTerminal"
            },
            {
                "name": "Python: Django",
                "type": "python",
                "request": "launch",
                "program": "${workspaceFolder}/manage.py",
                "console": "integratedTerminal",
                "args": [
                    "runserver",
                    "--noreload",
                    "--nothreading"
                ],
                "django": true
            },
            {
                "name": "Python: Flask",
                "type": "python",
                "request": "launch",
                "module": "flask",
                "env": {
                    "FLASK_APP": "app.py"
                },
                "args": [
                    "run",
                    "--no-debugger",
                    "--no-reload"
                ],
                "jinja": true
            },
            {
                "name": "Python: Current File (External Terminal)",
                "type": "python",
                "request": "launch",
                "program": "${file}",
                "console": "externalTerminal"
            }
        ]
    }
    ```

5. For basic Python debugging of files, you will only need the following configuration:
    ```js
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Python: Current File (Integrated Terminal)",
                "type": "python",
                "request": "launch",
                "program": "${file}",
                "console": "integratedTerminal"
            },
            {
                "name": "Python: Current File (External Terminal)",
                "type": "python",
                "request": "launch",
                "program": "${file}",
                "console": "externalTerminal"
            }
        ]
    }
    ```

## Start Debugging.

1. Open your Python file in VS Code.

2. Go to the Debug view, select the **Start Debugging** then press <kbd>F5</kbd> or click the green play button.

3. VS Code should now show the rails server logs.

4. Go ahead and set a breakpoint in any of the files by clicking on the space before the line number. A red dot should appear to show a breakpoint.

5. Press <kbd>F5</kbd> to start debugging.

6. Your breakpoint should now be hit.

7. To continue, press <kbd>F5</kbd> again, till you reach the end.
