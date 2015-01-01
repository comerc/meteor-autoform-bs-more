Template.extendFormGroupAttrs.helpers({
  data: function() {
    var atts = {};
    _.each(this, function (val, key) {
      atts["afFormGroup-" + key] = val;
    });
    return _.extend(atts, Template.parentData(1));
  }
});

// TODO: waiting for https://github.com/aldeed/meteor-autoform/pull/533
// FIXME: triggered after showing modal form
Template.registerHelper("afFieldValueContains2", function autoFormFieldValueContains2(options) {
  options = parseOptions(options, "afFieldValueContains2");
  var currentValue = AutoForm.getFieldValue(options.formId, options.name);
  if (typeof options.value === "function") {
    return options.value(currentValue);
  }
  return _.isArray(currentValue) && _.contains(currentValue, options.value);
});

Template.registerHelper('afFieldIsInvalid2', function autoFormFieldIsInvalid2(options) {
  options = parseOptions(options, 'afFieldIsInvalid');
  var fieldList = options.fields;
  if (fieldList) {
    fieldList = AutoForm.Utility.stringToArray(fieldList, 'AutoForm: fields attribute must be an array or a string containing a comma-delimited list of fields');
    for (var i = 0; i < fieldList.length; i++) {
      if (options.ss.namedContext(options.formId).keyIsInvalid(fieldList[i])) {
        return true;
      }
    }
  }
  return options.ss.namedContext(options.formId).keyIsInvalid(options.name);
});

var parseOptions = function(options, helperName) {
  var afContext, hash;
  hash = (options || {}).hash || {};
  afContext = AutoForm.find(helperName);
  hash.name && AutoForm.Utility.getDefs(afContext.ss, hash.name);
  return _.extend({}, afContext, hash);
};

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
  var id = this.data.id;
  var $element = this.$("#" + id);
  var hooks = {};
  hooks[id] = {
    onSuccess: function(operation, result, template) {
      $element.modal("hide");
    }
  };
  AutoForm.hooks(hooks);
  $element.on("show.bs.modal", function(event) {
    if (event.target.id === id) {
      AutoForm.resetForm(id);
    }
  });
  // TODO: http://getbootstrap.com/javascript/#buttons-stateful - does not work
  // TODO: AutoForm is disabling submit button for this case?
};

Template["quickFields2"].helpers({
  innerContext: function () {
    // from "extendFormGroupAttrs" helper
    var forFormGroupAtts = AutoForm.findAttributesWithPrefix("afFormGroup-");
    var atts = {
      "id-prefix": this["id-prefix"] || forFormGroupAtts["id-prefix"] || ""
    };
    var fields = this.fields.split(",");
    var fieldLabelAtts = {class: forFormGroupAtts["label-class"]};
    if (this["label-for"]) {
      fieldLabelAtts.for = atts["id-prefix"] + this["label-for"].replace(".", "-");
    } else {
      fieldLabelAtts.for = atts["id-prefix"] + fields[0].replace(".", "-");
    }
    return {
      atts: atts,
      fieldLabelText: this["label-text"] || "",
      fieldLabelAtts: AutoForm.Utility.addClass(fieldLabelAtts, "control-label"),
      rightColumnClass: forFormGroupAtts["input-col-class"] || "",
      fields: fields
    }
  },
  afFieldInputAtts: function (options) {
    var name = "" + this;
    var id = options.hash.atts["id-prefix"] + name.replace(".", "-");
    return {
      id: id,
      name: name,
      class: "form-control"
    }
  }
});
