import type { Widget, WidgetColorType } from "@/models/widget";
import axios, { HttpStatusCode } from "axios";
import type { AxiosResponse } from "axios";
import config from "@/config/config";
import { WidgetUpdateError } from "@/errors/widget-update-error";
import { WidgetFetchError } from "@/errors/widget-fetch-error";

class WidgetService {
    public async fetchAllWidget(): Promise<Widget[]> {
        const response = await axios.get(`${config.backendUrl}/widgets`);
        WidgetService.validateFetchResponse(response);
        return response.data;
    }

    public async updateWidgetActive(id: number, active: boolean): Promise<void> {
        const response = await axios.put(`${config.backendUrl}/widgets/${id}/active`, { active });
        WidgetService.validateUpdateResponse(response, id, 'active');
    }

    public async updateWidgetColor(id: number, selectedColor: WidgetColorType): Promise<void> {
        const response = await axios.put(`${config.backendUrl}/widgets/${id}/color`, { selectedColor });
        WidgetService.validateUpdateResponse(response, id, 'selectedColor');
    }

    public async updateWidgetLinked(id: number, linked: boolean): Promise<void> {
        const response = await axios.put(`${config.backendUrl}/widgets/${id}/linked`, { linked });
        WidgetService.validateUpdateResponse(response, id, 'linked');
    }

    private static validateUpdateResponse(response: AxiosResponse, id: number, updateProperty: string): void {
        if (response.status !== HttpStatusCode.Ok) {
            throw new WidgetUpdateError(
                `Could not update ${updateProperty} property of widget with id ${id}. ${response.status} ${response.statusText}`
            );
        }
    }

    private static validateFetchResponse(response: AxiosResponse): void {
        if (response.status !== HttpStatusCode.Ok) {
            throw new WidgetFetchError(`Could not fetch widgets. ${response.status} ${response.statusText}`);
        }
    }
}

export default new WidgetService();