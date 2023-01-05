import initStore from '@salesforce/apex/RetailStoreListingController.initStore';
import updateStore from '@salesforce/apex/RetailStoreListingController.updateStore';
import { LightningElement, api } from 'lwc';

let columns = [
    {label: 'Product Name', fieldName: 'productName', type: 'text'},
    {label: 'Quantity', fieldName: 'qty', type: 'Number'},  
    {label: 'Introduction', fieldName: 'introduction', type: 'boolean', editable: 'true'}
]
export default class RetailStoreLwcListing extends LightningElement {
    data;
    columns = columns;
    draftValues;
    @api recordId;

    connectedCallback() {
       this.fnInit();
    }

    fnInit() {
        initStore({'accId': this.recordId})
        .then(result => {
            this.data = result;
        })
    }
    
    handleSave (event) {
        let draftValues = event.detail.draftValues;
        let storeObjectList = [];
        let data = this.data;
        for (let i = 0; i < draftValues.length; i++) {
            let rowNum = (draftValues[i].id).split('row-')[1];
            let storeObject = {
                'Id' :  data[rowNum].recordId,
                'introduction__c' : draftValues[i].introduction
            };
            storeObjectList.push(storeObject);            
        }

        updateStore({"storeProduct" : storeObjectList})
        .then(() => {
            this.fnInit();
            this.draftValues = [];
            window.location.reload();

        }).catch(error => {
            console.log(error);
        })

    }
}