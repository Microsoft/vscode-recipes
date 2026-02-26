# Next.js debugging in VS Code (Node and Chrome)

By [Kenneth Auchenberg](https://twitter.com/auchenberg)

This recipe shows how to use the built-in JavaScript deubgger in VS Code to debug [next.js](https://github.com/zeit/next.js) applications.

Next.js allows ReactJS to be used both on the server and client, which is a great match for VS Code, as we can debug both the server and client at the same time! This means that you'll need to use two debugger instances within VS Code to debug both ends.

**Note:** Please make sure you are using **Next.js 4.2.0-canary.1 or newer**, as our debuggers relies on source maps, and there's been a bunch of improvements for this in next.js.

## Getting Started

1. Make sure to have the latest version of VS Code installed.

2. This guide assumes that you are using the official sample app [nextgram](https://github.com/zeit/nextgram). Clone the repo to get started:
    >
    ```
    git clone git@github.com:now-examples/nextgram.git
    cd nextgram
    npm install
    code .
    ```

## Configure launch.json File

- Click on the Debugging icon in the Activity Bar to bring up the Debug view.
Then click on the gear icon to configure a launch.json file, selecting **Chrome** for the environment:

   ![configure_launch](configure_launch.png)

- Replace content of the generated launch.json with the following two configurations:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Next: Chrome",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Next: Node",
            "outputCapture": "std",
            "program": "./node_modules/next/dist/bin/next",
            "args": ["dev"],
        }
    ],
    "compounds": [
        {
            "name": "Next: Full",
            "configurations": ["Next: Node", "Next: Chrome"]
        }
    ]
}
  ```

  ## Debugging of the Node process

  1. Go to the Debug view, select the **'Next: Node'** configuration, then press F5 or click the green play button.

  2. VS Code should now attempt to start your Next app.

  3. Go ahead and set a breakpoint in **pages/index.js** on `line 56` within the `render` function.

![breakpoint-main](breakpoint_node.png)

  4. Open your favorite browser and go to `http://localhost:3000`.

  5. Your breakpoint should now be hit.

## Debugging of the renderer (Chrome) process

  1. While your debug session is running you can go to the Debug view, select the **'Next: Chrome'**, which will launch Google Chrome and connect VS Code to the renderer process.

  3. When connected go to `component/modal.js` and set a breakpoint on `line 16`.

  4. Now go to your Google Chrome window and click one of the images that opens in a modal.

  5. Your breakpoint in `component/modal.js` on `line 16` should now be hit, and you can debug the logic.

![breakpoint-renderer](breakpoint_chrome.png)

## Debugging of both Node and Chrome at the same time

Now that you have learned to debug both the Main and the Renderer process, you can take advantage of our [`compounds configurations`](https://code.visualstudio.com/updates/v1_8#_multitarget-debugging) that enables you to start multiple debugging sessions at the same time.

1. Go to the Debug view, select the **'Next: All'**, which will connect VS Code to the both Main and Renderer process, and enable you to have a smooth development workflow.
2. Set breakpoints in any of the files like above.
3. Party 🎉🔥
