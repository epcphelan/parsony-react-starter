import React from 'react';
import styles from '../styles.scss';

const SessionTokenHeader = () =>{
  return (
    <div className={styles.header}>
      <span className={styles.H}>-H </span>
      <span className={styles.key}>"Session-Token :  </span>
      <span className={styles.val}>{`<Token>`}</span>
      <span className={styles.key}>"</span>
    </div>

  )
};

const APIKeyHeader = () =>{
  return (
    <div className={styles.header}>
      <span className={styles.H}>-H </span>
      <span className={styles.key}>"Api-Key : </span>
      <span className={styles.val}>{`<API Key>`}</span>
      <span className={styles.key}>"</span>
    </div>

  )
};

const ContentHeader = () =>{
  return (
    <div className={styles.header}>
      <span className={styles.H}>-H </span>
      <span className={styles.key}>"Content-Type:application/json"</span>
    </div>
  )
};

export {
  SessionTokenHeader,
  APIKeyHeader,
  ContentHeader
}