import { UUIRefNodeElement } from '@umbraco-ui/uui';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 *  @element umb-ref-property-editor-ui
 *  @description - Component for displaying a reference to a Property Editor UI
 *  @extends UUIRefNodeElement
 */
@customElement('umb-ref-property-editor-ui')
export class UmbRefPropertyEditorUIElement extends UUIRefNodeElement {
	static styles = [...UUIRefNodeElement.styles];

	protected fallbackIcon =
		'<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.212 397.267l106.052-48.024L398.479 199.03l-26.405-26.442-90.519 90.517-15.843-15.891 90.484-90.486-16.204-16.217-150.246 150.243-47.534 106.513zm74.904-100.739l23.285-23.283 3.353 22.221 22.008 3.124-23.283 23.313-46.176 20.991 20.813-46.366zm257.6-173.71L416.188 64.3l-49.755 49.785 58.504 58.503 49.779-49.77zM357.357 300.227h82.826v116.445H68.929V300.227h88.719v-30.648H38.288v177.733h432.537V269.578H357.357v30.649z"></path></svg>';

	/**
	 * Alias
	 * @type {string}
	 * @attr
	 * @default ''
	 */
	@property({ type: String })
	alias = '';

	/**
	 * Property Editor Alias
	 * @type {string}
	 * @attr
	 * @default ''
	 */
	@property({ type: String, attribute: 'property-editor-model-alias' })
	propertyEditorAlias = '';

	protected renderDetail() {
		const details: string[] = [];

		if (this.alias !== '') {
			details.push(this.alias);
		}

		if (this.propertyEditorAlias !== '') {
			details.push(this.propertyEditorAlias);
		} else {
			details.push('Property Editor Missing');
		}

		if (this.detail !== '') {
			details.push(this.detail);
		}
		return html`<small id="detail">${details.join(' | ')}<slot name="detail"></slot></small>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-ref-property-editor-ui': UmbRefPropertyEditorUIElement;
	}
}
