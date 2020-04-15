//
//
// Instructions
// Make a copy of this file
// Publish => Deploy as web app
// Execute the app as: User accessing the script
// Who has access to the app: Users with <your domain name>
//
// Publish URL to staff internally
// They will have a prompt for permissions on first run
//
// NB: Scheduling announcements via the API appears to be broken so that code is commented out
//
// Code is published to github to report any issues https://github.com/ghanel/MultiScheduleClassroom
//
// gavin@id3.org.uk
// @gavinhanel
// https://edudirectory.withgoogle.com/profiles/5919651273900032
//
//

function doGet(e) {
  return loadForm();
}

function loadForm() {
  var tmp = HtmlService.createTemplateFromFile("homePage");
  tmp.courses = courseArray()
  var tmp = tmp.evaluate();
  var output = HtmlService.createHtmlOutput(tmp)
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return output;
}

function processCopy(assignments, classrooms, originalClassroom) {
  assignments.forEach(assignment => {
    let assignmentArray = assignment.split(":")
    let assignmentType = assignmentArray[0]
    let assignmentId = assignmentArray[1]
    if (assignmentType == "ANNOUNCEMENT") {
      duplicateAnnouncements(assignmentId, originalClassroom, classrooms)
    } else {
      duplicateAssignments(assignmentId, originalClassroom, classrooms)
    }
  })
}

function getScheduledPosts(id) {
  //  
  //Uncomment the code below if Google fix the creation of scheduled announcements on the API!!
  //  
  let assignments = getScheduledAssignments(id)
  // let announcements = getScheduledAnnouncements(id)
  // if (announcements[0].id == "No scheduled announcements" && assignments[0].id == "No scheduled assignments"){
  //   return [{id: "No scheduled assignments"}] 
  // } else if (announcements[0].id == "No scheduled announcements"){
  return assignments
  // } else if (assignments[0].id == "No scheduled assignments"){
  //   return announcements    
  // } else {
  //   return announcements.concat(assignments)
  // }
}