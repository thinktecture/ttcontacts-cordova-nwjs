/**
 * Created by christianweyer on 04.03.15.
 */
(function () {
    "use strict";

    function startAngularApp() {
        var appContainer = document.querySelector('html');
        angular.bootstrap(appContainer, ['ttContacts']);
    }

    if (window.cordova) {
        document.addEventListener('deviceready', startAngularApp, false);
        alert("Cordova");
    } else {
        startAngularApp();
    }
})();
