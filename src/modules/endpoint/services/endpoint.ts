import { API } from "../models/api";

export class EndpointService {
    private apiDocURL = "https://sigaapih3.webtraining.com.br/ApiSigaMobile/swagger/docs/v1";

    public async fetchEndpoint(): Promise<string[]> {
        let data: API;

        try {
            data = await fetch(this.apiDocURL, { method: "GET", }).then(data => data.json());
        } catch (e: unknown) {
            throw new Error(`Failed to fetch endpoints from API\n ${e}`);
        }

        if (!data || data === undefined || data === null) {
            return [];
        }

        const endpoints = Object.keys(data.paths).map(key => key).sort((a, b) => a.localeCompare(b));
        return endpoints;
    }
}