import { expect, fixture, html } from '@open-wc/testing';
import { UmbPropertyEditorUIEyeDropperElement } from './property-editor-ui-eye-dropper.element';
import { defaultA11yConfig } from '@umbraco-cms/internal/test-utils';

describe('UmbPropertyEditorUIEyeDropperElement', () => {
  let element: UmbPropertyEditorUIEyeDropperElement;

  beforeEach(async () => {
	element = await fixture(
	  html` <umb-property-editor-ui-eye-dropper></umb-property-editor-ui-eye-dropper> `
	);
  });

  it('is defined with its own instance', () => {
	expect(element).to.be.instanceOf(UmbPropertyEditorUIEyeDropperElement);
  });

  it('passes the a11y audit', async () => {
	await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
  });
});
