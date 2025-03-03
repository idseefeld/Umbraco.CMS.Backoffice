import { UMB_USER_STORE_CONTEXT_TOKEN } from '../repository/user.store';
import { UmbWorkspaceContext } from '../../../shared/components/workspace/workspace-context/workspace-context';
import { UmbEntityWorkspaceManager } from '../../../shared/components/workspace/workspace-context/entity-manager-controller';
import { UmbUserRepository } from '../repository/user.repository';
import { UmbEntityWorkspaceContextInterface } from '@umbraco-cms/backoffice/workspace';
import type { UserDetails } from '@umbraco-cms/backoffice/models';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller';

export class UmbUserWorkspaceContext
	extends UmbWorkspaceContext<UmbUserRepository, UserDetails>
	implements UmbEntityWorkspaceContextInterface<UserDetails | undefined>
{
	#manager = new UmbEntityWorkspaceManager<typeof UMB_USER_STORE_CONTEXT_TOKEN.TYPE>(
		this.host,
		'user',
		UMB_USER_STORE_CONTEXT_TOKEN
	);

	public readonly data = this.#manager.state.asObservable();
	public readonly name = this.#manager.state.getObservablePart((state) => state?.name);

	// TODO: remove this magic connection, instead create the necessary methods to update parts.
	update = this.#manager.state.update;

	constructor(host: UmbControllerHostElement) {
		super(host, new UmbUserRepository(host));
	}

	setName(name: string) {
		this.#manager.state.update({ name: name });
	}
	getEntityType = this.#manager.getEntityType;
	getUnique = this.#manager.getEntityKey;
	getEntityKey = this.#manager.getEntityKey;
	getStore = this.#manager.getStore;
	getData = this.#manager.getData as any; // TODO: fix type mismatch, this will mos likely be handled when switching to repositories.
	load = this.#manager.load;
	create = this.#manager.create;
	save = this.#manager.save;
	destroy = this.#manager.destroy;

	getName() {
		throw new Error('getName is not implemented for UmbWorkspaceUserContext');
	}

	propertyValueByAlias(alias: string) {
		throw new Error('setPropertyValue is not implemented for UmbWorkspaceUserContext');
	}
	getPropertyValue(alias: string) {
		throw new Error('setPropertyValue is not implemented for UmbWorkspaceUserContext');
	}
	setPropertyValue(alias: string, value: unknown) {
		throw new Error('setPropertyValue is not implemented for UmbWorkspaceUserContext');
	}
}
