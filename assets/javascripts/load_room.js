$( document ).ready(function() {

  $("#rooms_list").on("click", "a.room_link", function(event){
    var roomId = $(this).data("roomid");
    $.getJSON(("http://localhost:3001/rooms/" + roomId + ".json"), function(room) {
      $("#room").hide();
      $("#room_messages").empty();
      $("#room_title").html(room.name + ' room');
      $("#input_message_room_id").val(room.id);
      $.each(room.messages, function(index, message) {
        $("#room_messages").prepend(messageHtml(message));
      });
      bind_time_ago();
      bindAjaxForm();
      $("#room").fadeIn();
    });
  });

});

function messageHtml(message) {
  return '<p><span class="message_header" data-createdat="' + message.created_at + '"><strong class="message_header_user">' + message.user + '</strong> <time class="message_header_time_since timeago" datetime="' + message.created_at + '"></time></span><br><span class="message_body">' + message.body + '</span></p>'
};
