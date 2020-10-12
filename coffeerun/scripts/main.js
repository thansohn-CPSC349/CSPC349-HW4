(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';     // CHOOSE ONLY ONE...
    //var SERVER_URL = 'https://co.audstanley.com/coffeeorders';    // if running on the shared server
    //var SERVER_URL = 'http://localhost:2403/dashboard/coffeeorders/data/';          // if running locally
    var SERVER_URL = 'http://localhost:3000/coffeeorders';
    var USE_REMOTE_DATASTORE = true;
    var App = window.App;
    var Truck = App.Truck;
    var RemoteDataStore = App.RemoteDataStore;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
   
    var truck;

    if (USE_REMOTE_DATASTORE) {
        truck = new Truck('ncc-1701', new RemoteDataStore(SERVER_URL));
    } else {
        truck = new Truck('ncc-1701', new DataStore());
    }

    window.truck = truck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));

    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);