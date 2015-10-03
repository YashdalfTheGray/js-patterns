The observer pattern consists of two parts, the subject and a list of observers. The subject maintains a list of observers that get notifications once the state of the subject changes. This can also include custom data that the observers can use to learn more about the state change. 

Once a particular observer no longer needs to be notified of the changes, they can be removed from the list of observers that the subject maintains.

The observer
```javascript
function Observer() {
    this.update = function() { };
}
```

The observer has an `update()` method which is called when the subject state changes. This is where additional data about the state change can be processed. As observers are added, the `update()` method is overwritten for custom functionality. 

The subject
```javascript
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer) { };

Subject.prototype.removeObserver = function(observer) { };

Subject.prototype.notify = function(context) { };
```

The subject has methods to add observers, remove observers and a `notify()` method to notify all the observers about a state change. 

The `ObserverList` constructor is just a helper object that contains an array and exposes methods to add, remove, get items as well as get the length of the items. This helps in making sure observers are correctly added and removed from the subject's list of observers. 