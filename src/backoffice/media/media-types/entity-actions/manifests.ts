import { MEDIA_TYPE_REPOSITORY_ALIAS } from '../repository/manifests';
import { UmbCreateMediaTypeEntityAction } from './create.action';
import UmbReloadMediaTypeEntityAction from './reload.action';
import { UmbDeleteEntityAction, UmbMoveEntityAction, UmbCopyEntityAction } from '@umbraco-cms/backoffice/entity-action';
import type { ManifestEntityAction } from '@umbraco-cms/backoffice/extensions-registry';

const entityType = 'media-type';
const repositoryAlias = MEDIA_TYPE_REPOSITORY_ALIAS;

const entityActions: Array<ManifestEntityAction> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.MediaType.Create',
		name: 'Create Media Type Entity Action',
		weight: 500,
		meta: {
			icon: 'umb:add',
			label: 'Create',
			repositoryAlias,
			api: UmbCreateMediaTypeEntityAction,
		},
		conditions: {
			entityType,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.MediaType.Move',
		name: 'Move Media Type Entity Action',
		weight: 400,
		meta: {
			icon: 'umb:enter',
			label: 'Move',
			repositoryAlias,
			api: UmbMoveEntityAction,
		},
		conditions: {
			entityType,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.MediaType.Copy',
		name: 'Copy Media Type Entity Action',
		weight: 300,
		meta: {
			icon: 'umb:documents',
			label: 'Copy',
			repositoryAlias,
			api: UmbCopyEntityAction,
		},
		conditions: {
			entityType,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.MediaType.Delete',
		name: 'Delete Media Type Entity Action',
		weight: 200,
		meta: {
			icon: 'umb:trash',
			label: 'Delete',
			repositoryAlias,
			api: UmbDeleteEntityAction,
		},
		conditions: {
			entityType,
		},
	},
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.MediaType.Reload',
		name: 'Reload Media Type Entity Action',
		weight: 100,
		meta: {
			icon: 'umb:refresh',
			label: 'Reload',
			repositoryAlias,
			api: UmbReloadMediaTypeEntityAction,
		},
		conditions: {
			entityType,
		},
	},
];

export const manifests = [...entityActions];
