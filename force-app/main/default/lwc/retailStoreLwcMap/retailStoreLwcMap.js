import markerInfo from '@salesforce/apex/RetailStoreMapController.markerInfo';
import { LightningElement, api } from 'lwc';

export default class RetailStoreLwcMap extends LightningElement {

    @api recordId;
    mapMarkers; 
    zoomLevel;

    connectedCallback() {
        this.fnInit();
    }

    fnInit() {
        markerInfo({'accId': this.recordId})
        .then(result => {
            this.mapMarkers = result.mapMarkers;
            this.zoomLevel = result.zoomLevel;
        })
        .catch(error => {
            console.log(error);
        });
    }
}