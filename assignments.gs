function getAssignment(assignmentId, classroomId) {
  return Classroom.Courses.CourseWork.get(classroomId, assignmentId)
}

function duplicateAssignments(assignmentId, originalClassroom, classrooms) {
  let assignmentTBS = getAssignment(assignmentId, originalClassroom)
  if (assignmentTBS.topicId) {
    var topicName = getTopicName(assignmentTBS.courseId, assignmentTBS.topicId)
  }
  classrooms.forEach(classroom => {
    let assignment = {
      title: assignmentTBS.title,
      scheduledTime: assignmentTBS.scheduledTime,
      workType: assignmentTBS.workType
    }
    if (assignmentTBS.description) {
      assignment["description"] = assignmentTBS.description //optional
    }
    if (assignmentTBS.materials) {
      //you can't add Forms to an assignment via the api.  Workaround is to add them as a link
      var materials = []
      for (var i=0; i<assignmentTBS.materials.length; i++){
        if (assignmentTBS.materials[i].hasOwnProperty('driveFile') || assignmentTBS.materials[i].hasOwnProperty('youtubeVideo') || assignmentTBS.materials[i].hasOwnProperty('link')){
          materials.push(assignmentTBS.materials[i])
        } else if(assignmentTBS.materials[i].hasOwnProperty('form')){
          materials.push({link: {url: assignmentTBS.materials[i].form.formUrl, title: assignmentTBS.materials[i].form.title, thumbnailUrl: assignmentTBS.materials[i].form.thumbnailUrl}})
        }
      }
      assignment["materials"] = materials //optional
    }
    if (assignmentTBS.dueDate) {
      assignment["dueDate"] = assignmentTBS.dueDate //optional
    }
    if (assignmentTBS.dueTime) {
      assignment["dueTime"] = assignmentTBS.dueTime //optional
    }
    if (assignmentTBS.maxPoints) {
      assignment["maxPoints"] = assignmentTBS.maxPoints //optional
    }
    if (assignmentTBS.topicId) {
      let topicIdTBS = getTopic(classroom, topicName) //optional
      assignment["topicId"] = topicIdTBS //optional
    }
    if (assignmentTBS.assignment) {
      assignment["assignment"] = assignmentTBS.assignment //optional
    }
    if (assignmentTBS.multipleChoiceQuestion) {
      assignment["multipleChoiceQuestion"] = assignmentTBS.multipleChoiceQuestion //optional
    }
    Classroom.Courses.CourseWork.create(
      assignment, classroom)
  })
}

function getScheduledAssignments(id) {
  let assignments = []
  let courseWork = Classroom.Courses.CourseWork.list(id, {
    courseWorkStates: "DRAFT"
  })
  if (courseWork.courseWork !== undefined) {
    let scheduledCourseWork = courseWork.courseWork.filter(course => course.scheduledTime)
    if (scheduledCourseWork.length > 0) {
      scheduledCourseWork.forEach(a => assignments.push(a))
      return assignments
    } else {
      return [{
        id: "No scheduled assignments"
      }] //returned if course has draft assignemnts but none are scheduled
    }
  } else {
    return [{
      id: "No scheduled assignments"
    }] //returned if course has no draft assignments at all
  }
}