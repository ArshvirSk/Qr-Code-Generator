import { QRCodeCanvas } from "qrcode.react";
import React, { useRef, useState } from "react";

const QrCode = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  const downloadQRcode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={330}
      bgColor={"white"}
      level={"H"}
      border={"50px solid white"}
    />
  );

  return (
    <div className="qrcode__container">
      <div className="QR" ref={qrRef}>
        {qrcode}
      </div>
      <div className="input__group">
        <form onSubmit={downloadQRcode}>
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="https://dbaconsultants.co.in"
          />
          <div className="DownloadBT">
            <button className="Button" type="submit" disabled={!url}>
              Download QR Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
