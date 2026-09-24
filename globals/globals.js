const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Forms');

const DATASHEET_ID = '1Is8Z2CBuAJ5oxIQztNq6rDFj65J_jtGORgsRe0k9iXI';

// Call our working cache as TASK_CACHE
const CACHE = CacheService.getScriptCache();


const FORM_BACK_RANGE = "A1:H28";
const FORM_BACKGROUND = '#e3eaf5';
const TITLE_BORDER_COLOR = '#688cc3';
const HEADER_BORDER_COLOR = '#617788';

const CLEAR_RANGE = "A10:H28";

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

const FORM_CREATE_ACTIONS_LIST = [
    'Actions',
    'Enter',
    'Cancel'
];

const FORM_CREATE_ACTIONS_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(FORM_CREATE_ACTIONS_LIST, true)
    .setAllowInvalid(true)
    .build();


// create form
const CREATE_TASK_NAME = "C10";
const CREATE_DUE_DATE = "C11";
const CREATE_REPEAT = "C12";
const CREATE_ASSIGNEE = "C13";

const CTN_INPUT = "D10:E10";
const CTN_IN = "D10";
const CDD_INPUT = "D11:E11";
const CDD_IN = "D11";
const CRP_INPUT = "D12:E12";
const CRP_IN = "D12";
const CAS_INPUT = "D13:E13";
const CAS_IN = "D13";

const CREATE_INPUT_RANGE = "C10:E13";

const LIGHT_GRAY = '#f3f3f3';

const DATE_PICKER_RULE = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(false) // Blocks invalid text entry
    .setHelpText("Please enter a valid date using the calendar picker.")
    .build();

const RESPONSE_DD = "G8";
const TASK_START_ROW = 11;
const TASK_CHECK_COLUMN = 7;
    


