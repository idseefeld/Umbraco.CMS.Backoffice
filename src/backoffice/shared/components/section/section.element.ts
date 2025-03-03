import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'rxjs';
import type { UmbWorkspaceElement } from '../workspace/workspace.element';
import type { UmbSectionViewsElement } from './section-views/section-views.element';
import type { ManifestSection, ManifestSectionSidebarApp } from '@umbraco-cms/backoffice/extensions-registry';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extensions-api';
import type { IRoutingInfo } from '@umbraco-cms/internal/router';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';

import './section-sidebar-menu/section-sidebar-menu.element';

/**
 * @export
 * @class UmbSectionElement
 * @description - Element hosting sections and section navigation.
 */
@customElement('umb-section')
export class UmbSectionElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				flex: 1 1 auto;
				height: 100%;
				display: flex;
			}

			h3 {
				padding: var(--uui-size-4) var(--uui-size-8);
			}
		`,
	];

	@property()
	public manifest?: ManifestSection;

	@state()
	private _routes?: Array<any>;

	@state()
	private _menus?: Array<Omit<ManifestSectionSidebarApp, 'kind'>>;

	connectedCallback() {
		super.connectedCallback();
		this.#observeSectionSidebarApps();
		this.#createRoutes();
	}

	#createRoutes() {
		this._routes = [];

		this._routes = [
			{
				path: 'workspace/:entityType',
				component: () => import('../workspace/workspace.element'),
				setup: (element: UmbWorkspaceElement, info: IRoutingInfo) => {
					element.entityType = info.match.params.entityType;
				},
			},
			{
				path: '**',
				component: () => import('../section/section-views/section-views.element'),
				setup: (element: UmbSectionViewsElement) => {
					element.sectionAlias = this.manifest?.alias;
				},
			},
		];
	}

	// TODO: Can this be omitted? or can the same data be used for the extension slot or alike extension presentation?
	#observeSectionSidebarApps() {
		this.observe(
			umbExtensionsRegistry
				.extensionsOfType('sectionSidebarApp')
				.pipe(
					map((manifests) =>
						manifests.filter((manifest) => manifest.conditions.sections.includes(this.manifest?.alias || ''))
					)
				),
			(manifests) => {
				this._menus = manifests;
			}
		);
	}

	render() {
		return html`
			${this._menus && this._menus.length > 0
				? html`
						<!-- TODO: these extensions should be combined into one type: sectionSidebarApp with a "subtype" -->
						<umb-section-sidebar>
							<umb-extension-slot
								type="sectionSidebarApp"
								.filter=${(items: ManifestSectionSidebarApp) =>
									items.conditions.sections.includes(this.manifest?.alias || '')}></umb-extension-slot>
						</umb-section-sidebar>
				  `
				: nothing}
			<umb-section-main>
				${this._routes && this._routes.length > 0
					? html`<umb-router-slot id="router-slot" .routes="${this._routes}"></umb-router-slot>`
					: nothing}
				<slot></slot>
			</umb-section-main>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-section': UmbSectionElement;
	}
}
