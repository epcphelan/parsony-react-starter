import React, { Component } from "react";
import {
  Input,
  Container,
  Table,
  Icon,
  List,
  Divider,
  Loader,
  Header
} from "semantic-ui-react";
import styles from "../styles.scss";
import PropTypes from "prop-types";

class EndpointDesc extends Component {
  constructor(props, context) {
    super(props, context);
  }

  loadingDescription = () => {
    return (
      <div className={styles.loadingMessage}>
        <Loader />
        Getting Documentation...
      </div>
    );
  };

  error = () => {
    return (
      <div className={styles.loadingMessage}>
        <Header as="h2">Error</Header>
        <p>
          {" "}
          There was an error loading API Documentation.
          <br />
          The likely cause is an unresponsive Parsony API Server.
        </p>
      </div>
    );
  };

  renderRequiredAuthType = required => {
    if (required) {
      return (
        <React.Fragment>
          <Icon name="checkmark" />
          Required
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Icon name="close" />
        Not Required
      </React.Fragment>
    );
  };

  restEndpoint = (method, RESTUrl) => {
    return (
      <React.Fragment>
        <h3>HTTP REST REQUEST</h3>
        <Input
          disabled
          label={{ color: "blue", content: method.toUpperCase() }}
          placeholder={RESTUrl}
          fluid
        />
      </React.Fragment>
    );
  };

  auth = (apiKey, sessionToken) => {
    return (
      <div style={{ marginTop: "3em", marginBottom: "2em" }}>
        <h3>ACCESS</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Authentication</Table.HeaderCell>
              <Table.HeaderCell>Requirement</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row positive={apiKey}>
              <Table.Cell>API Key</Table.Cell>
              <Table.Cell>{this.renderRequiredAuthType(apiKey)}</Table.Cell>
            </Table.Row>
            <Table.Row positive={sessionToken}>
              <Table.Cell>Session Token</Table.Cell>
              <Table.Cell>
                {this.renderRequiredAuthType(sessionToken)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  };

  params = params => {
    return (
      <div style={{ marginTop: "5em", marginBottom: "2em" }}>
        <h3>PARAMETERS</h3>
        <Table basic="very" compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Name </Table.HeaderCell>
              <Table.HeaderCell> Req. </Table.HeaderCell>
              <Table.HeaderCell> Type</Table.HeaderCell>
              <Table.HeaderCell> Validation </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {params.map((p, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{p.param}</Table.Cell>
                  <Table.Cell>{p.required ? "Y" : "N"}</Table.Cell>
                  <Table.Cell>{`{${p.validation["is_type"]}}`}</Table.Cell>
                  <Table.Cell>
                    {this.renderValidationList(p.validation)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  };

  errors = errors => {
    return (
      <div style={{ marginTop: "5em", marginBottom: "2em" }}>
        <h3>ERRORS</h3>
        <Table basic="very" compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Code </Table.HeaderCell>
              <Table.HeaderCell> Type </Table.HeaderCell>
              <Table.HeaderCell> Message </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {errors.map((e, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{e.code}</Table.Cell>
                  <Table.Cell>{e.type}</Table.Cell>
                  <Table.Cell>{e.msg}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  };

  renderValidationList = validation => {
    //is_array
    return (
      <List>
        {Object.keys(validation)
          .filter(k => k !== "is_type")
          .map((k, index) => {
            switch (k) {
              case "valid_email":
                return <List.Item key={index}> Valid Email </List.Item>;
                break;
              case "min_length":
                return (
                  <List.Item key={index}>
                    {" "}
                    Min Length: {validation[k]}{" "}
                  </List.Item>
                );
                break;
              case "max_length":
                return (
                  <List.Item key={index}>
                    {" "}
                    Max Length: {validation[k]}{" "}
                  </List.Item>
                );
                break;
              case "in_set":
                return (
                  <List.Item key={index}> Value in: {validation[k]} </List.Item>
                );
                break;
              case "is_url":
                return <List.Item key={index}> Valid URL</List.Item>;
                break;
              case "is_json":
                return <List.Item key={index}> Valid JSON</List.Item>;
                break;
              default:
                return (
                  <List.Item key={index}>
                    Unrecognized Validation Rule
                  </List.Item>
                );
            }
          })}
      </List>
    );
  };

  endpointDetail = definition => {
    const {
      RESTUrl,
      method,
      service,
      json_api,
      desc,
      authentication: { session_token: sessionToken, api_key: apiKey },
      params,
      errors
    } = definition;
    return (
      <div className={styles.endpointDescription}>
        <div className={styles.serviceHeader}>{json_api}</div>
        <div className={styles.serviceContent}>
          <h4>{`SERVICE: ${service.toUpperCase()}`}</h4>
          <Container className={styles.description}>
            <p>{desc}</p>
          </Container>
          <Divider />
          {this.restEndpoint(method, RESTUrl)}
          {this.auth(apiKey, sessionToken)}
          <Divider />
          {this.params(params)}
          <Divider />
          {this.errors(errors)}
          <Divider />
        </div>
      </div>
    );
  };

  render() {
    const definition = this.props.endpointData;
    if (definition) {
      return this.endpointDetail(definition);
    } else if (definition === null) {
      return this.error();
    } else {
      return this.loadingDescription();
    }
  }
}

EndpointDesc.propTypes = {
  endpointData: PropTypes.object
};

EndpointDesc.defaultProps = {};

export default EndpointDesc;
