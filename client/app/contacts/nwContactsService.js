(function () {
    "use strict";

    function ContactsService($log, $q) {
        this.createContact = function (person) {
            var deferred = $q.defer();

            var dlgName = 'exportFile';
            var dlg = document.querySelector('#' + dlgName);

            if (!dlg) {
                var fileInput = document.createElement("input");
                fileInput.setAttribute('type', 'file');
                fileInput.setAttribute('nwsaveas', '');
                fileInput.setAttribute('style', 'display:none;');
                fileInput.setAttribute('id', dlgName);

                dlg = document.querySelector('body').appendChild(fileInput);
            }

            var vc = vCard();
            vc.firstName =  person.firstName;
            vc.lastName = person.lastName;
            vc.workPhone = person.phone;
            vc.email = person.email;
            vc.note = 'From TT Contacts!';

            saveFile(dlgName, vc.getFormattedString());

            function saveFile(name, data) {
                var chooser = document.querySelector('#' + name);

                chooser.addEventListener("change", function (evt) {
                    var fs = require('fs');
                    $log.debug('### Writing vCard');

                    fs.writeFile(this.value, data, function (err) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve();
                        }
                    });
                }, false);

                chooser.click();
            }

            return deferred.promise;
        }
    }

    app.module.service('nwContactsService', ContactsService);
})();
