import test from 'ava';
import AbstractShapeFactory from './abstractShapeFactory';
import { Rectangle, Circle } from './shapes';

class NotQuite {
    area() {
        return 1;
    }
}

test('AbstractShapeFactory has no shapes to start', (t) => {
    const asf = new AbstractShapeFactory();

    t.is(asf.get('Square'), null);
});

test('AbstractShapeFactory can return a new type', (t) => {
    const asf = new AbstractShapeFactory();

    asf.register('circle', Circle);

    t.is(asf.get('circle').r, 1);
});

test('AbstractShapeFactory can return a new type with options', (t) => {
    const asf = new AbstractShapeFactory();

    asf.register('circle', Circle);

    t.is(asf.get('circle', { r: 4 }).r, 4);
});

test('AbstractShapeFactory is able to register a shape', (t) => {
    const asf = new AbstractShapeFactory();

    asf.register('rectangle', Rectangle);

    t.pass(!!asf.get('rectangle'));
});

test('AbstractShapeFactory is able to chain register shapes', (t) => {
    const asf = new AbstractShapeFactory();

    asf.register('rectangle', Rectangle).register('circle', Circle);

    t.pass(!!asf.get('rectangle'));
    t.pass(!!asf.get('circle'));
});

test('AbstractShapeFactory doesn\'t register invalid shapes', (t) => {
    const asf = new AbstractShapeFactory();

    asf.register('test', NotQuite);

    t.pass(!asf.get('test'));
});
