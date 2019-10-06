import React from "react";

export class SoundcloudWidget extends React.Component {
  render() {
    return (
      <div className="widget soundcloud">
        <div className="heading">Music</div>
        <iframe
          width="100%"
          height="100"
          scrolling="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/205051568&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true"
        ></iframe>
      </div>
    );
  }
}
