function getCourses() {
  let nextPageToken = '';
  let batchWrite = [];
  const pageSize = 500
  do {
    let optionalArgs = {
      pageToken: nextPageToken,
      pageSize: pageSize,
      fields: "nextPageToken,courses(id,name)",
      teacherId: Session.getActiveUser().getEmail(),
      courseStates: "ACTIVE"
    };
    let courses = Classroom.Courses.list(optionalArgs)
    nextPageToken = courses.nextPageToken
    batchWrite = batchWrite.concat(courses.courses)
  } while (nextPageToken != undefined)
  batchWrite = batchWrite.sort(sortFunction)
  return batchWrite
}

function sortFunction(a, b) {
  if (a.name === b.name) {
    return 0;
  } else {
    return (a.name < b.name) ? -1 : 1;
  }
}

function courseArray() {
  let courses = getCourses()
  let courseOptions = courses.map(r => '<option value="' + r.id + '">' + r.name + '</option>').join('');
  return courseOptions
}