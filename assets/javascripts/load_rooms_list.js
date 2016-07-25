function loadRoomsList() {
  $.getJSON(serverUrl + "/rooms.json", function(rooms) {
    $.each(rooms, function(index, room){
      $('#rooms_list').prepend(roomHtml(room));
    });
    bind_time_ago();
    $("#loading").hide();
    $("#rooms").fadeIn();
  });
};

function roomHtml(room) {
  return '<p><span class="room_header" data-createdat="' + room.created_at + '"><strong class="room_header_user">' + room.user + '</strong> <time class="room_header_time_since timeago" datetime="' + room.created_at + '"></time></span><br><a class="room_link" data-roomid="' + room.id + '">' + room.name + '</a></p>'
};
