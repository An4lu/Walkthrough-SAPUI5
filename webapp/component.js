sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "./controller/HelloDialog",
    "sap/ui/Device",
  ],
  function (UIComponent, JSONModel, HelloDialog, Device) {
    "use strict";

    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      init: function () {
        // chamando a função init
        UIComponent.prototype.init.apply(this, arguments);
        // definindo modelo de data
        var oData = {
          recipient: {
            name: "Ana",
          },
        };
        var oModel = new JSONModel(oData);
        this.setModel(oModel);
        // Desabilitar o agrupamento de v2 API do serviço de northwind
        this.getModel("invoice").setUseBatch(false);

        // Definir os modelos de Dispositivo
        var oDeviceModel = new JSONModel(Device);
        oDeviceModel.setDefaultBindingMode("OneWay");
        this.setModel(oDeviceModel, "device");

        // Criando views baseando na URL/Hash
        this.getRouter().initialize();
      },

      exit: function () {
        this._helloDialog.destroy();
        delete this._helloDialog;
      },

      getContentDensityClass: function () {
        if (this._sContentDensityClass) {
          if (!Device.support.touch) {
            this._sContentDensityClass = "sapUiSizeCompact";
          } else {
            this._sContentDensityClass = "sapUiSizeCozy";
          }
        }
        return this._sContentDensityClass;
      },

      openHelloDialog: function () {
        this._helloDialog.open();
      },
    });
  }
);
