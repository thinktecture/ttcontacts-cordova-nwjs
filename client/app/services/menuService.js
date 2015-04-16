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

    app.module.service('menuService', MenuService);
})();
