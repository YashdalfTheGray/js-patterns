import test from 'ava';
import { Rectangle, Circle, Triangle, Parallelogram, Square } from './shapes';

test('Rectangle uses default values', (t) => {
    const r = new Rectangle();

    t.is(r.h, 1);
    t.is(r.l, 2);
});

test('Rectangle uses the given values', (t) => {
    const r = new Rectangle({ l: 3, h: 4 });

    t.is(r.h, 4);
    t.is(r.l, 3);
});

test('Rectangle returns the correct perimeter', (t) => {
    const r = new Rectangle({ l: 3, h: 4 });

    t.is(r.perimeter(), 14);
});

test('Rectangle returns the right area', (t) => {
    const r = new Rectangle({ l: 3, h: 4 });

    t.is(r.area(), 12);
});

test('Circle uses default values', (t) => {
    const c = new Circle();

    t.is(c.r, 1);
});

test('Circle uses given values', (t) => {
    const c = new Circle({ r: 2 });

    t.is(c.r, 2);
});

test('Circle returns the right perimeter', (t) => {
    const c = new Circle({ r: 3 });

    t.is(c.perimeter(), 18.84956);
});

test('Circle returns the right area', (t) => {
    const c = new Circle({ r: 3 });

    t.is(c.area(), 28.27433);
});

test('Triangle uses default values', (t) => {
    const tr = new Triangle();

    t.is(tr.a, 1);
    t.is(tr.b, 1);
    t.is(tr.c, 1);
});

test('Triangle uses given values', (t) => {
    const tr = new Triangle({ a: 3, b: 4, c: 5 });

    t.is(tr.a, 3);
    t.is(tr.b, 4);
    t.is(tr.c, 5);
});

test('Triangle returns the right perimeter', (t) => {
    const tr = new Triangle({ a: 3, b: 4, c: 5 });

    t.is(tr.perimeter(), 12);
});

test('Triangle returns the right area', (t) => {
    const tr = new Triangle({ a: 3, b: 4, c: 5 });

    t.is(tr.area(), 6);
});

test('Parallelogram uses default values', (t) => {
    const tr = new Parallelogram();

    t.is(tr.a, 1);
    t.is(tr.b, 1);
    t.is(tr.h, 1);
});

test('Parallelogram uses given values', (t) => {
    const tr = new Parallelogram({ a: 3, b: 4, h: 5 });

    t.is(tr.a, 3);
    t.is(tr.b, 4);
    t.is(tr.h, 5);
});

test('Parallelogram returns the right perimeter', (t) => {
    const tr = new Parallelogram({ a: 3, b: 4, h: 5 });

    t.is(tr.perimeter(), 14);
});

test('Parallelogram returns the right area', (t) => {
    const tr = new Parallelogram({ a: 3, b: 4, h: 5 });

    t.is(tr.area(), 20);
});

test('Square uses default values', (t) => {
    const tr = new Square();

    t.is(tr.a, 1);
});

test('Square uses given values', (t) => {
    const tr = new Square({ a: 3 });

    t.is(tr.a, 3);
});

test('Square returns the right perimeter', (t) => {
    const tr = new Square({ a: 3 });

    t.is(tr.perimeter(), 12);
});

test('Square returns the right area', (t) => {
    const tr = new Square({ a: 3 });

    t.is(tr.area(), 9);
});
