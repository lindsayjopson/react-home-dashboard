import React from "react";

export class SoundcloudWidget extends React.Component {
  constructor(props) {
    super(props);
    const ns = this.props.store.getState().dashboard.widgets.soundcloud;
    this.state = {
      playlist: encodeURIComponent(ns.playlist)
    }
  }

  render() {
    const playlistUrl = `https://w.soundcloud.com/player/?url=${this.state.playlist}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`

    return (
      <div className="widget soundcloud">
        <div className="heading">Music</div>
        <iframe
          width="100%"
          height="100"
          scrolling="no"
          allow="autoplay"
          src={ playlistUrl }
        ></iframe>
      </div>
    );
  }
}
