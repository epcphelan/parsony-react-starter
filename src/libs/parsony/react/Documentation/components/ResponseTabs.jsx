import React, { Component } from "react";
import PropTypes from "prop-types";
import SuccessResponse from "./SuccessResponse";
import ErrorResponse from "./ErrorResponse";
import styles from "../styles.scss";

class ResponseTabs extends Component {
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
            <div className={styles.tab}>SUCCESS</div>
          </li>
          <li
            onClick={() => {
              this.setSelectedTab(1);
            }}
            className={[
              this.isSelectedClass(currentTabIndex === 1),
              styles.errorTab
            ].join(" ")}
          >
            <div className={styles.tab}>ERROR</div>
          </li>
        </ul>
      </div>
    );
  };

  apiResponseTab = (endpoint, definition) => {
    return (
      <SuccessResponse
        method={endpoint}
        response={definition ? definition.response : {}}
      />
    );
  };

  apiError = (endpoint, definition) => {
    return (
      <ErrorResponse
        method={endpoint}
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
            styles.responseSample
          ].join(" ")}
        >
          {this.apiResponseTab(endpoint, definition)}
        </div>
        <div
          className={[
            this.isSelectedClass(currentTabIndex === 1),
            styles.errorSample,
            styles.errorTab
          ].join(" ")}
        >
          {this.apiError(endpoint, definition)}
        </div>
      </div>
    );
  };

  render() {
    const { endpoint, definition } = this.props;
    return (
      <div className={styles.responseTabs}>
        {this.tabs()}
        {this.content(endpoint, definition)}
      </div>
    );
  }
}

ResponseTabs.propTypes = {
  endpoint: PropTypes.string,
  definition: PropTypes.object
};
ResponseTabs.defaultProps = {};

export default ResponseTabs;
