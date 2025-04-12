# Command Tasks

Execute Visual Studio Code built-in commands or commands provided by extensions as Tasks.

## Features

Adds a new task type, `vscode-command`, which can be used to configure tasks in `task.json` that run Visual Studio Code commands or commands from extensions as tasks, allowing them to appear in the list of tasks presented by the "Tasks: Run Task" command or used as a `preLaunchTask` or `postDebugTask` in a `launch.json` configuration, for example.

## Example

```jsonc
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "vscode-command",
            "label": "Show the test extension side pane",
            "command": "workbench.view.extension.test"
        }
    ]
}
```
