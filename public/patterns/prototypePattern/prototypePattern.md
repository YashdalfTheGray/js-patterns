The prototype pattern leverages JavaScript's prototypal inheritance to provide a blueprint which is used to create objects. A prototype object is created that contains all the common functionality. Afterwards, `Object.create()` is used to create new objects based off the prototype object.

```javascript
carPrototype = {
    details: function() { }
};
```

The `details()` method will be available to all objects created using the `carPrototype` object above. To create a new object based on a prototype,

```javascript
var newCar = Object.create(carPrototype, customizations);
```

The `customizations` object contains any members special to the `newCar` object like model, make or year.

In JavaScript, the protoype pattern is particularly easy to implement since it leverages the prototypal strengths of the language rather than trying to emulate features of other languages. There are also performance considerations with the prototype pattern since the prototype is a reference, each new object does not create another copy of the prototype object. 