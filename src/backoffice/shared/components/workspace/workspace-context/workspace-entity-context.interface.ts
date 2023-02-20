import type { UmbWorkspaceContextInterface } from './workspace-context.interface';

export interface UmbWorkspaceEntityContextInterface<T = unknown> extends UmbWorkspaceContextInterface<T> {
	//readonly name: Observable<string | undefined>;

	getEntityKey(): string | undefined; // COnsider if this should go away now that we have getUnique()
	getEntityType(): string;

	getData(): T;

	save(): Promise<void>;
}
