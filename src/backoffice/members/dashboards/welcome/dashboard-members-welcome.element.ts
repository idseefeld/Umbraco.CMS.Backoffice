import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('umb-dashboard-members-welcome')
export class UmbDashboardMembersWelcomeElement extends LitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				margin: var(--uui-size-layout-1);
			}
		`,
	];

	render() {
		return html`
			<uui-box>
				<h1>Hours of Umbraco training videos are only a click away</h1>
				<p>
					Want to master Umbraco? Spend a few minutes learning some best practices by visiting the Umbraco Learning Base
					Youtube channel. Here you can find a bunch of video material coverings many aspects of Umbraco.
				</p>
			</uui-box>
		`;
	}
}

export default UmbDashboardMembersWelcomeElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-dashboard-members-welcome': UmbDashboardMembersWelcomeElement;
	}
}
