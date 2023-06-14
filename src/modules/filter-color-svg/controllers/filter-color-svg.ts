import { Color } from "../core/color";
import { Solver } from "../core/solver";

export class FilterColorSvgController {
    private targetColor: string;

    constructor(targetColor: string) {
        this.targetColor = targetColor;
    }

    public handleFilterColor(): string {
        const [r, g, b] = Solver.hexToRgb(this.targetColor);
        const color = new Color(r, g, b);

        if (color.r === undefined || color.g === undefined || color.b === undefined) {
            return "";
        }

        const solver = new Solver(color);
        const filter = solver.solve();
        return filter.filter;
    }
} 