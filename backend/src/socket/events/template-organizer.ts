import type { ObjectSchema } from '@bcms/selfhosted-utils/object-utility';
import {
    type SocketEventDataDefault,
    SocketEventDataDefaultSchema,
} from './main';

export interface SocketEventDataTemplateOrganizer
    extends SocketEventDataDefault {
    templateOrganizerId: string;
}

export const SocketEventDataTemplateOrganizerSchema: ObjectSchema = {
    ...SocketEventDataDefaultSchema,
    templateOrganizerId: {
        __type: 'string',
        __required: true,
    },
};

export type SocketEventNamesTemplateOrganizer = {
    template_organizer: SocketEventDataTemplateOrganizer;
};
