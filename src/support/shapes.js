function formatNumber(number) {
    return Math.round(number * 100000) / 100000;
}

class Rectangle {
    constructor({ h, l } = { h: 1, l: 2 }) {
        this.h = h;
        this.l = l;
    }
    area() {
        return formatNumber(this.h * this.l);
    }
    perimeter() {
        return formatNumber(2 * (this.h + this.l));
    }
    toString() {
        return `This rectangle has a length of ${this.l} and a height of ${this.h}. The area is ${this.area()} and the perimeter is ${this.perimeter()}.`;
    }
}

class Circle {
    constructor({ r } = { r: 1 }) {
        this.r = r;
    }
    area() {
        return formatNumber(Math.PI * this.r * this.r);
    }
    perimeter() {
        return formatNumber(2 * Math.PI * this.r);
    }
    toString() {
        return `This circle has a radius of ${this.r}. The area is ${this.area()} and the perimeter is ${this.perimeter()}.`;
    }
}

class Triangle {
    constructor({ a, b, c } = { a: 1, b: 1, c: 1 }) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    area() {
        const s = 0.5 * this.perimeter();
        return formatNumber(Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c)));
    }
    perimeter() {
        return formatNumber(this.a + this.b + this.c);
    }
    toString() {
        return `This triangle has side lengths ${this.a}, ${this.b} and ${this.c}. The area is ${this.area()} and the perimeter is ${this.perimeter()}.`;
    }
}

class Parallelogram {
    constructor({ a, b, h } = { a: 1, b: 1, h: 1 }) {
        this.a = a;
        this.b = b;
        this.h = h;
    }
    area() {
        return formatNumber(this.b * this.h);
    }
    perimeter() {
        return formatNumber(2 * (this.a + this.b));
    }
    toString() {
        return `This Parallelogram has side lengths ${this.a}, ${this.b} and height ${this.h}. The area is ${this.area()} and the perimeter is ${this.perimeter()}.`;
    }
}

class Square {
    constructor({ a } = { a: 1 }) {
        this.a = a;
    }
    area() {
        return formatNumber(this.a * this.a);
    }
    perimeter() {
        return formatNumber(4 * this.a);
    }
    toString() {
        return `This Square has side length ${this.a}. The area is ${this.area()} and the perimeter is ${this.perimeter()}.`;
    }
}


module.exports = {
    Rectangle,
    Circle,
    Triangle,
    Parallelogram,
    Square
};
