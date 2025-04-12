import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.tasks.registerTaskProvider('vscode-command', new VSCodeCommandTaskProvider())
	);
}

export function deactivate() {}

class VSCodeCommandTaskProvider implements vscode.TaskProvider {
	resolveTask(task: vscode.Task): vscode.ProviderResult<vscode.Task> {
		const execution = new vscode.CustomExecution(
			async (resolvedDefinition: vscode.TaskDefinition): Promise<vscode.Pseudoterminal> => {
			return new VSCodeCommandPty(
				resolvedDefinition.command, resolvedDefinition.args || []
			);
		});
		const newTask = new vscode.Task(
			task.definition,
			task.scope ?? vscode.TaskScope.Workspace,
			task.definition.label || `${task.definition.command}`,
			'Command Task',
			execution,
			[]
		);
		return newTask;
	}
	provideTasks(): vscode.ProviderResult<vscode.Task[]> {
		return [];
	}
}

class VSCodeCommandPty implements vscode.Pseudoterminal {
	constructor(private command: string, private args: any[]) { }
	private writeEmitter = new vscode.EventEmitter<string>();
	private closeEmitter = new vscode.EventEmitter<number>();
	onDidWrite = this.writeEmitter.event;
	onDidClose = this.closeEmitter.event;

	async open(_initialDimensions: vscode.TerminalDimensions | undefined): Promise<void> {
		this.writeEmitter.fire(t(`Executing command ${this.command} as a task`));
		if (this.args.length) {
			this.writeEmitter.fire(t(` with args ${this.args}`));
		}
		this.writeEmitter.fire(t('\n'));
		try {
			const ret = await vscode.commands.executeCommand(this.command, ...this.args);
			if (ret !== undefined && ret !== null) {
				this.writeEmitter.fire(t(`returned ${String(ret)}\n`));
			}
			this.closeEmitter.fire(0);
		} catch (e) {
			this.writeEmitter.fire(t(`${e}\n`));
			this.closeEmitter.fire(1);
		}
	}

	close(): void { }
}

// Format a string for terminal output
function t(s: string): string {
	return s.replaceAll('\n', '\r\n');
}
