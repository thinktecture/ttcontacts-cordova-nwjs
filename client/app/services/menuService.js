(function () {
    "use strict";

    /**
     * @constructor
     */
    function MenuService() {
        var gui = require('nw.gui');
        var win = gui.Window.get();
        var nativeMenuBar = new gui.Menu({ type: "menubar" });
        nativeMenuBar.createMacBuiltin("TT Contacts");
        win.menu = nativeMenuBar;
    }

    app.module.service('menuService', MenuService);
})();
