(function () {
    angular.module('users')
        .controller('UsersListController', UsersListController);

    function UsersListController(usersService, $mdSidenav, $mdBottomSheet, $log, $cordovaContacts) {
        var self = this;

        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.toggleList = toggleUsersList;
        self.share = share;

        usersService
            .loadAll()
            .then(function (users) {
                self.users = [].concat(users);
                self.selected = users[0];
            });

        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        function selectUser(user) {
            self.selected = angular.isNumber(user) ? $scope.users[user] : user;
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
                    $log.debug('### And now on to the native platform....');

                    var contact = {};
                    contact.displayName = self.selected.firstName + ' ' + self.selected.firstName + ' (TT-C)';
                    contact.name = {};
                    contact.name.givenName = self.selected.firstName;
                    contact.name.familyName = self.selected.lastName;
                    contact.phoneNumbers = [];
                    contact.phoneNumbers[0] = {type: 'work', value: self.selected.phone, preference: true };
                    contact.emails = [];
                    contact.emails[0] = {type: 'work', value: self.selected.email, preference: true };
                    contact.note = 'From TT Contacts!';

                    $cordovaContacts.save(contact).then(function(result) {
                        // Contact saved
                    }, function(err) {
                        // Contact error
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
        }
    }
})();
