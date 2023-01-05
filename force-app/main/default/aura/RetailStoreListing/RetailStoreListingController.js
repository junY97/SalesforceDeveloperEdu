({
    fnInit : function(component, event, helper) {
        console.log('handler init !!');

        component.set('v.columns', [
            {label: 'Product Name', fieldName: 'productName', type: 'text'},
            {label: 'Quantity', fieldName: 'qty', type: 'Number'},  
            {label: 'Introduction', fieldName: 'introduction', type: 'boolean', editable: 'true'}
        ]);
        
        helper.fnInit(component, event, helper);
    },

    handleSaveAction : function (component, event, helper) {
        console.log('저장 !!');

        let draftValues = event.getParam('draftValues');
        let storeObjectList = [];
        let data = component.get('v.data');

        for (let i = 0; i < draftValues.length; i++) {
            let rowNum = (draftValues[i].id).split('row-')[1];
            let storeObject = {
                'Id' :  data[rowNum].recordId,
                'introduction__c' : draftValues[i].introduction
            };
            storeObjectList.push(storeObject);            
        }

        console.log(JSON.stringify(storeObjectList));
        helper.handleSaveAction(component, event, helper, storeObjectList);
    }
})
