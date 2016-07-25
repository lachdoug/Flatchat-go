$( document ).ready(function() {

  webSocketConnection = new WebSocket("ws://localhost:3001/cable");

  webSocketConnection.onopen = function(serverEvent) {
    webSocketConnection.send(
      JSON.stringify(
        { "command": "subscribe",
          "identifier": JSON.stringify({"channel":"EventsChannel"})})
    );
    loadRoomsList();
  };

  webSocketConnection.onclose = function(serverEvent)   {
    $('#server_connection_status').css("color", "#F00");
  };

  webSocketConnection.onmessage = function(serverEvent) {
    $('#server_connection_status').css("color", "#3C3");
    processEvent(serverEvent);
  };

  webSocketConnection.onerror = function(serverEvent) {
    alert('Server connection error.');
  };

});

var processEvent = function(serverEvent) {
  var eventData = JSON.parse(serverEvent.data);
  if (eventData.identifier !== undefined) {
    var eventMessage = eventData.message;
    if (eventMessage !== undefined) {
      var eventType = eventMessage.event;
      if (eventType === "new_room") { addRoom(eventMessage) };
      if (eventType === "new_message") { addMessage(eventMessage) };
    };
  };
};

var addRoom = function(eventMessage) {
  $('#rooms_list').prepend(roomHtml(eventMessage.room));
  $('#rooms_list').children().first().find('.room_link').click();
  $('#input_room_name').val('');
  bind_time_ago();
};

var addMessage = function(eventMessage) {
  if ($("#input_message_room_id").val() === eventMessage.message.room_id.toString()) {
    $("#room_messages").prepend(messageHtml(eventMessage.message));
    $('#input_message_body').val('');
    bind_time_ago();
  };
};
