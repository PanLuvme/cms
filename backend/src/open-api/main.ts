import {
    objectSchemaToOpenApi3Schema,
    openApiCreateSchema,
} from '@bcms/selfhosted-backend/open-api/schema';
import type { OpenAPIV3 } from 'openapi-types';
import {
    AuthLoginBodySchema,
    AuthLoginResponseSchema,
    AuthSignUpAdminBodySchema,
} from '@bcms/selfhosted-backend/auth/models/controller';
import {
    UserProtectedSchema,
    UserSchema,
} from '@bcms/selfhosted-backend/user/models/main';
import { UserAddressSchema } from '@bcms/selfhosted-backend/user/models/address';
import { UserPersonalSchema } from '@bcms/selfhosted-backend/user/models/personal';
import {
    UserPolicyCRUDSchema,
    UserPolicyPluginOptionSchema,
    UserPolicyPluginSchema,
    UserPolicySchema,
    UserPolicyTemplateSchema,
} from '@bcms/selfhosted-backend/user/models/policy';
import { UserCustomPoolSchema } from '@bcms/selfhosted-backend/user/models/custom-pool';
import {
    UserCreateBodySchema,
    UserStatsResponseSchema,
    UserUpdateBodySchema,
} from '@bcms/selfhosted-backend/user/models/controller';
import { ApiKeyAccessSchema } from '@bcms/selfhosted-backend/api-key/models/access';
import { ApiKeySchema } from '@bcms/selfhosted-backend/api-key/models/main';
import {
    MediaSchema,
    MediaType,
} from '@bcms/selfhosted-backend/media/models/main';
import {
    MediaCreateDirBodySchema,
    MediaDeleteBodySchema,
    MediaGetBinBodySchema,
    MediaRequestUploadTokenResultSchema,
    MediaUpdateBodySchema,
} from '@bcms/selfhosted-backend/media/models/controller';
import { EntryLiteSchema } from '@bcms/selfhosted-backend/entry/models/main';
import {
    PropDateDataSchema,
    PropValueDateDataSchema,
} from '@bcms/selfhosted-backend/prop/models/date';
import { PropEnumDataSchema } from '@bcms/selfhosted-backend/prop/models/enum';
import { PropEntryPointerDataSchema } from '@bcms/selfhosted-backend/prop/models/entry-pointer';
import { PropGroupPointerDataSchema } from '@bcms/selfhosted-backend/prop/models/group-pointer';
import { PropWidgetDataSchema } from '@bcms/selfhosted-backend/prop/models/widget';
import {
    PropChangeTransformSchema,
    PropChangeUpdateSchema,
} from '@bcms/selfhosted-backend/prop/models/change';
import {
    GroupCreateBodySchema,
    GroupWhereIsItUsedResultSchema,
} from '@bcms/selfhosted-backend/group/models/controller';
import {
    TemplateCreateBodySchema,
    TemplateWhereIsItUsedResultSchema,
} from '@bcms/selfhosted-backend/template/models/controller';
import {
    WidgetCreateBodySchema,
    WidgetWhereIsItUsedResultSchema,
} from '@bcms/selfhosted-backend/widget/models/controller';
import { LanguageSchema } from '@bcms/selfhosted-backend/language/models/main';
import { LanguageCreateBodySchema } from '@bcms/selfhosted-backend/language/models/controller';
import { EntryStatusSchema } from '@bcms/selfhosted-backend/entry-status/models/main';
import {
    EntryStatusCreateBodySchema,
    EntryStatusUpdateBodySchema,
} from '@bcms/selfhosted-backend/entry-status/models/controller';
import {
    ApiKeyCreateBodySchema,
    ApiKeyUpdateBodySchema,
} from '@bcms/selfhosted-backend/api-key/models/controller';
import { TemplateOrganizerSchema } from '@bcms/selfhosted-backend/template-organizer/models/main';
import {
    TemplateOrganizerCreateBodySchema,
    TemplateOrganizerUpdateBodySchema,
} from '@bcms/selfhosted-backend/template-organizer/models/controller';
import { BackupSchema } from '@bcms/selfhosted-backend/backup/models/main';
import { BCMSFunctionConfigSchema } from '@bcms/selfhosted-backend/function/models/main';
import { TypeGeneratorFileSchema } from '@bcms/selfhosted-backend/type-generator/generator/main';

