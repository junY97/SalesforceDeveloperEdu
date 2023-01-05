({

    handleSaveAction : function(component, event, helper, storeObjectList) {
        console.log('handleSaveAction');
        let action = component.get('c.updateStore');
        console.log('helper :: ' + JSON.stringify(storeObjectList));
        action.setParams({ "storeProduct" : storeObjectList});
    
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                console.log('성공!!');
                component.set('v.draftValues', []);
                helper.fnInit(component, event, helper);

            }
        });
        $A.enqueueAction(action);
    },

    fnInit : function (component, event, helper) {
        let action = component.get('c.initStore');
        let accId = component.get('v.recordId');
        console.log('recordId :: ' + accId);
        action.setParams({ "accId" : accId});
    
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let result = response.getReturnValue();
                component.set('v.data', result);
            }
        });
        $A.enqueueAction(action);

    }
})
