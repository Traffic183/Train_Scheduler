const config = {
  apiKey: "AIzaSyBsoiUwyDFR0QMfS_jwtZ1_PMq154L7r6Y",
  authDomain: "clickcountdown-eb841.firebaseapp.com",
  databaseURL: "https://clickcountdown-eb841.firebaseio.com",
  projectId: "clickcountdown-eb841",
  storageBucket: "clickcountdown-eb841.appspot.com",
  messagingSenderId: "769058968116"
};
firebase.initializeApp(config);

let trainData = firebase.database();

$("#trainBtn").on("click", function () {

  let trainName = $("#trainNameInput").val().trim();
  let destination = $("#destinationInput").val().trim();
  let firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
  let frequency = $("#frequencyInput").val().trim();

  let newTrain = {
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

  let name = snapshot.val().name;
  let destination = snapshot.val().destination;
  let frequency = snapshot.val().frequency;
  let firstTrain = snapshot.val().firstTrain;

  let remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  let minutes = frequency - remainder;
  let arrival = moment().add(minutes, "m").format("hh:mm A");

  $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
});