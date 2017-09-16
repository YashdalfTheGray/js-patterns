class AbstractShapeFactory {
    constructor() {
        this.types = {};
    }

    get(type, options) {
        const Shape = this.types[type];

        return (Shape ? new Shape(options) : null);
    }

    register(type, Shape) {
        if (Shape.prototype.area && Shape.prototype.perimeter && Shape.prototype.toString) {
            this.types[type] = Shape;
        }
        return this;
    }
}

module.exports = AbstractShapeFactory;
