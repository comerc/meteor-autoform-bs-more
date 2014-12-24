@Schema = new SimpleSchema
  "address":
    type: Object
    label: "Your address" # used for afPanel
  "address.postal":
    type: String
  "address.street":
    type: String
  "place":
    type: String
    autoform:
      type: "placecomplete" # it work on modalForm
      placecompleteOptions:
        allowClear: true
  "birthday":
    type: Date
    autoform:
      type: "bootstrap-datepicker" # it work on modalForm
      autocomplete: "off"
      datePickerOptions:
        autoclose: true
  "hobby":
    type: [String]
    autoform:
      type: "selectize" # it work on modalForm
      multiple: true
      placeholder: "Select multiple"
      options: ->
        [
          label: "Bitches"
          value: "b"
        ,
          label: "Drugs"
          value: "d"
        ,
          label: "Guns"
          value: "g"
        ,
          label: "Cars"
          value: "c"
        ]
  "fieldOne":
    type: [String]
    allowedValues: ["foo", "bar"]
    autoform:
      type: "select-checkbox-inline"
      options: "allowed"
  "fieldTwo":
    type: String
    allowedValues: ["only", "ever"]
    optional: true
    custom: ->
      currentValue = @field("fieldOne").value
      customCondition = @definition.autoform.requiredIfOne(currentValue)
      # "required" if customCondition and not @isSet and (not @operator or (@value is null or @value is ""))
      "required" if customCondition and not @value
    autoform:
      type: "select-radio-inline"
      options: "allowed"
      requiredIfOne: (currentValue) -> # used for afFieldValueContains2
        currentValue?.indexOf("bar") + 1

if Meteor.isClient
  AutoForm.setDefaultTemplate("bootstrap3-horizontal")
  Template.example.helpers
    "requiredIfOne": ->
      (currentValue) ->
        f = AutoForm.getSchemaForField("fieldTwo").autoform.requiredIfOne
        f(currentValue)
  Template.example.events
    # BIGFIX: datepicker still open when click on select2
    "select2-opening": ->
      $("input[name='birthday']").datepicker("hide")
    # BIGFIX: https://github.com/eternicode/bootstrap-datepicker/issues/645
    "scroll": ->
      $("input[name='birthday']").datepicker("hide")
    "submit": ->
      alert("submit is not implemented")
      return false
