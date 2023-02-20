import type { Observable } from 'rxjs';
import type { UmbWorkspaceEntityContextInterface } from './workspace-entity-context.interface';
import type { PropertyViewModelBaseModel } from '@umbraco-cms/backend-api';

export interface UmbWorkspaceInvariantableEntityContextInterface<T = unknown>
	extends UmbWorkspaceEntityContextInterface<T> {
	getName(): void;
	setName(name: string): void;

	propertyValueByAlias(alias: string): Observable<PropertyViewModelBaseModel>;
	getPropertyValue(alias: string): void;
	setPropertyValue(alias: string, value: unknown): void;
}
