import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import intro from './intro.md';
import styles from'../styles.scss';


const Introduction = () =>{
  return(
    <div className={styles.endpointDescription}>
      <div className={styles.serviceHeader}>INTRODUCTION</div>
      <div style={{padding:'1em'}} className={styles.markdownBody}>
        <Markdown options={{ forceBlock: true }}>{intro}</Markdown>
      </div>
    </div>
  )
};

export default Introduction