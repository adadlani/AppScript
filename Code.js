// From debugger you can select which function to execute using the drop-down
// Another method is to use Trigers (Time based on Spreadhseet event base)
// Another is assign the function to a button (Insert -> Drawing  on the spreadsheet)
const TEMP_CELL = 'A30';
const COMPLETED_COLUMN_NUM = 7;
const PLANNED_DATE_COLUMN = 'A'
const ACTUAL_COMPLETION_DATE_COLUMN = 'H'
const TOPIC_CHAPTER_COLUMN = 'C'

// Test function for debug purpose
function test() {
  // Function to help with intial bringup of code to monitor logs in a debugger due to how Apps Script works
  Logger.log("test()");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getRange(TEMP_CELL);
  cell.clear();
  cell.setBackground("lightgreen"); //null or "lightgreen"
}

// Test date function for debug purpose
function insertDate() {
  Logger.log("insertDate()");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getRange(TEMP_CELL);
  cell.setValue(new Date());
}

// Helper function to check if two dates are the same day (ignoring time)
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

// Called when spreadsheet is opened initially
function onOpen() {
  // Called each time the spreadsheet is opened
  Logger.log("onOpen()");
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
  .addItem('Insert the date', 'insertDate')
  .addToUi();
}

// Called when any cell is being edited
function onEdit(e) {
  Logger.log("onEdit()");
  // Get the active sheet
  var sheet = e.source.getActiveSheet();

  // Check if the edited cell is a checkbox in column with checkbox
  if (e.range.getColumn() == COMPLETED_COLUMN_NUM && e.value == "TRUE") { 
    // Get the row number of the edited cell
    var row = e.range.getRow();
    Logger.log("Checked!")

    // Determine the current date/time
    // Add to the same row but column A (current value if any will be replaced)
    var cell = sheet.getRange(ACTUAL_COMPLETION_DATE_COLUMN + row);
    cell.setValue(new Date());
    cell = sheet.getRange(TOPIC_CHAPTER_COLUMN + row)
    cell.setBackground("lightgreen"); //null or "lightgreen"
  }
  else if(e.range.getColumn() == COMPLETED_COLUMN_NUM && e.value == "FALSE") {
    // Clear the date value in column A
    var row = e.range.getRow();
    Logger.log("Un-Checked!")
    var cell = sheet.getRange(ACTUAL_COMPLETION_DATE_COLUMN + row);
    cell.clear();
    cell = sheet.getRange(TOPIC_CHAPTER_COLUMN + row)
    cell.setBackground(null); //null or "lightgreen"
  }
  else {
    // Must be editing something else
    Logger.log("Do nothing...")
    return
  }
  // If planned & actual date are the same send a congratulations message!
  var plannedDate = sheet.getRange(PLANNED_DATE_COLUMN + row).getValue();
  var actualDate = sheet.getRange(ACTUAL_COMPLETION_DATE_COLUMN + row).getValue();
  if (plannedDate instanceof Date && actualDate instanceof Date) {
    if (isSameDay(plannedDate, actualDate)) {
        SpreadsheetApp.getUi().alert("Congratulations Kanchann! You completed the task on the planned date!");
    }
  }
}