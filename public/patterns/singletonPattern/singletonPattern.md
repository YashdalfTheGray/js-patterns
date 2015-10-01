The singleton pattern is used when single instantiation is required. A singleton is created by defining a method that, on first call, creates an instance of the class or object and then returns it. On consequent calls, the already declared method is returned. 

A singleton is JavaScript serve as a shared access point for common methods and data. The singleton object can be (and usually is) lazy loaded when it is needed.

```javascript
getInstance() {
    if (!instance) {
        instance = init();
    }
    return instance;
}
```

Here, `getInstance()` will instantiate the singleton object the first time it's called and return the same object in consecutive calls. This is the global point of access for singleton objects. 

```javascript
var randomNumGen = (function() {
    var instance;

    function init() {
        var pNumList = [];
        var pModuleName = 'Random Number Generator';
        function getAnotherNumber() { /* ommited */  }

        return {
            moduleName: pModuleName,
            numberList: pNumList,
            getAnother: getAnotherNumber
        };
    }

    return {
        getinstance: function getSingletonInstance() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
```