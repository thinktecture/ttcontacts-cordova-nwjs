(function () {
    "use strict";

    /**
     * @constructor
     */
    function ContactsService($window, $injector) {
        if ($window.cordova) {
            return $injector.get('cordovaContactsService');
        } else {
            return $injector.get('nwContactsService');
        }
    }

    app.module.factory('contactsService', ContactsService);
})();
