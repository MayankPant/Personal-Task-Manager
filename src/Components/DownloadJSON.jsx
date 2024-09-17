import React, { createRef, Component } from "react";
import Button from "./Button";

class DownloadJSON extends Component {
  constructor(props) {
    super(props);
    this.linkRef = createRef();
  }

  downloadJson = () => {
    const { data, filename } = this.props;
    console.log("Tasks to be downloaded: ", data);

    const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const jsonURL = URL.createObjectURL(jsonData);

    // Ensuring the ref is available before setting href and triggering the download
    if (this.linkRef.current) {
      this.linkRef.current.href = jsonURL;
      this.linkRef.current.download = `${filename}.json`;
      this.linkRef.current.click(); // Trigger the click programmatically
    }
  };

  render() {
    return (
      <>
        {/* Render a hidden anchor tag that will be clicked programmatically */}
        <a ref={this.linkRef} style={{ display: "none" }}>Download JSON</a>

        {/* Button triggers download */}
        <Button
          icon={this.props.icon}
          onClick={this.downloadJson}
          styles={{ backgroundColor: '#673ab7', border: '0px' }}
        />
      </>
    );
  }
}

export default DownloadJSON;
