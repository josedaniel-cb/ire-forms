import { Layout } from '../../core/field-set';
export declare class LayoutStyles {
    static autoGrid(minSize: string): string;
    static flexGridRem(params: {
        minWidth?: number;
        proportion?: number;
    }): string;
}
export declare class LayoutClasses {
    static readonly singleColumn = "single-column";
    static readonly autoGrid = "auto-grid";
    static readonly flexGrid = "flex-grid";
    static readonly centeredFlexGrid = "flex-grid centered";
}
export declare class Layouts {
    static readonly singleColumn: Layout;
    static readonly autoGrid: Layout;
    static autoGridRem(minSize: number): Layout;
    static readonly flexGrid: Layout;
    static flexGridRem(params: {
        minWidth?: number;
        proportion?: number;
        centered?: boolean;
    }): Layout;
    static readonly centeredFlexGrid: Layout;
}
//# sourceMappingURL=layouts.d.ts.map