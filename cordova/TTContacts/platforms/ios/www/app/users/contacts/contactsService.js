(function () {
    "use strict";

    /**
     * @constructor
     */
    function ContactsService($window, $injector) {
        if ($window.cordova) {
            return $injector.get('cordovaContactsService');
        } else {
            return $injector.get('dummyContactsService');
        }
    }

    angular.module('users').factory('contactsService', ContactsService);
})();
