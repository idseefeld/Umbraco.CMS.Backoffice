import { expect } from '@open-wc/testing';
import { UmbExtensionRegistry } from './extension.registry';
import type { ManifestKind, ManifestTypes } from '@umbraco-cms/backoffice/extensions-registry';

describe('UmbExtensionRegistry', () => {
	let extensionRegistry: UmbExtensionRegistry;
	let manifests: Array<ManifestTypes>;

	beforeEach(() => {
		extensionRegistry = new UmbExtensionRegistry();
		manifests = [
			{
				type: 'section',
				name: 'test-section-1',
				alias: 'Umb.Test.Section.1',
				weight: 1,
				meta: {
					label: 'Test Section 1',
					pathname: 'test-section-1',
				},
			},
			{
				type: 'section',
				name: 'test-section-2',
				alias: 'Umb.Test.Section.2',
				weight: 200,
				meta: {
					label: 'Test Section 2',
					pathname: 'test-section-2',
				},
			},
			{
				type: 'section',
				name: 'test-section-3',
				alias: 'Umb.Test.Section.3',
				weight: 25,
				meta: {
					label: 'Test Section 3',
					pathname: 'test-section-3',
				},
			},
			{
				type: 'workspace',
				name: 'test-editor-1',
				alias: 'Umb.Test.Editor.1',
				meta: {
					entityType: 'testEntity',
				},
			},
		];

		manifests.forEach((manifest) => extensionRegistry.register(manifest));
	});

	it('should register an extension', () => {
		const registeredExtensions = extensionRegistry['_extensions'].getValue();
		expect(registeredExtensions).to.have.lengthOf(4);
		expect(registeredExtensions?.[0]?.name).to.eq('test-section-1');
	});

	it('should get an extension by alias', (done) => {
		const alias = 'Umb.Test.Section.1';
		extensionRegistry
			.getByTypeAndAlias('section', alias)
			.subscribe((extension) => {
				expect(extension?.alias).to.eq(alias);
				done();
			})
			.unsubscribe();
	});

	describe('getByType', () => {
		const type = 'section';

		it('should get all extensions by type', (done) => {
			extensionRegistry
				.extensionsOfType(type)
				.subscribe((extensions) => {
					expect(extensions).to.have.lengthOf(3);
					expect(extensions?.[0]?.type).to.eq(type);
					expect(extensions?.[1]?.type).to.eq(type);
					done();
				})
				.unsubscribe();
		});

		it('should return extensions ordered by weight', (done) => {
			extensionRegistry
				.extensionsOfType(type)
				.subscribe((extensions) => {
					expect(extensions?.[0]?.weight).to.eq(200);
					expect(extensions?.[1]?.weight).to.eq(25);
					expect(extensions?.[2]?.weight).to.eq(1);
					done();
				})
				.unsubscribe();
		});

		it('Observable only trigged when changes made to the scope of it', (done) => {
			let amountOfTimesTriggered = -1;
			let lastAmount = 0;

			extensionRegistry
				.extensionsOfType('section')
				.subscribe((extensions) => {
					amountOfTimesTriggered++;
					const newAmount = extensions?.length ?? 0;
					if (amountOfTimesTriggered === 0) {
						expect(newAmount).to.eq(3);
					}
					if (amountOfTimesTriggered === 1) {
						expect(newAmount).to.eq(4);
					}
					if (lastAmount === newAmount) {
						expect(null).to.eq('Update was triggered without a change, this test should fail.');
					} else {
						lastAmount = newAmount;

						if (lastAmount === 3) {
							// We registerer a extension that should not affect this observable.
							extensionRegistry.register({
								type: 'workspace',
								name: 'test-editor-2',
								alias: 'Umb.Test.Editor.2',
								meta: {
									entityType: 'testEntity',
								},
							});
							// And then register a extension that triggers this observable.
							extensionRegistry.register({
								type: 'section',
								name: 'test-section-4',
								alias: 'Umb.Test.Section.4',
								weight: 9999,
								meta: {
									label: 'Test Section 4',
									pathname: 'test-section-4',
								},
							});
						}

						if (newAmount === 4) {
							expect(amountOfTimesTriggered).to.eq(1);
							expect(extensions?.[0]?.alias).to.eq('Umb.Test.Section.4');
							done();
						}
					}
				})
				.unsubscribe();
		});
	});
});

describe('UmbExtensionRegistry with kinds', () => {
	let extensionRegistry: UmbExtensionRegistry;
	let manifests: Array<ManifestTypes | ManifestKind>;

	beforeEach(() => {
		extensionRegistry = new UmbExtensionRegistry();
		manifests = [
			{
				type: 'kind',
				alias: 'Umb.Test.Kind',
				matchType: 'section',
				matchKind: 'test-kind',
				manifest: {
					type: 'section',
					elementName: 'my-kind-element',
					meta: {
						label: 'my-kind-meta-label',
					},
				},
			},
			{
				type: 'section',
				kind: 'test-kind' as unknown as undefined, // We do not know about this one, so it makes good sense that its not a valid option.
				name: 'test-section-1',
				alias: 'Umb.Test.Section.1',
				weight: 1,
				meta: {
					//label: 'Test Section 1',// should come from the kind.
					pathname: 'test-section-1',
				},
			},
			{
				type: 'section',
				name: 'test-section-2',
				alias: 'Umb.Test.Section.2',
				weight: 200,
				meta: {
					label: 'Test Section 2',
					pathname: 'test-section-2',
				},
			},
			{
				type: 'section',
				kind: 'test-kind' as unknown as undefined, // We do not know about this one, so it makes good sense that its not a valid option.
				name: 'test-section-3',
				alias: 'Umb.Test.Section.3',
				weight: 25,
				meta: {
					label: 'Test Section 3',
					pathname: 'test-section-3',
				},
			},
			{
				type: 'workspace',
				name: 'test-editor-1',
				alias: 'Umb.Test.Editor.1',
				meta: {
					entityType: 'testEntity',
				},
			},
		];

		manifests.forEach((manifest) => extensionRegistry.register(manifest));
	});

	it('should merge with kinds', (done) => {
		extensionRegistry
			.extensionsOfType('section')
			.subscribe((extensions) => {
				expect(extensions).to.have.lengthOf(3);
				expect(extensions?.[0]?.elementName).to.not.eq('my-kind-element');
				expect(extensions?.[1]?.alias).to.eq('Umb.Test.Section.3');
				expect(extensions?.[1]?.elementName).to.eq('my-kind-element');
				expect(extensions?.[2]?.alias).to.eq('Umb.Test.Section.1');
				expect(extensions?.[2]?.elementName).to.eq('my-kind-element');
				expect(extensions?.[2]?.meta.label).to.eq('my-kind-meta-label');
				done();
			})
			.unsubscribe();
	});
});
