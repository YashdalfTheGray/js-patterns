import test from 'ava';
import { Rectangle } from './shapes';

test('Rectangle uses default values', (t) => {
    const r = new Rectangle();

    t.is(r.h, 1);
    t.is(r.h, 1);
});
