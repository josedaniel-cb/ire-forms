export class LayoutStyles {
    static autoGrid(minSize) {
        return `--auto-grid-min-size: ${minSize}`;
    }
    static flexGridRem(params) {
        const minWidth = `${params.minWidth !== undefined ? params.minWidth : 16}rem`;
        const proportion = `${(params.proportion !== undefined ? params.proportion : 1 / 3) * 100}%`;
        return `--proportion: ${proportion}; --min-width: ${minWidth}`;
    }
}
export class LayoutClasses {
    static { this.singleColumn = 'single-column'; }
    static { this.autoGrid = 'auto-grid'; }
    static { this.flexGrid = 'flex-grid'; }
    static { this.centeredFlexGrid = 'flex-grid centered'; }
}
export class Layouts {
    static { this.singleColumn = {
        classes: LayoutClasses.singleColumn,
        styles: '',
    }; }
    static { this.autoGrid = {
        classes: LayoutClasses.autoGrid,
        styles: '',
    }; }
    static autoGridRem(minSize) {
        return {
            classes: LayoutClasses.autoGrid,
            styles: LayoutStyles.autoGrid(`${minSize}rem`),
        };
    }
    static { this.flexGrid = {
        classes: LayoutClasses.flexGrid,
        styles: '',
    }; }
    static flexGridRem(params) {
        const centered = params.centered ?? false;
        return {
            classes: centered
                ? LayoutClasses.centeredFlexGrid
                : LayoutClasses.flexGrid,
            styles: LayoutStyles.flexGridRem(params),
        };
    }
    static { this.centeredFlexGrid = {
        classes: LayoutClasses.centeredFlexGrid,
        styles: '',
    }; }
}
//# sourceMappingURL=layouts.js.map