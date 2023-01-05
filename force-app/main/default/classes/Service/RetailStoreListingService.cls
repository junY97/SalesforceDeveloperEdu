public with sharing class RetailStoreListingService {
    
    static Id accountId;

    public static void setId (Id accId) {
        accountId = accId;
    }

    public static void updateStore (List<Store_Product__c> storeProduct) {

        System.Savepoint savePoint = Database.setSavepoint();

        try {
            System.debug('storeProduct :: ' + storeProduct);
            update storeProduct;
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            Database.rollback(savePoint);
        }
    }

    public static List<Map<String,Object>> initStore(){

        List<Map<String, Object>> resultList = new List<Map<String, Object>> ();

        try {

            List<Store_Product__c> storeProductList = [SELECT 
                                                       Product__r.Name, 
                                                       Product__r.Id,
                                                       Quantity__c,
                                                       introduction__c
                                                       FROM Store_Product__c 
                                                       WHERE Account__c = :accountId
                                                       ORDER BY Quantity__c DESC
                                                       ];

            Set<String> prdIds = new Set<String> ();

            for (Store_Product__c strPrd : storeProductList) {
                Map<String, Object> prdMap = new Map<String, Object> ();
                prdMap.put('recordId', strPrd.Id);
                prdMap.put('productName', strPrd.Product__r.Name);
                prdMap.put('qty', strPrd.Quantity__c);
                prdMap.put('introduction', strPrd.introduction__c);
                // prdIds.add(strPrd.Product__r.Id);  
                resultList.add(prdMap);
            }

            // List<Product__c> productList =     [SELECT Id, 
            //                                            Name
            //                                            FROM Product__c
            //                                            WHERE Id NOT IN :prdIds]; 
                            
            // for (Product__c prd : productList) {
            //     Map<String, Object> prdMap = new Map<String, Object> ();
            //     prdMap.put('recordId', prd.Id);
            //     prdMap.put('productName', prd.Name);
            //     prdMap.put('qty', 0);
            //     prdMap.put('introduction', false);
            //     resultList.add(prdMap);
            // }

            // System.debug('productList :: ' + productList);
            // System.debug('storeProductList :: ' + storeProductList);


        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
        }

        return resultList;
    }
}
