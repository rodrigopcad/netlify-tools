import { Text } from "common/helpers/text";
import { EndpointProcedure } from "../models/endpoint-procedure";
import { StoredProcedure } from "../models/stored-procedure";
import { EndpointService } from "../services/endpoint";

export class EndpointController {
    private _endpoints: EndpointProcedure[] = [];

    private _qtyEndpointsTotal = "0";
    get qtyEndpointsTotal() {
        return this._qtyEndpointsTotal;
    }

    private _qtyEndpointsVisible = "0";
    get qtyEndpointsVisible() {
        return this._qtyEndpointsVisible.padStart(this._qtyEndpointsTotal.length, "0");
    }

    public setContainerWidth(div: HTMLDivElement) {
        if (!div || div.clientWidth === 0) {
            return;
        }

        div.style.width = `${div.clientWidth}px`;
    }

    public async handleEndpoints(): Promise<void> {
        const service = new EndpointService();
        const endpoints = await service.fetchEndpoint() || [];
        const storedProcedure = new StoredProcedure();
        const data: EndpointProcedure[] = [];
        const withoutProcedure: EndpointProcedure[] = [];

        endpoints.forEach(endpoint => {
            const procedure = storedProcedure.get(endpoint);
            const obj = { endpoint, procedure };

            procedure
                ? data.push(obj)
                : withoutProcedure.push(obj);
        });

        data.unshift(...withoutProcedure);

        this._qtyEndpointsTotal = data.length.toString();
        this._endpoints = data;
    }

    public search(value: string): EndpointProcedure[] {
        const query = Text.normalizeToSearch(value);

        const result = this._endpoints.filter(item => {
            return Text.normalizeToSearch(item.endpoint).includes(query) ||
                Text.normalizeToSearch(item.procedure).includes(query);
        });

        this._qtyEndpointsVisible = result.length.toString();
        return result;
    }

    public matchTheSearch(value: string, query: string): { __html: string } {
        if (query === "") {
            return { __html: value };
        }

        const regex = new RegExp(`${query}`, "gim");
        const result = value.replace(regex, "<mark>$&</mark>");
        return { __html: result };
    }
}
