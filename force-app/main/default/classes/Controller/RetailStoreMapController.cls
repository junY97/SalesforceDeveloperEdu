public class RetailStoreMapController {
    @AuraEnabled
    public static Map<String, Object> markerInfo (Id accId) {
        RetailMapService.setId(accId);
        return RetailMapService.markerInfo();
    }

}
