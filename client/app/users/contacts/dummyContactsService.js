(function () {
    "use strict";

    function ContactsService($log) {
        this.createContact = function (person) {
            $log.debug('### NOT IMPLEMENTED!');
        }
    }

    angular.module('ttContacts').service('dummyContactsService', ContactsService);
})();
