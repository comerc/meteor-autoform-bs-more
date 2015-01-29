// FIXME: https://github.com/twbs/bootstrap/issues/15483 >>> https://github.com/darcyclarke/Watch.js
Template.modalForm.helpers({
  outerContext: function() {
    var outerContext = Template.parentData(3);
    var innerContext = {_af: this._af};
    _.extend(innerContext, outerContext);
    return innerContext;
  },
  innerContext: function() {
    var atts = this;
    var mfAutoFormContext = _.omit(atts, "buttonContent", "label", "unmodal", "dialogSize", "fade");
    if (atts.tabIndex === false) {
      delete mfAutoFormContext.tabIndex;
    }
    if (atts.unmodal) {
      mfAutoFormContext = _.omit(mfAutoFormContext, "readonly", "disabled");
      return {
        mfAutoFormContext: mfAutoFormContext,
        atts: atts
      };
    } else {
      if (atts.dialogSize) {
        atts.dialogSize = "modal-" + atts.dialogSize;
      }
      atts.fade = atts.fade ? "fade" : "";
      var mfShouldRenderButton = (atts.buttonContent !== false && atts.type !== "readonly" && atts.type !== "disabled");
      return {
        mfAutoFormContext: mfAutoFormContext,
        atts: atts,
        mfShouldRenderButton: mfShouldRenderButton
      };
    }
  }
});

Template.modalForm.rendered = function() {
  if (this.data.unmodal) {
    return;
  }
  var id = this.data.id;
  var $element = this.$("#" + id);
  var hooks = {};
  hooks[id] = {
    onSuccess: function(operation, result, template) {
      $element.modal("hide");
    },
    onError: function(operation, error, template) {
      setTimeout(function() {
        $element.modal("handleUpdate");
      }, 0);
    }
  };
  AutoForm.hooks(hooks);
  // very slow execution
  // $element.on("shown.bs.modal", function() {
  //   AutoForm.resetForm(id);
  // });
  // TODO: http://getbootstrap.com/javascript/#buttons-stateful
};
