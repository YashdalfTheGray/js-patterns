The constructor pattern is fairly simple and is designed to work just like a constructor in other OO languages.

In this example, there is a `Car` constructor function which is used to add new `Car` objects to the list at the bottom of the demo.

Constructor functions in Javascript can also be used to specify common methods for all instances to use. This can be accomplished by adding member functions to the `prototype`. In this example, there is a `toString()` defined in `Car.prototype` which all instances of `Car` can use to display their values.

The list at the end of the demo uses `Car.prototype.toString()` method to display values.

The `Car` constructor and the `toString()` method from the source

```javascript
function Car(model, year, mileage) {
    this.model = model;
    this.year = year;
    this.mileage = mileage;
}

Car.prototype.toString = function() {
    return 'This ' + this.year + ' ' + this.model + ' has driven ' + this.mileage + ' miles.';
};
```