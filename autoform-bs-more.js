Template.extend.helpers({
  data: function() {
    return _.extend(this, Template.parentData(1));
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
    var mfAutoFormContext = _.omit(atts, "buttonContent", "label");
    var mfShouldRenderButton = (atts.buttonContent !== false && atts.type !== "readonly" && atts.type !== "disabled");
    return {
      mfAutoFormContext: mfAutoFormContext,
      atts: atts,
      mfShouldRenderButton: mfShouldRenderButton
    };
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
};
