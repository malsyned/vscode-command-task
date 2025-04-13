# Command Tasks

Execute Visual Studio Code built-in commands or commands provided by extensions as Tasks.

## Features

Adds a new task type, `vscode-command`, which can be used to configure tasks in `task.json` that run Visual Studio Code commands or commands from extensions as tasks, allowing them to appear in the list of tasks presented by the "Tasks: Run Task" command or used as a `preLaunchTask` or `postDebugTask` in a `launch.json` configuration, for example.

## Parameters

* `command`: the identifier of the command to run.
* `args`: an optional array of arguments to pass to the command.

## Example

```jsonc
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "find my favorite string",
            "type": "vscode-command",
            "command": "editor.actions.findWithArgs",
            "args": [
                {
                    "searchString": "Hello World",
                    "isCaseSensitive": true
                 }
            ]
        },
    ]
}
```
