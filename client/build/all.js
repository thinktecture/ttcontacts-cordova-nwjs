(function () {
    "use strict";

    window.app = { module: angular.module('ttContacts', ['ngMaterial', 'ngCordova']) };

    app.module.config(["$mdThemingProvider", "$mdIconProvider", function ($mdThemingProvider, $mdIconProvider) {
            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("share", "./assets/svg/share.svg", 24)
                .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/svg/twitter.svg", 512)
                .icon("phone", "./assets/svg/phone.svg", 512);
        }]);

    app.module.run(["menuService", function (menuService) {
    }]);
})();

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
    ContactsService.$inject = ["$window", "$injector"];

    app.module.factory('contactsService', ContactsService);
})();

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
    ContactsService.$inject = ["$cordovaContacts", "$log", "$q"];

    app.module.service('cordovaContactsService', ContactsService);
})();

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
    ContactsService.$inject = ["$log", "$q"];

    app.module.service('nwContactsService', ContactsService);
})();

(function () {
    "use strict";

    /**
     * @constructor
     */
    function MenuService($log) {
        if (typeof process !== "undefined" && typeof require !== "undefined") {
            var gui = require("nw.gui");

            var nativeMenuBar = new gui.Menu({ type: "menubar" });

            if (process.platform === "darwin") {
                nativeMenuBar.createMacBuiltin("TT Contacts");
            }

            var window = gui.Window.get();
            window.menu = nativeMenuBar;
        }
    }
    MenuService.$inject = ["$log"];

    app.module.service('menuService', MenuService);
})();

(function () {
    'use strict';

    /**
     * @param $q
     * @constructor
     */
    function UsersDataService($q) {
        var users = [
            {
                firstName: 'Ingo',
                lastName: 'Rammer',
                email: 'ingo.rammer@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-1',
                content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
            },
            {
                firstName: 'Christian',
                lastName: 'Weyer',
                email: 'christian.weyer@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-2',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            },
            {
                firstName: 'Marco',
                lastName: 'Frodl',
                email: 'marco.frodl@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-9',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            },
            {
                firstName: 'Dominick',
                lastName: 'Baier',
                email: 'dominick.baier@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-3',
                content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumbersexual Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
            },
            {
                firstName: 'Thomas',
                lastName: 'Hilzendegen',
                email: 'thomas.hilzendegen@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-4',
                content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
            },
            {
                firstName: 'Pawel',
                lastName: 'Gerr',
                email: 'pawel.gerr@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-5',
                content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
            },
            {
                firstName: 'Steffen',
                lastName: 'Jahr',
                email: 'steffen.jahr@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-6',
                content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
            },
            {
                firstName: 'Manuel',
                lastName: 'Rauber',
                email: 'manuel.rauber@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-7',
                content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
            },
            {
                firstName: 'Christian',
                lastName: 'Liebel',
                email: 'christian.liebel@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-8',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            }
        ];

        this.loadAll = function () {
            return $q.when(users);
        }
    }
    UsersDataService.$inject = ["$q"];;

    app.module.service('usersDataService', UsersDataService)
})();

(function () {
    'use strict';
    
    /**
     * @param {UsersDataService} usersDataService
     */
    function UsersListController(usersDataService, $mdSidenav, $mdBottomSheet, $mdDialog, $log, contactsService) {
        var self = this;

        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.toggleList = toggleUsersList;
        self.share = share;

        usersDataService
            .loadAll()
            .then(function (users) {
                self.users = [].concat(users);
                self.selected = users[0];
            });

        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        function selectUser(user) {
            self.selected = angular.isNumber(user) ? this.users[user] : user;
            self.toggleList();
        }

        function share($event) {
            var user = self.selected;

            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: 'app/users/contactSheet.html',
                controller: UserSheetController,
                controllerAs: "vm"
            }).then(function (clickedItem) {
                $log.debug('### ' + clickedItem.name + ' clicked!');

                if(clickedItem.name == "Phone") {
                    contactsService.createContact(self.selected)
                        .then(function(result) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .title('Success')
                                    .content('Contact exported.')
                                    .ok(' OK ')
                            );
                        }, function(error) {

                        });
                }
            });

            function UserSheetController($mdBottomSheet) {
                this.user = user;
                this.items = [
                    {name: 'Phone', icon: 'phone'},
                    {name: 'Twitter', icon: 'twitter'},
                    {name: 'Google+', icon: 'google_plus'},
                    {name: 'Hangout', icon: 'hangouts'}
                ];
                this.performAction = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
            UserSheetController.$inject = ["$mdBottomSheet"];
        }
    }
    UsersListController.$inject = ["usersDataService", "$mdSidenav", "$mdBottomSheet", "$mdDialog", "$log", "contactsService"];

    app.module.controller('UsersListController', UsersListController);
})();
