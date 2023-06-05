sap.ui.define([
  "sap/ui/core/util/MockServer",
  "sap/base/util/UriParameters"
], function(MockServer, UriParameters) {
  'use strict';
  
  return{
    init: function(){
      //criando
      var oMockServer = new MockServer({
        rootUri: "https://services.odata.org/V2/Northwind/Northwind.svc/"
      });

      var oUriParameters = new UriParameters (window.location.href);

      //configurando o mock server
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: oUriParameters.get("serverDelay") || 500
      });

      //simulando
      var sPath = sap.ui.require.toUrl("sap/ui/demo/walkthrough/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

      //iniciando
      oMockServer.start();
    }
  }
});