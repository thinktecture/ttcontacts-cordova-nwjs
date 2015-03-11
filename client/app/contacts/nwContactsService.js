(function () {
    "use strict";

    function ContactsService($log) {
        this.createContact = function (person) {
            $log.debug('### Writing VCard');

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

            saveFile(dlgName, 'THIS WILL BE A VCARD SOON ;)');

            function saveFile(name, data) {
                var chooser = document.querySelector('#' + name);

                chooser.addEventListener("change", function (evt) {
                    var fs = require('fs');

                    fs.writeFile(this.value, data, function (err) {
                        if (err) {
                            alert("error: " + err);
                        }
                    });
                }, false);

                chooser.click();
            }
        }
    }

    app.module.service('nwContactsService', ContactsService);
})();
