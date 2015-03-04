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

    angular.module('ttContacts').factory('contactsService', ContactsService);
})();
