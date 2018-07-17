import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import EndpointDesc from "./components/EndpointDesc";
import CodeTabs from "./components/CodeTabs";
import ResponseTabs from "./components/ResponseTabs";
import Introduction from "./static/Intro";
import Errors from "./static/Errors";
import PropTypes from "prop-types";
import * as styles from "./styles.scss";

class APIDocumentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: {},
      docsErr:{},
      errors: [],
      errorsErr:{}
    };
  }

  componentDidMount() {
    this.getDocs();
    this.getErrors();
  }

  getDocs = () => {
    const { endpoint } = this.props;
    const data = {
      method: "api.documentation",
      args: {}
    };
    fetch(endpoint, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    }).then(async docs => {
      let data = await docs.json();
      if (data.success) {
        this.setState({
          docs: data.data
        });
      } else{
        this.setState({
          docsErr: data.error
        })
      }
    });
  };

  getErrors = () => {
    const { endpoint } = this.props;
    const data = {
      method: "api.errors",
      args: {}
    };
    fetch(endpoint, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    }).then(async errors => {
      let data = await errors.json();
      console.log(data);
      if (data.success) {
        this.setState({
          errors: data.data
        });
      } else{
        this.setState({
          errorsErr: data.error
        })
      }
    });
  };

  methodDetail = ({ match }) => {
    const methodId = match.params["methodId"];
    switch (methodId) {
      case undefined:
        return this.staticView("intro");
        break;
      case "errors":
        return this.staticView("errors");
        break;
      default:
        return this.detailView(methodId);
        break;
    }
  };

  staticView = content => {
    const {errors} = this.state;
    return (
      <React.Fragment>
        <div className={styles.right}>
          <div className={styles.docsDetail}>
            {(() => {
              switch (content) {
                case "intro":
                  return <Introduction />;
                  break;
                case "errors":
                  return <Errors errors = {errors} />;
                  break;
              }
            })()}
          </div>
          <div className={styles.codePanel}>
            <CodeTabs />
            <ResponseTabs />
          </div>
        </div>
      </React.Fragment>
    );
  };

  detailView = (methodId) => {
    const endpoint = methodId.replace("-", ".");
    const definition = this.getEndpointDefinition(endpoint);
    return (
      <React.Fragment>
        <div className={styles.right}>
          <div className={styles.docsDetail}>
            <EndpointDesc endpointData={definition} />
          </div>
          <div className={styles.codePanel}>
            <CodeTabs endpoint={endpoint} definition={definition} />
            <ResponseTabs endpoint={endpoint} definition={definition} />
          </div>
        </div>
      </React.Fragment>
    );
  };

  getEndpointDefinition = method => {
    const { docs } = this.state;
    return docs[method] ? docs[method] : null;
  };


  navigation = ({ match }) => {
    const navStruct = this.getApiDocsNav();
    const methodId = match.params["methodId"];
    let endpoint;
    if (methodId) {
      endpoint = methodId.replace("-", ".");
    } else {
      endpoint = null;
    }

    return (
      <div className={styles.menu}>
        <Navigation currentNav={endpoint} navStruct={navStruct} />
      </div>
    );
  };

  getApiDocsNav = () => {
    const { docs } = this.state;
    if (docs) {
      const endpointByService = Object.keys(docs).reduce((agg, k) => {
        const endpoint = docs[k];
        const service = endpoint.service;
        if (agg.hasOwnProperty(service)) {
          agg[service].push({
            name: _stripRedundantPrefix(k, service),
            key: k
          });
        } else {
          agg[service] = [
            { name: _stripRedundantPrefix(k, service), key: k }
          ];
        }
        return agg;
      }, {});
      return Object.keys(endpointByService).map(k => {
        return { service: k, methods: endpointByService[k] };
      });
    }
    return [];

    function _stripRedundantPrefix(method, service) {
      const methodParts = method.split(".");
      const prefix = methodParts.shift();
      if (prefix.toLowerCase() === service.toLowerCase()) {
        return methodParts.join(".");
      }
      return method;
    }
  };

  render() {
    return (
      <div>
        <Route
          path="/api/:methodId"
          render={props => {
            return (
              <React.Fragment>
                {this.navigation(props)}
                {this.methodDetail(props)}
              </React.Fragment>
            );
          }}
        />
        <Route
          exact path="/api"
          render={props => {
            return (
              <React.Fragment>
                {this.navigation(props)}
                {this.methodDetail(props)}
              </React.Fragment>
            );
          }}
        />
      </div>
    );
  }
}

APIDocumentation.propTypes = {
  endpoint: PropTypes.string
};
APIDocumentation.defaultProps = {
  endpoint: "/json-api"
};

export default APIDocumentation;
