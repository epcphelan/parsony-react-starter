import React, { Component } from "react";
import PropTypes from "prop-types";
import SampleRPCRequest from "./SampleRPCRequest";
import SampleRESTRequest from "./SampleRESTRequest";
import styles from "../styles.scss";

class CodeTabs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentTabIndex: 0
    };
  }

  setSelectedTab = index => {
    this.setState({
      currentTabIndex: index
    });
  };

  isSelectedClass = bool => {
    if (bool) {
      return styles.active;
    } else {
      return "";
    }
  };

  tabs = () => {
    const { currentTabIndex } = this.state;
    return (
      <div className={styles.tabsController}>
        <ul>
          <li
            onClick={() => {
              this.setSelectedTab(0);
            }}
            className={this.isSelectedClass(currentTabIndex === 0)}
          >
            <div className={styles.tab}>JSON RPC</div>
          </li>
          <li
            onClick={() => {
              this.setSelectedTab(1);
            }}
            className={this.isSelectedClass(currentTabIndex === 1)}
          >
            <div className={styles.tab}>REST</div>
          </li>
        </ul>
      </div>
    );
  };

  jsonRpcTab = (endpoint, definition) => {
    return (
      <SampleRPCRequest
        authentication={
          definition
            ? definition["authentication"]
            : { api_key: false, session_token: false }
        }
        endpointMethod={endpoint}
        endpointParams={definition ? definition.params : []}
      />
    );
  };

  restTab = (endpoint, definition) => {
    return (
      <SampleRESTRequest
        authentication={
          definition
            ? definition["authentication"]
            : { api_key: false, session_token: false }
        }
        endpointMethod={endpoint}
        endpointParams={definition ? definition.params : []}
      />
    );
  };

  content = (endpoint, definition) => {
    const { currentTabIndex } = this.state;
    return (
      <div className={styles.content}>
        <div
          className={[
            this.isSelectedClass(currentTabIndex === 0),
            styles.codeSample
          ].join(" ")}
        >
          {this.jsonRpcTab(endpoint, definition)}
        </div>
        <div
          className={[
            this.isSelectedClass(currentTabIndex === 1),
            styles.codeSample
          ].join(" ")}
        >
          {this.restTab(endpoint, definition)}
        </div>
      </div>
    );
  };

  render() {
    const { endpoint, definition } = this.props;
    return (
      <div className={styles.codeTabs}>
        {this.tabs()}
        {this.content(endpoint, definition)}
      </div>
    );
  }
}

CodeTabs.propTypes = {
  endpoint: PropTypes.string,
  definition: PropTypes.object
};
CodeTabs.defaultProps = {};

export default CodeTabs;
