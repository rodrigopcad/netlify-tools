export class Text {
    static normalizeToSearch(text: string) {
        return text
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }
}