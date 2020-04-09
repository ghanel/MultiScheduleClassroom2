function getAnnouncement(announcementId, classroomId) {
  return Classroom.Courses.Announcements.get(classroomId, announcementId)
}

function duplicateAnnouncements(assignmentId, originalClassroom, classrooms) {
  let announcementTBS = getAnnouncement(assignmentId, originalClassroom)
  classrooms.forEach(classroom => {
    let announcement = {
      text: announcementTBS.text,
      scheduledTime: announcementTBS.scheduledTime,
    }
    if (announcementTBS.materials) {
      announcement["materials"] = announcementTBS.materials //optional
    }
    Classroom.Courses.Announcements.create(
      announcement, classroom)
  })
}

function getScheduledAnnouncements(id) {
  let announcementsArray = []
  let announcements = Classroom.Courses.Announcements.list(id, {
    announcementStates: "DRAFT"
  })
  if (announcements.announcements !== undefined) {
    let scheduledAnnouncements = announcements.announcements.filter(announcement => announcement.scheduledTime)
    if (scheduledAnnouncements.length > 0) {
      scheduledAnnouncements.forEach(a => {
        a.workType = "ANNOUNCEMENT"
        announcementsArray.push(a)
      })
      return announcementsArray
    } else {
      return [{
        id: "No scheduled announcements"
      }] //returned if course has draft announcements but none are scheduled
    }
  } else {
    return [{
      id: "No scheduled announcements"
    }] //returned if course has no draft announcements at all
  }
}