import { MemCache } from '@bcms/selfhosted-utils/mem-cache';
import type { Template } from '@bcms/selfhosted-backend/template/models/main';
import type { Client } from '@bcms/selfhosted-client/main';
import type {
    TemplateUpdateBody,
    TemplateWhereIsItUsedResult,
} from '@bcms/selfhosted-backend/template/models/controller';
import type {
    ControllerItemResponse,
    ControllerItemsResponse,
} from '@bcms/selfhosted-backend/util/controller';

/**
 * The TemplateHandler class is responsible for managing template operations such as fetching,
 * updating, and deleting templates. It interacts with a cache system and a client to perform
 * these operations.
 */
export class TemplateHandler {
    private baseUri = '/api/v4/template';
    private latch: {
        [name: string]: boolean;
    } = {};
    private cache = new MemCache<Template>('_id');

    constructor(private client: Client) {
        if (this.client.enableSocket) {
            this.client.socket.register('template', async (data) => {
                if (data.type === 'update') {
                    const cacheHit = this.cache.findById(data.templateId);
                    if (cacheHit) {
                        await this.getById(data.templateId, true);
                    }
                } else {
                    this.cache.remove(data.templateId);
                }
            });
        }
    }

    async whereIsItUsed(templateId: string) {
        return await this.client.send<TemplateWhereIsItUsedResult>({
            url: `${this.baseUri}/${templateId}`,
        });
    }

    async getAll(skipCache?: boolean) {
        if (!skipCache && this.client.useMemCache && this.latch.all) {
            return this.cache.items;
        }
        const res = await this.client.send<ControllerItemsResponse<Template>>({
            url: `${this.baseUri}/all`,
        });
        if (this.client.useMemCache) {
            this.cache.items = res.items;
            this.latch.all = true;
        }
        return res.items;
    }

    async getById(templateId: string, skipCache?: boolean) {
        if (!skipCache && this.client.useMemCache) {
            const cacheHit = this.cache.findById(templateId);
            if (cacheHit) {
                return cacheHit;
            }
        }
        const res = await this.client.send<ControllerItemResponse<Template>>({
            url: `${this.baseUri}/${templateId}`,
        });
        if (this.client.useMemCache) {
            this.cache.set(res.item);
        }
        return res.item;
    }

    async update(templateId: string, data: TemplateUpdateBody) {
        const res = await this.client.send<ControllerItemResponse<Template>>({
            url: `${this.baseUri}/${templateId}/update`,
            method: 'PUT',
            data,
        });
        if (this.client.useMemCache) {
            this.cache.set(res.item);
        }
        return res.item;
    }

    async deleteById(templateId: string) {
        const res = await this.client.send<ControllerItemResponse<Template>>({
            url: `${this.baseUri}/${templateId}`,
            method: 'DELETE',
        });
        if (this.client.useMemCache) {
            this.cache.remove(templateId);
        }
        return res.item;
    }
}
