var topics = ["fancy", "admirable", "fantastic", "awsome"];
var data;
var stillId;
var activeId;

showButtons();

function exhibitShow() {
  var topic = $(this).attr("data-name");
  const queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=
  RFkBkszWka5WEssztVqQhWAcSMPRznLb&limit=10&limit=10`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    data = response.data;
    var viewDiv = $("<div class=activeOrStill>");

    for (let i = 0; i < data.length; i++) {
      var topicDiv = $("<div class=topicDiv>");
      var Topic = $("<p>").text("Topic: " + topic);
      var rating = data[i].rating;
      var p1 = $("<p>").text("rating: " + rating);
      topicDiv.append(Topic).append(p1);

      var image1 = $("<img>", {
        "src": data[i].images.fixed_height_still.url,
        "class": "stillGifs",
        "id": topic + i + "Still",
        "dataInfo": topic + i
      });

      var image2 = $("<img>", {
        "src": data[i].images.fixed_height.url,
        "class": "activeGifs",
        "id": topic + i + "Active",
        "dataInfo": topic + i
      });

      topicDiv.append(image1);
      topicDiv.append(image2);
      viewDiv.append(topicDiv);
    }
    $("#topics-view").append(viewDiv);
    $(".activeGifs").hide();
  });
}

function showButtons() {
  $("#button-view").empty();

  for (let i = 0; i < topics.length; i++) {
    const btn = $("<button>", 
    {
      "class": "topic",
      "data-name": topics[i],
      "value": topics[i]
    });

    $("#buttons-view").append(btn);
  }
}

  $("#add-topic").on("click", function (event) {
    event.preventDefault();
    const topic = $("#topic-input").val().trim();
    topics.push(topic);
    $("#topic-input").val("");
    showButtons();
  });

$(document).on("click", ".topic", exhibitShow);


$(document).on("click", ".stillGifs", function (event) {
  stillId = `#${event.target.attribute.dataInfo.value}Still`;
  activeId = `#${event.target.attribute.dataInfo.value}Active`;
  $(stillId).hide();
  $(activeId).show();
});

$(document).on("click", ".activeGifs", function (event) {
  stillId = `#${event.target.attribute.dataInfo.value}Still`;
  activeId = `#${event.target.attribute.dataInfo.value}Active`;
  $(stillId).show();
  $(activeId).hide();
});
