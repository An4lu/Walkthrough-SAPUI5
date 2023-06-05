sap.ui.define([
  "../localService/mockserver"
], function(mockserver) {
  "use strict";

    //inicializador do mock server
    mockserver.init();

    //iniciando o componente incorporado na pagina html
    sap.ui.require(["sap/ui/core/ComponentSupport"]);

});