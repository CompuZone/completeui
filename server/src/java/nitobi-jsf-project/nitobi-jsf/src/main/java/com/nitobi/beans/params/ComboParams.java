package com.nitobi.beans.params;

/**
 * @author Eric Buitenhuis
 */
public final class ComboParams extends NitobiParams {

    public static final String STARTING_RECORD_INDEX = "StartingRecordIndex";
    public static final String LAST_STRING = "LastString";
    public static final String PAGE_SIZE = "PageSize";
    public static final String SEARCH_SUBSTRING = "SearchSubstring";
    public static final String COMBO_ID = "ComboId";

    public ComboParams() {
    }

    public ComboParams(String comboId, String lastString, String pageSize, String searchSubstring, String startingRecordIndex) {
        super(comboId, pageSize, null, searchSubstring, startingRecordIndex);
        setLastString(lastString);
    }

    // TODO: Finish this constructor. Getting NumberFormatException
//    public ComboParams(Map<String, Object> params) {
//        setStartingRecordIndex((String)params.get(STARTING_RECORD_INDEX));
//        setLastString((String)params.get(LAST_STRING));
//        setPageSize((String)params.get(PAGE_SIZE));
//        setSearchSubstring((String)params.get(SEARCH_SUBSTRING));
//        setStartingRecordIndex((String)params.get(STARTING_RECORD_INDEX));
//    }

    //TODO: Finish the subset method.
//    public Map<String, Object> getSubsetForMap(Map<String, Object> input, Field... searchFields) throws NoSuchFieldException {
//
//        /*
//         * If the input is empty, just return it
//         */
//        if(input.size() == 0) {
//            return input;
//        }
//
//        /*
//         * If everything is empty, just return the same map (the full, unfiltered set)
//         */
//        if(isEmpty(lastString) && isEmpty(pageSize) && isEmpty(searchSubstring) && isEmpty(startingRecordIndex)) {
//            return input;
//        }
//
//        Map<String, Object> subset = new LinkedHashMap<String, Object>();
//
//        /*
//         * Collect all map items that start with substring. Keep in mind that we must maintain the same sorting in order
//         * for the subsequent checking to work.
//         */
//        if(!isEmpty(searchSubstring)) {
//            /*
//             * Check against keys
//             */
//            for(Map.Entry<String, Object> entry : input.entrySet()) {
//                boolean isKeeper = false;
//                if(entry.getKey().contains(searchSubstring)) {
//                    // match has been made, so there is no reason to continue searching
//                    isKeeper = true;
//                } else {
//                    // continue to search the object, since match has not yet been made
//                    Object value = entry.getValue();
//
//                    if(searchFields == null) {
//                        if(((String)value).contains(searchSubstring)) {
//                            isKeeper = true;
//                        }
//                    } else {
//                        for(Field field : Arrays.asList(searchFields)) {
//                            Field searchField = value.getClass().getField(field.getName());
//                            if (searchField.toString().contains(searchSubstring)) {
//                                isKeeper = true;
//                            }
//                        }
//                    }
//                }
//
//                if(isKeeper) {
//                    subset.put(entry.getKey(), entry.getValue());
//                }
//            }
//
//            // if this filter left an empty subset map, there is no reason to proceed.
//            if(subset.size() == 0) {
//                return subset;
//            }
//        }
//
//        /*
//         * Check the starting index. If the resulting map has fewer items than
//         */
//        if(!isEmpty(startingRecordIndex)) {
//            int sri = Integer.parseInt(startingRecordIndex);
//            if(subset.size() < sri) {
//                return Collections.EMPTY_MAP;
//            } else {
//                for(int i = 0; i < sri; i++) {
//                    subset.entrySet().
//                }
//            }
//        }
//
//
//        return subset;
//    }

    /**
     * The value of the last string in the combo's dataset
     */
    private String lastString = null;

    /**
     * Gets the value of the last string in the combo's dataset
     *
     * @return
     */
    public String getLastString() {
        return lastString;
    }

    /**
     * Sets the value of the last string in the combo's dataset
     *
     * @param lastString
     */
    public void setLastString(String lastString) {
        if (lastString == null) {
            this.lastString = "";
        } else {
            this.lastString = lastString;
        }
    }

    private boolean isEmpty(String input) {
        return input == null || input.equals("");
    }
}
