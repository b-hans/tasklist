const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Forms');

// Call our working cache as TASK_CACHE
const CACHE = CacheService.getScriptCache();


const FORM_BACK_RANGE = "A1:H28";
const FORM_BACKGROUND = '#e3eaf5';
const TITLE_BORDER_COLOR = '#688cc3';
const HEADER_BORDER_COLOR = '#617788';

const FORM_TITLE_RANGE = "B2:G3";
const FORM_DISPLAY_RANGE = "B5:G6";

// current task headers
const CURRENT_TASK = "B10:C10";
const DUE_DATE = "D10:E10";
const ASSIGNEE = "F10";
const COMPLETED = "G10";


const FORM_ACTIONS_DROPDOWN = "B8:C8";
const FORM_ACTIONS_DD = "B8";

const FORM_ACTIONS_LIST = [
    'Actions',
    'Create new task'
];

const FORM_ACTIONS_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(FORM_ACTIONS_LIST, true)
    .setAllowInvalid(true)
    .build();

