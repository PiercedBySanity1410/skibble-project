import DocumentViewIcon from "../icons/DocumentView";
import Close from "../icons/Close";
import ArrowDown from "../icons/ArrowDown";
import Message from "../icons/Message";
import Download from "../icons/Download";
import DocumentFill from "../icons/DocumentFill";
import ImageFill from "../icons/ImageFill";
import AudioFill from "../icons/AudioFill";
import "../styles/documentview.scss";
export default function DocumentView({ disable }: { disable: () => void }) {
  return (
    <div className="documentview-wrapper">
      <div className="documentview-header">
        <DocumentViewIcon size={18} color="var(--white)" />
        <h4>Chat Details</h4>
        <div className="button-container">
          <Close onClick={disable} size={12} color="var(--grey)" />
        </div>
      </div>
      <div className="accordin-container">
        <div className="accordin-header">
          <div className="accordin-name">
            <h3>Members</h3>
            <p>8</p>
          </div>
          <ArrowDown size={12} color="var(--yellow)" />
        </div>
        <div className="accordin-content">
          <div className="accordin-row">
            <div className="accordin-info">
              <div className="image-wrapper">
                <img src="/assets/avatars/Candice Wu.jpg" alt="Avatar" />
              </div>
              <div className="info-content">
                <h6>Candice Wu</h6>
                <p>Creator</p>
              </div>
            </div>
            <Message size={18} color="var(--grey)" />
          </div>
          <div className="accordin-row">
            <div className="accordin-info">
              <div className="image-wrapper">
                <img src="/assets/avatars/Eve Leroy.jpg" alt="Avatar" />
              </div>
              <div className="info-content">
                <h6>Eve Leroy</h6>
              </div>
            </div>
            <Message size={18} color="var(--grey)" />
          </div>
          <div className="accordin-row">
            <div className="accordin-info">
              <div className="image-wrapper">
                <img src="/assets/avatars/Kate Morrison.jpg" alt="Avatar" />
              </div>
              <div className="info-content">
                <h6>Kate Morrison</h6>
              </div>
            </div>
            <Message size={18} color="var(--grey)" />
          </div>
          <div className="expand">
            <div className="option">
              <h6>More</h6>
              <ArrowDown size={12} color="var(--yellow)" />
            </div>
          </div>
        </div>
      </div>
      <div className="accordin-container">
        <div className="accordin-header">
          <div className="accordin-name">
            <h3>Media</h3>
            <p>1369</p>
          </div>
          <ArrowDown size={12} color="var(--yellow)" />
        </div>
        <div className="accordin-grid">
          <div className="image-wrapper">
            <img src="/assets/media/Media_01.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_02.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_03.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_04.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_05.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_06.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_07.jpg" alt="Avatar" />
          </div>
          <div className="image-wrapper">
            <img src="/assets/media/Media_08.jpg" alt="Avatar" />
            <div className="layer-filter">+1362</div>
          </div>
        </div>
      </div>
      <div className="accordin-container">
        <div className="accordin-header">
          <div className="accordin-name">
            <h3>Documents</h3>
            <p>12</p>
          </div>
          <ArrowDown size={12} color="var(--yellow)" />
        </div>
        <div className="accordin-content">
          <div className="accordin-row">
            <div className="accordin-info">
              <DocumentFill size={18} color="var(--grey)" />
              <div className="info-content document">
                <h6>Employee_Contract.pdf</h6>
              </div>
            </div>
            <Download size={18} color="var(--grey)" />
          </div>
          <div className="accordin-row">
            <div className="accordin-info">
              <ImageFill size={18} color="var(--grey)" />
              <div className="info-content document">
                <h6>Company_Logo.png</h6>
              </div>
            </div>
            <Download size={18} color="var(--grey)" />
          </div>
          <div className="accordin-row">
            <div className="accordin-info">
              <AudioFill size={18} color="var(--grey)" />
              <div className="info-content document">
                <h6>Recorded_audio.mp3</h6>
              </div>
            </div>
            <Download size={18} color="var(--grey)" />
          </div>
          <div className="expand">
            <div className="option">
              <h6>More</h6>
              <ArrowDown size={12} color="var(--yellow)" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.Rectangle_1_31_110}></div>
      <div className={styles.Frame_1_31_104}>
        <span className={styles.More_31_105}>More</span>
        <div className={styles.ArrowDown_31_106}>
          <ArrowDown />
        </div>
      </div> */}
    </div>
  );
}
