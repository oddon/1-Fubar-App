"use strict";describe("directiveTemplate",function(){function e(){var e=angular.element("<toaster-container></toaster-container>");return o(e)(r),r.$digest(),e}function t(e){n.pop(e),r.$digest()}function i(){angular.module("testApp",[]).directive("bindTemplateOnly",function(){return{restrict:"A",template:'here is some great new text! <span style="color:orange">It was brought in via directive!</span>'}}).directive("bindTemplateWithData",function(){return{template:"Hello {{directiveData.name}}"}}).directive("bindTemplateWithNumericData",function(){return{template:"1 + 1 = {{directiveData}}"}}).directive("elementTemplate",function(){return{restrict:"E",template:"Element Template"}}).directive("classTemplate",function(){return{restrict:"C",template:"Class Template"}}).directive("unrestrictedTemplate",function(){return{template:"Unrestricted Template"}})}i();var n,r,o;beforeEach(function(){module("testApp"),module("toaster"),inject(function(e,t,i){n=e,r=t,o=i})}),it("should load and render the referenced directive template text",function(){var i=e();t({type:"info",body:"bind-template-only",bodyOutputType:"directive"}),expect(i[0].innerText).toBe("here is some great new text! It was brought in via directive!")}),it("should bind directiveData to the directive template",function(){var i=e();t({type:"info",body:"bind-template-with-data",bodyOutputType:"directive",directiveData:{name:"Bob"}}),expect(i[0].innerText).toBe("Hello Bob")}),it("should parse type string directiveData to an object",function(){var i=e();t({type:"info",body:"bind-template-with-data",bodyOutputType:"directive",directiveData:'{ "name": "Bob" }'}),expect(i[0].innerText).toBe("Hello Bob")}),it("should render type number directiveData",function(){var i=e();t({type:"info",body:"bind-template-with-numeric-data",bodyOutputType:"directive",directiveData:2}),expect(i[0].innerText).toBe("1 + 1 = 2")}),it("should bind Attribute-restricted templates",function(){var i=e();t({type:"info",body:"bind-template-only",bodyOutputType:"directive",directiveData:{name:"Bob"}}),expect(i[0].innerText).toBe("here is some great new text! It was brought in via directive!")}),it("should bind unrestricted templates",function(){var i=e();t({type:"info",body:"unrestricted-template",bodyOutputType:"directive"}),expect(i[0].innerText).toBe("Unrestricted Template")}),it("should not bind Element-restricted templates",function(){var i=e();t({type:"info",body:"element-template",bodyOutputType:"directive"}),expect(i[0].innerText).toBe(""),expect(i[0].innerText).not.toBe("Element Template")}),it("should not bind Class-restricted templates",function(){var i=e();t({type:"info",body:"class-template",bodyOutputType:"directive"}),expect(i[0].innerText).toBe(""),expect(i[0].innerText).not.toBe("Class Template")}),it("should throw an error if directiveName argument is not passed via body",function(){var i=e(),n=!1;expect(i[0].innerText).toBe("");try{t({type:"info",bodyOutputType:"directive"})}catch(r){expect(r.message).toBe("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive"),n=!0}expect(i[0].innerText).toBe(""),expect(n).toBe(!0)}),it("should throw an error if directiveName argument is an empty string",function(){var i=e(),n=!1;expect(i[0].innerText).toBe("");try{t({type:"info",body:"",bodyOutputType:"directive"})}catch(r){expect(r.message).toBe("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive"),n=!0}expect(i[0].innerText).toBe(""),expect(n).toBe(!0)}),it("should throw an error if the directive could not be found",function(){var i=!1;e();try{t({type:"info",body:"non-existent-directive",bodyOutputType:"directive"})}catch(n){expect(n.message).toBe("non-existent-directive could not be found."),i=!0}expect(i).toBe(!0)})});