export function getObjectPropertyByPath<Property = unknown>(
    object: any,
    propPath: (string | number)[],
): Property | null {
    let path: (string | number)[] = [...propPath];
    let parent = object;
    while (path.length > 0) {
        if (path.length === 1) {
            return parent[path[0]] ? parent[path[0]] : null;
        } else {
            if (!parent[path[0]]) {
                return null;
            }
            parent = parent[path[0]];
            path = path.slice(1);
        }
    }
    return null;
}

export const OpenApiModels = {
    AuthLoginBody: objectSchemaToOpenApi3Schema(AuthLoginBodySchema),
    AuthLoginResponse: objectSchemaToOpenApi3Schema(AuthLoginResponseSchema),
    AuthSignUpAdminBody: objectSchemaToOpenApi3Schema(
        AuthSignUpAdminBodySchema,
    ),

    User: objectSchemaToOpenApi3Schema(UserSchema),
    UserProtected: objectSchemaToOpenApi3Schema(UserProtectedSchema),
    UserAddress: objectSchemaToOpenApi3Schema(UserAddressSchema),
    UserPersonal: objectSchemaToOpenApi3Schema(UserPersonalSchema),
    UserPolicyCRUD: objectSchemaToOpenApi3Schema(UserPolicyCRUDSchema),
    UserPolicyTemplate: objectSchemaToOpenApi3Schema(UserPolicyTemplateSchema),
    UserPolicyPluginOption: objectSchemaToOpenApi3Schema(
        UserPolicyPluginOptionSchema,
    ),
    UserPolicyPlugin: objectSchemaToOpenApi3Schema(UserPolicyPluginSchema),
    UserPolicy: objectSchemaToOpenApi3Schema(UserPolicySchema),
    UserCustomPool: objectSchemaToOpenApi3Schema(UserCustomPoolSchema),
    UserUpdateBody: objectSchemaToOpenApi3Schema(UserUpdateBodySchema),
    UserCreateBody: objectSchemaToOpenApi3Schema(UserCreateBodySchema),
    UserStatsResponse: objectSchemaToOpenApi3Schema(UserStatsResponseSchema),

    ApiKeyAccess: objectSchemaToOpenApi3Schema(ApiKeyAccessSchema),
    ApiKey: objectSchemaToOpenApi3Schema(ApiKeySchema),
    ApiKeyCreateBody: objectSchemaToOpenApi3Schema(ApiKeyCreateBodySchema),
    ApiKeyUpdateBody: objectSchemaToOpenApi3Schema(ApiKeyUpdateBodySchema),

    MediaType: openApiCreateSchema({
        type: 'string',
        enum: Object.keys(MediaType),
    }),
    Media: (() => {
        const schema = objectSchemaToOpenApi3Schema(MediaSchema);
        if (schema.properties) {
            schema.properties.type = {
                $ref: '#/components/schemas/MediaType',
            };
        }
        return schema;
    })(),
    MediaGetBinBody: objectSchemaToOpenApi3Schema(MediaGetBinBodySchema),
    MediaRequestUploadTokenResult: objectSchemaToOpenApi3Schema(
        MediaRequestUploadTokenResultSchema,
    ),
    MediaCreateDirBody: objectSchemaToOpenApi3Schema(MediaCreateDirBodySchema),
    MediaUpdateBody: objectSchemaToOpenApi3Schema(MediaUpdateBodySchema),
    MediaDeleteBody: objectSchemaToOpenApi3Schema(MediaDeleteBodySchema),

    BCMSFunctionConfig: objectSchemaToOpenApi3Schema(BCMSFunctionConfigSchema),

    EntryContentNodeHeadingAttr: openApiCreateSchema({
        type: 'object',
        required: ['level'],
        properties: {
            level: {
                type: 'number',
            },
        },
    }),
    EntryContentNodeLinkAttr: openApiCreateSchema({
        type: 'object',
        required: ['href', 'target'],
        properties: {
            href: {
                type: 'string',
            },
            target: {
                type: 'string',
            },
        },
    }),
    EntryContentNodeType: openApiCreateSchema({
        type: 'string',
        enum: [
            'paragraph',
            'heading',
            'widget',
            'bulletList',
            'listItem',
            'orderedList',
            'text',
            'codeBlock',
            'hardBreak',
        ],
    }),
    EntryContentNodeMarkerType: openApiCreateSchema({
        type: 'string',
        enum: ['bold', 'italic', 'underline', 'strike', 'link', 'inlineCode'],
    }),
    EntryContentNodeMarker: openApiCreateSchema({
        type: 'object',
        required: ['type'],
        properties: {
            type: {
                $ref: '#/components/schemas/EntryContentNodeMarkerType',
            },
            attrs: {
                $ref: '#/components/schemas/EntryContentNodeLinkAttr',
            },
        },
    }),
    EntryContentNode: openApiCreateSchema({
        type: 'object',
        required: ['type'],
        properties: {
            type: {
                $ref: '#/components/schemas/EntryContentNodeType',
            },
            content: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContentNode',
                },
            },
            attrs: {
                oneOf: [
                    {
                        $ref: '#/components/schemas/EntryContentNodeHeadingAttr',
                    },
                    {
                        $ref: '#/components/schemas/EntryContentNodeLinkAttr',
                    },
                ],
            },
            marks: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContentNodeMarker',
                },
            },
            text: {
                type: 'string',
            },
        },
    }),
    EntryLite: objectSchemaToOpenApi3Schema(EntryLiteSchema),
    EntryMeta: openApiCreateSchema({
        type: 'object',
        required: ['lng', 'props'],
        properties: {
            lng: {
                type: 'string',
                description: `Language code, for example 'en'`,
            },
            props: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropValue',
                },
            },
        },
    }),
    EntryContent: openApiCreateSchema({
        type: 'object',
        required: ['lng', 'nodes', 'plainText'],
        properties: {
            lng: {
                type: 'string',
                description: `Language code, for example 'en'`,
            },
            nodes: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContentNode',
                },
            },
            plainText: {
                type: 'string',
                description: 'All nodes converted into single line of text',
            },
        },
    }),
    Entry: openApiBaseModelSchema(
        ['instanceId', 'templateId', 'userId', 'meta', 'content'],
        {
            instanceId: {
                type: 'string',
            },
            templateId: {
                type: 'string',
            },
            userId: {
                type: 'string',
            },
            status: {
                type: 'string',
                description: 'Status ID, pointer to status',
            },
            meta: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryMeta',
                },
            },
            content: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContent',
                },
            },
        },
    ),
    EntryCreateBody: openApiCreateSchema({
        type: 'object',
        required: ['meta', 'content'],
        properties: {
            status: {
                type: 'string',
            },
            meta: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryMeta',
                },
            },
            content: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContent',
                },
            },
        },
    }),
    EntryUpdateBody: openApiCreateSchema({
        type: 'object',
        required: ['meta', 'content'],
        properties: {
            status: {
                type: 'string',
            },
            meta: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryMeta',
                },
            },
            content: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContent',
                },
            },
        },
    }),

    PropValueData: openApiCreateSchema({
        oneOf: [
            {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
            {
                type: 'array',
                items: {
                    type: 'boolean',
                },
            },
            {
                $ref: '#/components/schemas/PropValueDateData',
            },
            {
                $ref: '#/components/schemas/PropValueGroupPointerData',
            },
            {
                $ref: '#/components/schemas/PropValueGroupPointerData',
            },
            {
                $ref: '#/components/schemas/PropValueMediaData',
            },
            {
                $ref: '#/components/schemas/PropValueWidgetData',
            },
            {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropValueRichTextData',
                },
            },
            {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropValueEntryPointer',
                },
            },
        ],
    }),
    PropDateData: objectSchemaToOpenApi3Schema(PropDateDataSchema),
    PropValueDateData: objectSchemaToOpenApi3Schema(PropValueDateDataSchema),
    PropValueEntryPointer: openApiCreateSchema({
        type: 'object',
        required: ['eid', 'tid'],
        properties: {
            eid: {
                type: 'string',
                description: 'Entry ID',
            },
            tid: {
                type: 'string',
                description: 'Template ID',
            },
        },
    }),
    PropValueRichTextData: openApiCreateSchema({
        type: 'object',
        required: ['nodes'],
        properties: {
            nodes: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/EntryContentNode',
                },
            },
        },
    }),
    PropValueWidgetData: openApiCreateSchema({
        type: 'object',
        required: ['_id', 'props'],
        properties: {
            _id: {
                type: 'string',
            },
            props: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropValue',
                },
            },
        },
    }),
    PropValueMediaData: openApiCreateSchema({
        type: 'object',
        required: ['_id'],
        properties: {
            _id: {
                type: 'string',
            },
            alt_text: {
                type: 'string',
            },
            caption: {
                type: 'string',
            },
        },
    }),
    PropValueGroupPointerData: openApiCreateSchema({
        type: 'object',
        required: ['_id', 'items'],
        properties: {
            _id: {
                type: 'string',
            },
            items: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropValue',
                },
            },
        },
    }),
    PropValue: openApiCreateSchema({
        type: 'object',
        required: ['id', 'data'],
        properties: {
            id: {
                type: 'string',
            },
            data: {
                $ref: '#/components/schemas/PropValueData',
            },
        },
    }),
    PropEnumData: objectSchemaToOpenApi3Schema(PropEnumDataSchema),
    PropEntryPointerData: objectSchemaToOpenApi3Schema(
        PropEntryPointerDataSchema,
    ),
    PropGroupPointerData: objectSchemaToOpenApi3Schema(
        PropGroupPointerDataSchema,
    ),
    PropWidgetData: objectSchemaToOpenApi3Schema(PropWidgetDataSchema),
    PropType: openApiCreateSchema({
        type: 'string',
        enum: [
            'STRING',
            'NUMBER',
            'BOOLEAN',
            'DATE',
            'ENUMERATION',
            'MEDIA',
            'GROUP_POINTER',
            'ENTRY_POINTER',
            'WIDGET',
            'COLOR_PICKER',
            'RICH_TEXT',
            'TAG',
        ],
    }),
    PropData: openApiCreateSchema({
        type: 'object',
        properties: {
            propString: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            propNumber: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
            propBool: {
                type: 'array',
                items: {
                    type: 'boolean',
                },
            },
            propDate: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropDateData',
                },
            },
            propEnum: {
                $ref: '#/components/schemas/PropEnumData',
            },
            propEntryPointer: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropEntryPointerData',
                },
            },
            propGroupPointer: {
                $ref: '#/components/schemas/PropGroupPointerData',
            },
            propMedia: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            propWidget: {
                $ref: '#/components/schemas/PropWidgetData',
            },
            propRichText: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        nodes: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/EntryContentNode',
                            },
                        },
                    },
                },
            },
        },
    }),
    Prop: openApiCreateSchema({
        type: 'object',
        required: ['id', 'type', 'required', 'name', 'label', 'array', 'data'],
        properties: {
            id: {
                type: 'string',
            },
            type: {
                $ref: '#/components/schemas/PropType',
            },
            required: {
                type: 'boolean',
            },
            name: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            array: {
                type: 'number',
            },
            data: {
                $ref: '#/components/schemas/PropData',
            },
        },
    }),
    PropChangeTransform: objectSchemaToOpenApi3Schema(
        PropChangeTransformSchema,
    ),
    PropChangeAdd: openApiCreateSchema({
        type: 'object',
        required: ['label', 'type', 'required', 'array', 'data'],
        properties: {
            label: {
                type: 'string',
            },
            type: {
                $ref: '#/components/schemas/PropType',
            },
            required: {
                type: 'boolean',
            },
            array: {
                type: 'boolean',
            },
            data: {
                $ref: '#/components/schemas/PropData',
            },
        },
    }),
    PropChangeUpdate: objectSchemaToOpenApi3Schema(PropChangeUpdateSchema),
    PropChange: openApiCreateSchema({
        type: 'object',
        properties: {
            add: {
                $ref: '#/components/schemas/PropChangeAdd',
            },
            remove: {
                type: 'string',
            },
            update: {
                $ref: '#/components/schemas/PropChangeUpdate',
            },
            transform: {
                $ref: '#/components/schemas/PropChangeTransform',
            },
        },
    }),

    Group: openApiBaseModelSchema(
        ['instanceId', 'userId', 'name', 'label', 'desc', 'props'],
        {
            instanceId: {
                type: 'string',
            },
            userId: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            desc: {
                type: 'string',
            },
            props: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Prop',
                },
            },
        },
    ),
    GroupWhereIsItUsedResult: objectSchemaToOpenApi3Schema(
        GroupWhereIsItUsedResultSchema,
    ),
    GroupCreateBody: objectSchemaToOpenApi3Schema(GroupCreateBodySchema),
    GroupUpdateBody: openApiCreateSchema({
        type: 'object',
        required: ['_id'],
        properties: {
            _id: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            desc: {
                type: 'string',
            },
            propChanges: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropChange',
                },
            },
        },
    }),

    Template: openApiBaseModelSchema(
        [
            'instanceId',
            'name',
            'label',
            'desc',
            'userId',
            'singleEntry',
            'props',
        ],
        {
            instanceId: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            desc: {
                type: 'string',
            },
            userId: {
                type: 'string',
            },
            singleEntry: {
                type: 'boolean',
            },
            props: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Prop',
                },
            },
        },
    ),
    TemplateWhereIsItUsedResult: objectSchemaToOpenApi3Schema(
        TemplateWhereIsItUsedResultSchema,
    ),
    TemplateCreateBody: objectSchemaToOpenApi3Schema(TemplateCreateBodySchema),
    TemplateUpdateBody: openApiCreateSchema({
        type: 'object',
        required: ['_id'],
        properties: {
            _id: {
                type: 'string',
            },
            singleEntry: {
                type: 'boolean',
            },
            label: {
                type: 'string',
            },
            desc: {
                type: 'string',
            },
            propChanges: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropChange',
                },
            },
        },
    }),

    Widget: openApiBaseModelSchema(
        [
            'instanceId',
            'userId',
            'name',
            'label',
            'desc',
            'previewImage',
            'props',
        ],
        {
            instanceId: {
                type: 'string',
            },
            userId: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            desc: {
                type: 'string',
            },
            previewImage: {
                type: 'string',
            },
            props: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Prop',
                },
            },
        },
    ),
    WidgetWhereIsItUsedResult: objectSchemaToOpenApi3Schema(
        WidgetWhereIsItUsedResultSchema,
    ),
    WidgetCreateBody: objectSchemaToOpenApi3Schema(WidgetCreateBodySchema),
    WidgetUpdateBody: openApiCreateSchema({
        type: 'object',
        required: ['_id'],
        properties: {
            _id: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            desc: {
                type: 'string',
            },
            propChanges: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PropChange',
                },
            },
        },
    }),

    Language: objectSchemaToOpenApi3Schema(LanguageSchema),
    LanguageCreateBody: objectSchemaToOpenApi3Schema(LanguageCreateBodySchema),

    EntryStatus: objectSchemaToOpenApi3Schema(EntryStatusSchema),
    EntryStatusCreateBody: objectSchemaToOpenApi3Schema(
        EntryStatusCreateBodySchema,
    ),
    EntryStatusUpdateBody: objectSchemaToOpenApi3Schema(
        EntryStatusUpdateBodySchema,
    ),

    TemplateOrganizer: objectSchemaToOpenApi3Schema(TemplateOrganizerSchema),
    TemplateOrganizerCreateBody: objectSchemaToOpenApi3Schema(
        TemplateOrganizerCreateBodySchema,
    ),
    TemplateOrganizerUpdateBody: objectSchemaToOpenApi3Schema(
        TemplateOrganizerUpdateBodySchema,
    ),

    Backup: objectSchemaToOpenApi3Schema(BackupSchema),

    TypeGeneratorFile: objectSchemaToOpenApi3Schema(TypeGeneratorFileSchema),
};

