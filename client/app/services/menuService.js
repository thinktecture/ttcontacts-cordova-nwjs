(function () {
    "use strict";

    /**
     * @constructor
     */
    function MenuService() {
        if (typeof process !== "undefined" && typeof require !== "undefined") {
            var gui = require("nw.gui");

            var nativeMenuBar = new gui.Menu({ type: "menubar" });
            nativeMenuBar.createMacBuiltin("TT Contacts");

            var window = gui.Window.get();
            window.menu = nativeMenuBar;
        }
    }

    app.module.service('menuService', MenuService);
})();
