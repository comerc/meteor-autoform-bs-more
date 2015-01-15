// TODO: https://github.com/aldeed/meteor-autoform/issues/511
// TODO: https://github.com/aldeed/meteor-autoform/issues/516
Template.extendFormGroupAtts.helpers({
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

Template["afQuickField2"].helpers({
  innerContext: function () {
    // atts from "extendFormGroupAtts" helper
    var forFormGroupAtts = AutoForm.findAttributesWithPrefix("afFormGroup-");
    var atts = {
      "id-prefix": this["id-prefix"] || forFormGroupAtts["id-prefix"] || ""
    };
    if (atts["id-prefix"]) {
      atts["id-prefix"] += "-";
    }
    var fields;
    if (this.name) {
      fields = [this.name];
    } else {
      fields = this.fields.split(",");
    }
    var fieldLabelAtts = {class: forFormGroupAtts["label-class"]};
    // TODO: labelForMode = focus - need for checkbox and contenteditable
    var labelForMode = this.focus ? "focus" : "for";
    if (this["for"]) {
      fieldLabelAtts[labelForMode] = atts["id-prefix"] + this["for"].replace(".", "-");
    } else {
      fieldLabelAtts[labelForMode] = atts["id-prefix"] + fields[0].replace(".", "-");
    }
    if (this.class) {
      atts.class = this.class;
    }
    if (this.tabIndex) {
      atts.tabIndex = this.tabIndex;
    }
    return {
      atts: atts,
      fieldLabelText: this["label"] || "",
      fieldLabelAtts: AutoForm.Utility.addClass(fieldLabelAtts, "control-label"),
      rightColumnClass: forFormGroupAtts["input-col-class"] || "",
      fields: fields,
      fieldsToString: fields.join(),
      contentBlock: this["content"] || false
    }
  },
  afFieldInputAtts: function (options) {
    var name = "" + this;
    result = {
      id: options.hash.atts["id-prefix"] + name.replace(".", "-"),
      name: name,
      template: "bootstrap3",
    }
    if (options.hash.atts.class) {
      result.class = options.hash.atts.class;
    }
    if (options.hash.atts.tabIndex) {
      result.tabIndex = options.hash.atts.tabIndex;
    }
    return result;
  }
});

Template["afQuickField2"].events({
  "click label[focus]": function (event) {
    $("#" + $(event.toElement).attr("focus")).focus();
  }
});

Template["afFieldInput2"].helpers({
  innerContext: function () {
    var atts = this;
    atts.template = "bootstrap3";
    return atts;
  }
});