export type OpenApiModelNames = keyof typeof OpenApiModels;

export function openApiGetSchema(): Omit<OpenAPIV3.Document, 'paths'> {
    return {
        openapi: '3.0.3',
        info: {
            title: 'BCMS REST API v4',
            description: '',
            version: '4.0.0',
            contact: {
                name: 'Website',
                url: 'https://thebcms.com',
                email: 'support@thebcms.com',
            },
        },
        servers: [{ url: 'http://localhost:8080', description: 'Development' }],
        components: {
            schemas: OpenApiModels as any,
            securitySchemes: {
                accessToken: {
                    type: 'http',
                    scheme: 'Bearer',
                    description:
                        'Token used to access protected resources' +
                        ' on behalf of a user. Format: `Authentication:' +
                        ' Bearer {access_token}`',
                },
                refreshToken: {
                    type: 'http',
                    scheme: 'Bearer',
                    description:
                        'Token used to obtain new access token.' +
                        ' Format: `Authentication: Bearer {refresh_token}`',
                },
                apiKey: {
                    type: 'http',
                    scheme: 'ApiKey',
                    description:
                        'Can be obtained via instance dashboard.' +
                        ' Format: `Authentication: ApiKey' +
                        ' {key_id}.{key_secret}`',
                },
            },
        },
    };
}

export function openApiBaseModelSchema(
    required: string[],
    properties: { [name: string]: OpenAPIV3.SchemaObject },
): OpenAPIV3.SchemaObject {
    return {
        type: 'object',
        required: ['_id', 'updatedAt', 'createdAt', ...required],
        properties: {
            _id: {
                type: 'string',
            },
            createdAt: {
                type: 'number',
            },
            update: {
                type: 'number',
            },
            ...properties,
        },
    };
}
