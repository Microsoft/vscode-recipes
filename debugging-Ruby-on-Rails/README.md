# Ruby on Rails debugging in VS Code

by [@karuppasamy](https://twitter.com/samykaruppa)

This recipe shows how to debug a Ruby on Rails (without jRuby) application using the VS Code extension [vscode-ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) along with the Ruby gems [ruby-debug-ide](https://rubygems.org/gems/ruby-debug-ide) and [ruby-debug-base](https://rubygems.org/gems/ruby-debug-base) or [debase](https://rubygems.org/gems/debase).

## Getting Started

1. Make sure you have the latest version of VS Code installed.

2. Make sure you have the extension [vscode-ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) installed.

2. If you are using Ruby v1.9.x, add [ruby-debug-ide](https://rubygems.org/gems/ruby-debug-ide) and [ruby-debug-base19x](https://rubygems.org/gems/ruby-debug-base19x) gems in your Gemfile followed by the `bundle install` command in your terminal.

3. If you are using Ruby v2.x, add [ruby-debug-ide](https://rubygems.org/gems/ruby-debug-ide) and [debase](https://rubygems.org/gems/debase) gems in your Gemfile followed by the `bundle install` command in your terminal.

4. If you are using jRuby, add [ruby-debug-ide](https://rubygems.org/gems/ruby-debug-ide) and [ruby-debug-base](https://rubygems.org/gems/ruby-debug-base) gems in your Gemfile followed by the `bundle install` command in your terminal.


## Configure VS Code debugging with a launch.json file

1. Click on the Debugging icon in the Activity Bar to bring up the Debug view.

2. Then click on the gear icon to configure a launch.json file, selecting **Launch** for the environment:

3. Before that, get a full path of the gem `bundle`, `ruby-debug-ide` and `rspec`

    ```bash
    $: which bundle
    /path/to/rubygem/bin/bundle
    # replace 'bin' with 'wrappers' in launch.json, so it will be '/path/to/rubygem/wrappers/bundle'. See below the StackOverflow link for a reference for RVM users.
  
    $: bundle show ruby-debug-ide
    /path/to/rubygem/gems/ruby-debug-ide-x.x.x
   
    $: which rspec
    /path/to/rubygem/bin/rspec
    ```
    
4. Replace the content of the generated launch.json file with the following configurations in the `pathToBundler` and `pathToRDebugIDE` path:

    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Start Rails server",
                "type": "Ruby",
                "request": "launch",
                "cwd": "${workspaceRoot}",
                "program": "${workspaceRoot}/bin/rails",
                "args": [
                    "server",
                    "-p",
                    "3000"
                ]
            },
            {
                "name": "Debug Rails server",
                "type": "Ruby",
                "request": "launch",
                "cwd": "${workspaceRoot}",
                "useBundler": true,
                "pathToBundler": "/path/to/rubygem/wrappers/bundle",
                "pathToRDebugIDE": "/path/to/rubygem/gems/ruby-debug-ide-x.x.x/bin/rdebug-ide",
                "program": "${workspaceRoot}/bin/rails",
                "args": [
                    "server",
                    "-p",
                    "3000"
                ]
            },
            {
                "name": "Run RSpec - all",
                "type": "Ruby",
                "request": "launch",
                "cwd": "${workspaceRoot}",
                "program": "/path/to/rubygem/bin/rspec",
                "args": [
                    "--pattern",
                    "${workspaceRoot}/spec/**/*_rspec.rb"
                ]
            },
            {
                "name": "Debug RSpec - open spec file",
                "type": "Ruby",
                "request": "launch",
                "cwd": "${workspaceRoot}",
                "useBundler": true,
                "pathToBundler": "/path/to/rubygem/wrappers/bundle",
                "pathToRDebugIDE": "/path/to/rubygem/gems/ruby-debug-ide-x.x.x/bin/rdebug-ide",
                "debuggerPort": "1235",
                "program": "/path/to/rubygem/bin/rspec",
                "args": [
                    "${file}"
                ]
            },
            {
              "name": "Debug RSpec - open spec file on a certain line",
              "type": "Ruby",
              "request": "launch",
              "cwd": "${workspaceRoot}",
              "useBundler": true,
              "pathToBundler": "/path/to/rubygem/wrappers/bundle",
              "pathToRDebugIDE": "/path/to/rubygem/gems/ruby-debug-ide-x.x.x/bin/rdebug-ide",
              "debuggerPort": "1235",
              "program": "/path/to/rubygem/bin/rspec",
              "args": ["${file}:${lineNumber}"]
            }
        ]
    }
    ```
    
5. If you are using jRuby, you want to add the below `JRUBY` environment variable under the above configurations **'Start Rails server'** and **'Debug Rails server'**. So, it will be like:

    ```json
    {
        "name": "Start Rails server",
        "type": "Ruby",
        "request": "launch",
        "cwd": "${workspaceRoot}",
        "env": {
            "JRUBY_OPTS": "-X-C -J-Xmx4096m -J-XX:+UseConcMarkSweepGC"
        },
        "program": "${workspaceRoot}/bin/rails",
        "args": [
            "server",
            "-p",
            "3000"
        ]
    },
    {
        "name": "Debug Rails server",
        "type": "Ruby",
        "request": "launch",
        "cwd": "${workspaceRoot}",
        "env": {
            "JRUBY_OPTS": "-X-C -J-Xmx4096m -J-XX:+UseConcMarkSweepGC --debug"
        },
        "useBundler": true,
        "pathToBundler": "/path/to/rubygem/wrappers/bundle",
        "pathToRDebugIDE": "/path/to/rubygem/gems/ruby-debug-ide-x.x.x/bin/rdebug-ide",
        "program": "${workspaceRoot}/bin/rails",
        "args": [
            "server",
            "-p",
            "3000"
        ]
    },
    ```

Reference [StackOverflow#26247926](https://stackoverflow.com/questions/26247926/how-to-solve-usr-bin-env-ruby-executable-hooks-no-such-file-or-directory/26370576#26370576) - to replace `bin` with `wrappers`

## Start Debugging. (`rails server`)
  
1. Open your Ruby on Rails app in VS Code.

2. Go to the Debug view, select the **'Debug Rails server'** (or **'Debug Rails + jruby server'** if you are using jRuby) configuration, then press F5 or click the green play button.

3. VS Code should now show the rails server logs.

4. Go ahead and set a breakpoint in any `.rb` file.

5. Open your favorite browser and go to `http://localhost:3000`

6. Your breakpoint should now be hit.

7. Party 🎉🔥 

## Run All spec

1. Open your Ruby on Rails app in VS Code.

2. Select the **'Run RSpec - All'** configuration, then press F5 or click the green play button.

3. VS Code should now show the logs for you. 

## Run/Debug open spec file

1. Open your Ruby on Rails app in VS Code.

2. Open a spec file which you want to run. (Set a breakpoint if you want to debug it.)

3. Select the **'Debug RSpec - open spec file'** configuration, then press F5 or click the green play button.

4. VS Code should now show the logs for you. 

5. Your breakpoint should now be hit if you set a breakpoint already.

6. Party 🎉🔥 

## Bonus

1. If you are using `Docker` to run your application, you need to append the below configuration in `launch.json#configurations` to debug it. 

    ```json
    {
        "name": "Attach to Docker",
        "type": "Ruby",
        "request": "attach",
        "remotePort": "1234",
        "remoteHost": "0.0.0.0",
        "remoteWorkspaceRoot": "/",
        "cwd": "${workspaceRoot}",
        "showDebuggerOutput": true
    },
    ```

2. So, you need to start rails server from the docker in debug mode as like below in the configuration

    ```yml
    # based on the 'compose' version you could change your config, but the 'command' and 'ports' should be same as like below. (You can change the ports 3000, 1234 but you want to update the same in launch.json too.)
    version: "3"
    services:
        web:
            build:
                context: .
            command: bundle exec rdebug-ide --debug --host 0.0.0.0 --port 1234 -- rails s -p 3000 -b 0.0.0.0
            volumes:
                - .:/app
            ports:
                - "1234:1234"
                - "3000:3000"
                - "26162:26162"
    ```

3. If you are running multiple docker rails applications at a same time, you want make sure your ports should be uniq. (26162 is a dispatcher-port).

    ```yml
    command: bundle exec rdebug-ide --debug --host 0.0.0.0 --port 1235 --dispatcher-port 26163 -- rails s -p 4000 -b 0.0.0.0
    ports:
        - "1235:1235"
        - "4000:4000"
        - "26163:26163"
    ```

4. `EXPOSE` all the ports in your `Dockerfile`

5. Start the docker by running command `docker-compose up`

6. Select the **'Attach to Docker'** configuration in VS Code, then press F5 or click the green play button.

7. If you want to debug your code, set a breakpoint in any `*.rb` file otherwise leave it.

8. VS Code should now show the rails server logs. (Use [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) extension).

9. Party 🎉🔥 

