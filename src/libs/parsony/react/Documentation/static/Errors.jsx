import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import errorsmd from './errors.md';
import styles from'../styles.scss';
import PropTypes from "prop-types";
import { Table }from 'semantic-ui-react';

const ErrorsTable = (props) =>{
  const {errors} = props;
  return(
    <Table basic="very" compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Code
          </Table.HeaderCell>
          <Table.HeaderCell>
            Type
          </Table.HeaderCell>
          <Table.HeaderCell>
            Message
          </Table.HeaderCell>
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
  )
};

const Errors = (props) =>{
  const {errors} = props;
  return(
    <div className={styles.endpointDescription}>
      <div className={styles.serviceHeader}>ERRORS</div>
      <div style={{padding:'1em'}} className={styles.markdownBody}>
        <Markdown options={{ forceBlock: true }}>{errorsmd}</Markdown>

      </div>
      <div className={styles.serviceContent}>
        <ErrorsTable errors = {errors}/>
      </div>
    </div>
  )
};

Errors.propTypes = {
  errors : PropTypes.array,
};

Errors.defaultProps = {
  errors : []
};

export default Errors;