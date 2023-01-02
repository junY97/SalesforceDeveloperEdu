({
    init : function(component, event, helper) {
        let action = component.get('c.markerInfo');
        let accId = component.get('v.recordId');
        console.log('recordId :: ' + accId);
        action.setParams({ "accId" : accId});
    
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let result = response.getReturnValue();
                component.set('v.mapMarkers', result.mapMarkers);
                component.set('v.zoomLevel', result.zoomLevel);
            }
        });
        $A.enqueueAction(action);
    }
})
