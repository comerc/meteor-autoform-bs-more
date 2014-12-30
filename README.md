comerc:autoform-bs-more
=======================

Some template elements for [Meteor](https://www.meteor.com/) [AutoForm](https://github.com/aldeed/meteor-autoform/) with [Bootstrap](http://getbootstrap.com/):
```jade
+modalForm 
//- ["unmodal", "label", "buttonContent", "dialogSize", "fade", "readonly", "disabled"]
//- *omit declared attrs if unmodal
//- *available all attrs of autoForm
//- *attr "modalSize" is optional, may be: "lg" or "sm"
+extend //- [any attrs for template context]
+afPanel //- ["name" of object field]
+afFieldValueContains2 //- ["value" as function]
+afFieldIsInvalid2 //- ["name" or "fields"]
```
EXAMPLE
-------
##### LIVE DEMO
[autoform-bs-more.meteor.com](http://autoform-bs-more.meteor.com/)

##### FROM SOURCE
1. `$ git clone https://github.com/comerc/meteor-autoform-bs-more.git`
2. `$ cd example`
3. `$ meteor`
4. `http://localhost:3000`
