comerc:autoform-bs-more
=======================

Some template elements for [Meteor](https://www.meteor.com/) [AutoForm](https://github.com/aldeed/meteor-autoform/) with [Bootstrap](http://getbootstrap.com/):
```jade
+modalForm
//- ["unmodal", "label", "buttonContent", "dialogSize", "fade", "readonly", "disabled"]
//- *omit declared atts if unmodal
//- *available all atts of autoForm
//- *attr "dialogSize" is optional, may be: "lg" or "sm"
+extendFormGroupAtts //- ["id-prefix", "label-class", "input-col-class"]
+afPanel //- ["name" of object field]
+afFieldValueContains2 //- ["value" as function]
+afFieldIsInvalid2 //- ["name" or "fields"]
+afQuickField2
//- ["id-prefix", "label", "for", "name" or "fields", "focus", "content"]
+afFieldInput2
```
+ input type `contenteditable2`

EXAMPLE
-------
##### LIVE DEMO
[autoform-bs-more.meteor.com](http://autoform-bs-more.meteor.com/)

##### FROM SOURCE
1. `$ git clone https://github.com/comerc/meteor-autoform-bs-more.git`
2. `$ cd example`
3. `$ meteor`
4. `http://localhost:3000`
