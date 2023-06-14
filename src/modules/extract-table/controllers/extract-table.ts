export class ExtractTableController {
    public generate(procedure: string): string {
        const regex = /(?<=(from|join|into)(\s|\n)+)(\w)+\.?\w+(\.\w+)?/gmi;
        return Array.from(new Set(procedure.match(regex)))
            .map(v => "SELECT * FROM " + v)
            .join("\n");

    }
}