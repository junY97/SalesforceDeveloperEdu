public class RetailMapDto {
    public marker marker;
    public Integer defaultZoomLevel;

    public class marker {
        public location location;
        public String title;
        public String description;
    }

    public class location {
        public String city;
        public String state;
        public String street;
    }

  
}

