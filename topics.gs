function getTopicName(classroomId, topicId) {
  try {
    var topic = Classroom.Courses.Topics.get(classroomId, topicId)
    Logger.log(topic)
    return topic.name
  } catch (e) {
    Logger.log(e)
  }
}

function getTopic(classroomId, topicName) {
  try {
    let topics = []
    let nextPageToken = '';
    do {
      let optionalArgs = {
        pageToken: nextPageToken,
      };
      var response = Classroom.Courses.Topics.list(classroomId, optionalArgs)
      nextPageToken = response.nextPageToken
      topics = topics.concat(response.topic)
    }
    while (nextPageToken != undefined)
    if (topics) { //if the classroom has topics
      Logger.log("Classroom has topics")
      let topicId = topics.filter(t => t["name"] == topicName)
      if (topicId.length > 0) { //if the classroom has a topic with the name that we need
        Logger.log("Classroom has the topic with name: " + topicName)
        return topicId[0].topicId
      } else { //if the classroom has topics but not the one we need
        Logger.log("Creating the topic with name: " + topicName)
        let topicId = Classroom.Courses.Topics.create({
          "name": topicName
        }, classroomId)
        return topicId.topicId
      }
    } else { //if the classroom has no topics
      Logger.log("Creating the topic with name: " + topicName)
      let topicId = Classroom.Courses.Topics.create({
        "name": topicName
      }, classroomId)
      return topicId.topicId
    }
  } catch (e) {
    Logger.log(e)
  }
}