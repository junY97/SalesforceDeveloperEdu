public class RetailMapService implements MapInterface{

    static Id accountId;

    public static void setId (Id accId) {
        accountId = accId;
    }

    public static List<Map<String, Object>> mapMarker() {
        
        List<Map<String, Object>> mapMarkers = new List<Map<String,Object>> ();

        try {
            Account acc = [SELECT Name,
                        Description,
                        Address1__c, 
                        Address2__c, 
                        Address3__c 
                        FROM Account
                        WHERE Id =: accountId
                ];

            Map<String,Object> location = new Map <String, Object> {
                'City' => acc.Address1__c,
                'State' => acc.Address2__c,
                'Street' => acc.Address3__c
            };
        
            Map<String,Object> marker = new Map <String, Object> {
                'location' => location,
                'title' => acc.Name,
                'description' => acc.Description
            };

            System.debug('marker :: ' + marker);
            mapMarkers.add(marker);
            System.debug('markers :: ' + mapMarkers);

        } catch (Exception e) {
            System.debug('에러 메세지 :: ' + e.getMessage());
            System.debug(e.getLineNumber());
        }
        return mapMarkers;

    }

 
    public static Integer defaultZoomLevel() {
        Integer zoomLevel = 16;
        return zoomLevel;
    }

    public static Map<String, Object> markerInfo () {
        return new Map<String,Object> {
            'mapMarkers' => mapMarker(),
            'zoomLevel' => defaultZoomLevel()
        };
    }
}
