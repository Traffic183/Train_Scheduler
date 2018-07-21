var config = {
  apiKey: "AIzaSyBsoiUwyDFR0QMfS_jwtZ1_PMq154L7r6Y",
  authDomain: "clickcountdown-eb841.firebaseapp.com",
  databaseURL: "https://clickcountdown-eb841.firebaseio.com",
  projectId: "clickcountdown-eb841",
  storageBucket: "clickcountdown-eb841.appspot.com",
  messagingSenderId: "769058968116"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#trainBtn").on("click", function () {

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  alert("Train Added!").val("");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");

  return false;

});

trainData.ref().on("child_added", function (snapshot) {

  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");

  $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
});