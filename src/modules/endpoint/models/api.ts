export interface API {
    swagger?: string;
    info?: {
        version?: string;
        title?: string;
    };
    host?: string;
    basePath?: string;
    schemes?: string[];
    paths: { [key: string]: string }[];
}