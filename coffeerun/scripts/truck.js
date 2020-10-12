(function (window) {
    'use strict';

    var App = window.App || {};

    class Truck {
        constructor(truckId, db) {
            console.log('running the Truck function');
            this.truckId = truckId;
            this.db = db;
        }
        createOrder(order) {
            console.log('Adding order for ' + order.emailAddress);
            this.db.add(order.emailAddress, order);
        }
        deliverOrder(customerId) {
            console.log('Delivering order for ' + customerId);
            this.db.remove(customerId);
        }
        printOrders() {
            var customerIdArray = Object.keys(this.db.getAll());

            console.log('Truck #' + this.truckId + ' has pending orders:');
            customerIdArray.forEach(function (id) {
                console.log(this.db.get(id));
            }.bind(this));
        }
    }

    App.Truck = Truck;
    window.App = App;

})(window);