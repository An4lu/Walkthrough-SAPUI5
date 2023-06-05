sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment",
    "sap/ui/core/syncStyleClass",
  ],
  function (ManagedObject, Fragment, syncStyleClass) {
    "use strict";

    return ManagedObject.extend("sap.ui.walkthrough.controller.HelloDialog", {
      constructor: function (oView) {
        this._oView = oView;
      },

      exit: function () {
        delete this._oView;
      },

      open: function () {
        var oView = this._oView;

        // criando o dialogo
        if (!oView.byId("helloDialog")) {
          var oFragmentController = {
            onCloseDialog: function () {
              oView.byId("helloDialog").close();
            },
          };

          //carregar fragmento do XML assincrono
          Fragment.load({
            id: oView.getId(),
            name: "sap.ui.demo.walkthrough.view.HelloDialog",
            controller: oFragmentController,
          }).then(
            function (oDialog) {
              //conecta com a root view do componente do dialogo (models e lifecycle)
              oView.addDependent(oDialog);
              // Encaminha style compacto/aconchegante para o diálogo
              syncStyleClass(
                this.getOwnerComponent().getContentDensityClass(),
                this.getView(),
                oDialog
              );
              return oDialog;
            }.bind(this)
          );
        }
        this.pDialog.then(function (oDialog) {
          oDialog.open();
        });
      },

      onCloseDialog: function () {
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        this.byId("helloDialog").close();
      },
    });
  }
);
