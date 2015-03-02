(function () {
    angular.module('users')
        .controller('UsersListController', UsersListController);

    function UsersListController(usersService, $mdSidenav, $mdBottomSheet, $log) {
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
                templateUrl: 'app/users/contactSheet.html',
                controller: UserSheetController,
                controllerAs: "vm"
            }).then(function (clickedItem) {
                $log.debug(clickedItem.name + ' clicked!');
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
