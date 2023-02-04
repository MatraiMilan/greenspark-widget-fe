import { describe, expect, it, vi } from "vitest";
import widgetService from "../widget-service";
import axios, { HttpStatusCode } from "axios";
import config from "../../config/config";
import { WidgetUpdateError } from "../../errors/widget-update-error";
import { WidgetFetchError } from "../../errors/widget-fetch-error";

describe('WidgetService', () => {
    describe('fetchAllWidget', () => {
        it('should fetch all widgets', async () => {
            const widgets = [{
                id: 1,
                type: "plastic bottles",
                amount: 100,
                action: "collects",
                active: true,
                linked: false,
                selectedColor: "blue",
            }];
            vi.spyOn(axios, 'get').mockResolvedValueOnce({
                data: widgets,
                status: HttpStatusCode.Ok
            });

            const actual = await widgetService.fetchAllWidget();

            expect(axios.get).toBeCalledWith(`${config.backendUrl}/widgets`)
            expect(actual).toEqual(widgets);
        });

        it('should throw a WidgetFetchError when widget fetch failed', async () => {
            const status = HttpStatusCode.Forbidden;
            const statusText = 'Forbidden';
            vi.spyOn(axios, 'get').mockResolvedValueOnce({ status, statusText });

            await expect(() => widgetService.fetchAllWidget())
                .rejects.toThrowError(new WidgetFetchError(`Could not fetch widgets. ${status} ${statusText}`));
        });
    });

    describe('updateWidgetActive', () => {
        it('should send update request to the backend to update active property of widget', async () => {
            const id = 1;
            const active = true;
            vi.spyOn(axios, 'put').mockResolvedValueOnce({
                status: HttpStatusCode.Ok
            });

            await widgetService.updateWidgetActive(id, active);

            expect(axios.put).toHaveBeenCalledWith(`${config.backendUrl}/widgets/${id}/active`, { active })
        });

        it('should throw a WidgetUpdateError when widget update failed', async () => {
            const id = 1;
            const status = HttpStatusCode.Forbidden;
            const statusText = 'Forbidden';
            vi.spyOn(axios, 'put').mockResolvedValueOnce({ status, statusText });

            await expect(widgetService.updateWidgetActive(id, false))
                .rejects.toThrow(
                    new WidgetUpdateError(
                        `Could not update active property of widget with id ${id}. ${status} ${statusText}`
                    )
                );
        });
    });

    describe('updateWidgetColor', () => {
        it('should send update request to the backend to update selectedColor property of widget', async () => {
            const id = 1;
            const selectedColor = 'black';
            vi.spyOn(axios, 'put').mockResolvedValueOnce({
                status: HttpStatusCode.Ok
            });

            await widgetService.updateWidgetColor(id, selectedColor);

            expect(axios.put).toHaveBeenCalledWith(`${config.backendUrl}/widgets/${id}/color`, { selectedColor })
        });

        it('should throw a WidgetUpdateError when widget update failed', async () => {
            const id = 1;
            const selectedColor = 'black';
            const status = HttpStatusCode.Forbidden;
            const statusText = 'Forbidden';
            vi.spyOn(axios, 'put').mockResolvedValueOnce({ status, statusText });

            await expect(widgetService.updateWidgetColor(id, selectedColor))
                .rejects.toThrow(
                    new WidgetUpdateError(
                        `Could not update selectedColor property of widget with id ${id}. ${status} ${statusText}`
                    )
                );
        });
    });

    describe('updateWidgetLinked', () => {
        it('should send update request to the backend to update linked property of widget', async () => {
            const id = 1;
            const linked = true;
            vi.spyOn(axios, 'put').mockResolvedValueOnce({
                status: HttpStatusCode.Ok
            });

            await widgetService.updateWidgetLinked(id, linked);

            expect(axios.put).toHaveBeenCalledWith(`${config.backendUrl}/widgets/${id}/linked`, { linked })
        });

        it('should throw a WidgetUpdateError when widget update failed', async () => {
            const id = 1;
            const status = HttpStatusCode.Forbidden;
            const statusText = 'Forbidden';
            vi.spyOn(axios, 'put').mockResolvedValueOnce({ status, statusText });

            await expect(widgetService.updateWidgetLinked(id, false))
                .rejects.toThrow(
                    new WidgetUpdateError(
                        `Could not update linked property of widget with id ${id}. ${status} ${statusText}`
                    )
                );
        });
    });
});
