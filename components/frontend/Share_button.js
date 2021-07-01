import { useRouter } from 'next/router';
import {
    EmailShareButton,
    FacebookShareButton,
    LineShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import {URL_WEB} from "../../constant/constant_func";	

const ShareButton = (props) => {
  const {
    query
  } = props;
    // Declare a new state variable, which we'll call "count"
    let router = useRouter();
  
    return (
      <div>
        <FacebookShareButton url={URL_WEB + '/detail_pendanaan?id=' + query} >
          <a className="social-icon si-borderless si-facebook">
            <i className="icon-facebook" />
            <i className="icon-facebook" />
            
          </a>
        </FacebookShareButton>
        <TwitterShareButton url={URL_WEB + '/detail_pendanaan?id=' + query}>
          <a href="#" className="social-icon si-borderless si-twitter">
            <i className="icon-twitter" />
            <i className="icon-twitter" />
          </a>
        </TwitterShareButton>
        <WhatsappShareButton url={URL_WEB + '/detail_pendanaan?id=' + query}>
          <a href="#" className="social-icon si-borderless si-whatsapp">
            <i className="icon-whatsapp" />
            <i className="icon-whatsapp" />
          </a>
        </WhatsappShareButton>
        <LinkedinShareButton url={URL_WEB + '/detail_pendanaan?id=' +  query}>
          <a href="#" className="social-icon si-borderless si-linkedin">
            <i className="icon-linkedin" />
            <i className="icon-linkedin" />
          </a>
        </LinkedinShareButton>
      </div>
    );
  }
  export default ShareButton;