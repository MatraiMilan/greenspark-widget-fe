import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios, { HttpStatusCode } from "axios";
import { getTestWidgets } from "../../components/__tests__/utils/models";
import { ACTION, actions } from "../actions";
import type { Store } from "vuex";
import { createStore } from "vuex";
import type { State } from "../../models/state";
import { state } from "../state";
import { getters } from "../getters";
import { mutations } from "../mutations";
import config from "../../config/config";

describe.only("Store", () => {
    const testWidgetId = 1;
    let store: Store<State>;

    beforeEach(() => {
        store = createStore({
            state,
            getters,
            actions,
            mutations,
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('when backend requests are succeeded', () => {
        beforeEach(() => {
            vi.spyOn(axios, "get").mockResolvedValue({ data: getTestWidgets(), status: HttpStatusCode.Ok });
            vi.spyOn(axios, 'put').mockResolvedValue({ status: HttpStatusCode.Ok });
        });

        it("should load widgets when loadWidgets event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);

            expect(axios.get).toHaveBeenCalledWith(
                `${config.backendUrl}/widgets`
            );
            expect(store.state.widgets).toEqual(getTestWidgets());
        });

        it("should set linked value properly of given widget when setLinked event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);
            expect(store.state.widgets[0].id).equal(testWidgetId);
            expect(store.state.widgets[0].linked).false;

            await store.dispatch(ACTION.SET_LINKED, { id: testWidgetId, linked: true });

            expect(store.state.widgets[0].linked).true;
        });

        it("should set selectedColor value properly of given widget when setColor event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);
            expect(store.state.widgets[0].id).equal(testWidgetId);
            expect(store.state.widgets[0].selectedColor).toEqual("blue");

            await store.dispatch(ACTION.SET_COLOR, {
                id: testWidgetId,
                selectedColor: "black",
            });

            expect(store.state.widgets[0].selectedColor).toEqual("black");
        });

        it("should set active value properly of given widget when setActive event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);
            expect(store.state.widgets[0].id).equal(testWidgetId);
            expect(store.state.widgets[0].active).toEqual(true);

            await store.dispatch(ACTION.SET_ACTIVE, {
                id: testWidgetId,
                active: false,
            });

            expect(store.state.widgets[0].active).toEqual(false);
        });
    });

    describe('when backend requests are failed', () => {
        beforeEach(() => {
            store.state.widgets = getTestWidgets();
            vi.spyOn(axios, "get").mockResolvedValue({ status: HttpStatusCode.Forbidden });
            vi.spyOn(axios, 'put').mockResolvedValue({ status: HttpStatusCode.Forbidden });
        });

        it("should not load widgets when loadWidgets event dispatched", async () => {
            store.state.widgets = [];
            await store.dispatch(ACTION.LOAD_WIDGETS);

            expect(axios.get).toHaveBeenCalledWith(
                `${config.backendUrl}/widgets`
            );
            expect(store.state.widgets).toEqual([]);
        });

        it("should not set linked value of given widget when setLinked event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);
            expect(store.state.widgets[0].id).equal(testWidgetId);
            expect(store.state.widgets[0].linked).false;

            await store.dispatch(ACTION.SET_LINKED, { id: testWidgetId, linked: true });

            expect(store.state.widgets[0].linked).false;
        });

        it("should not set selectedColor value of given widget when setColor event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);
            expect(store.state.widgets[0].id).equal(testWidgetId);
            expect(store.state.widgets[0].selectedColor).toEqual("blue");

            await store.dispatch(ACTION.SET_COLOR, {
                id: testWidgetId,
                selectedColor: "green",
            });

            expect(store.state.widgets[0].selectedColor).toEqual("blue");
        });

        it("should not set active value of given widget when setActive event dispatched", async () => {
            await store.dispatch(ACTION.LOAD_WIDGETS);
            expect(store.state.widgets[1].id).equal(2);
            expect(store.state.widgets[1].active).toEqual(false);

            await store.dispatch(ACTION.SET_ACTIVE, {
                id: 1,
                active: true,
            });

            expect(store.state.widgets[1].active).toEqual(false);
        });
    });
});
