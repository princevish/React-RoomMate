import React, { Component } from "react";
import {
    FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
 
 
} from "react-share";


class SubShare extends Component {

  render() {

    const {
      url = String(window.location),
      title = "RoomMate ",
      size = "2rem",
    } = this.props;



    return (
      
        <>
          < FacebookShareButton
            url={url}
            quote={title}
          >
            <FacebookIcon
              size={size}
            />
          </ FacebookShareButton>

          <TwitterShareButton
          url= {url}
            title={title}
          >
            <TwitterIcon
              size={size}
            />
          </TwitterShareButton>

          <WhatsappShareButton
           url= {url}
            title={title }
            separator=":: "
           
          >
            <WhatsappIcon size={size} />
          </WhatsappShareButton>

          <LinkedinShareButton
           url= {url}
            title={title}
            windowWidth={750}
            windowHeight={600}
          >
            <LinkedinIcon
              size={size}

            />
          </LinkedinShareButton>
        </>
      
    );
  }
}

export default SubShare;

