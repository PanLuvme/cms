import { createMongoDBRepository } from '@bcms/selfhosted-backend/_server/modules/mongodb';
import {
    type Template,
    TemplateSchema,
} from '@bcms/selfhosted-backend/template/models/main';
import { Config } from '@bcms/selfhosted-backend/config';
import {
    createQueue,
    type Queue,
    QueueError,
} from '@bcms/selfhosted-utils/queue';
import { PropType } from '@bcms/selfhosted-backend/prop/models/main';

export interface TemplateRepoMethods {
    findAllByPropGroupPointer(groupId: string): Promise<Template[]>;
    findAllByPropEntryPointer(templateId: string): Promise<Template[]>;
    findByName(name: string): Promise<Template | null>;
}

export const TemplateRepo = createMongoDBRepository<
    Template,
    TemplateRepoMethods
>({
    name: 'Template',
    collection: `${Config.storageScope}_templates`,
    schema: TemplateSchema,
    methods({ mdb, cache }) {
        const latches: {
            [key: string]: boolean;
        } = {};
        const queues: {
            [key: string]: Queue<Template[]>;
        } = {};
        return {
            async findAllByPropEntryPointer(templateId) {
                if (!queues[templateId]) {
                    queues[templateId] = createQueue();
                }
                const queue = await queues[templateId]({
                    name: 'entryPointer',
                    handler: async () => {
                        if (latches[templateId]) {
                            return cache.findMany((group) => {
                                return !!group.props.find(
                                    (prop) =>
                                        prop.type === PropType.ENTRY_POINTER &&
                                        prop.data.propEntryPointer &&
                                        prop.data.propEntryPointer.find(
                                            (e) => e.templateId === templateId,
                                        ),
                                );
                            });
                        }
                        const result = await mdb
                            .find({
                                'props.type': PropType.ENTRY_POINTER,
                                'props.data.propEntryPointer.templateId':
                                    templateId,
                            })
                            .toArray();
                        cache.set(result);
                        latches[templateId] = true;
                        return result;
                    },
                }).wait;
                if (queue instanceof QueueError) {
                    throw queue.error;
                }
                return queue.data;
            },

            async findAllByPropGroupPointer(groupId) {
                if (!queues[groupId]) {
                    queues[groupId] = createQueue();
                }
                const queue = await queues[groupId]({
                    name: 'group',
                    handler: async () => {
                        if (latches[groupId]) {
                            return cache.findMany((group) => {
                                return !!group.props.find(
                                    (prop) =>
                                        prop.type === PropType.GROUP_POINTER &&
                                        prop.data.propGroupPointer &&
                                        prop.data.propGroupPointer._id ===
                                            groupId,
                                );
                            });
                        }
                        const result = await mdb
                            .find({
                                'props.type': PropType.GROUP_POINTER,
                                'props.data.propGroupPointer._id': groupId,
                            })
                            .toArray();
                        latches[groupId] = true;
                        cache.set(result);
                        return result;
                    },
                }).wait;
                if (queue instanceof QueueError) {
                    throw queue.error;
                }
                return queue.data;
            },

            async findByName(name) {
                const cacheHit = cache.find((e) => e.name === name);
                if (cacheHit) {
                    return cacheHit;
                }
                const result = await mdb.findOne({ name });
                if (result) {
                    cache.set(result);
                }
                return result;
            },
        };
    },
});
