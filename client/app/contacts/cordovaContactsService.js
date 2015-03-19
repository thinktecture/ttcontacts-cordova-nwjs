(function () {
    "use strict";

    function ContactsService($cordovaContacts, $log, $q) {
        this.createContact = function(person) {
            var deferred = $q.defer();

            var cordovaContact = {};
            cordovaContact.displayName = person.firstName + ' ' + person.firstName + ' (TT-C)';
            cordovaContact.name = {};
            cordovaContact.name.givenName = person.firstName;
            cordovaContact.name.familyName = person.lastName;
            cordovaContact.phoneNumbers = [];
            cordovaContact.phoneNumbers[0] = {type: 'work', value: person.phone, preference: true };
            cordovaContact.emails = [];
            cordovaContact.emails[0] = {type: 'work', value: person.email, preference: true };
            cordovaContact.note = 'From TT Contacts!';

            $cordovaContacts.save(cordovaContact).then(function(result) {
                $log.debug('### Contact successfully saved.');
                deferred.resolve(result);
            }, function(err) {
                $log.debug('### Error saving Contact: ' + err);
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }

    app.module.service('cordovaContactsService', ContactsService);
})();
