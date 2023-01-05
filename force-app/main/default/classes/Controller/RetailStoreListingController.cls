public class RetailStoreListingController {
    @AuraEnabled
    public static void updateStore (List<Store_Product__c> storeProduct) {
        RetailStoreListingService.updateStore(storeProduct);
    }

    @AuraEnabled
    public static List<Map<String,Object>> initStore (Id accId) {
        RetailStoreListingService.setId(accId);
        return RetailStoreListingService.initStore();
    }

}
