import React, { Component } from "react";
import { Accordion, Icon, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "../styles.scss";

class NavServices extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: -1,
      activeLink: null
    };
  }

  componentWillReceiveProps(props) {
    this.activeIndexFromCurrentNav(props);
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(nextProps.navStructure) !==
      JSON.stringify(this.state.navStructure)
    );
  }

  activeIndexFromCurrentNav = ({ navStructure, currentNav }) => {
    navStructure.forEach((group, index) => {
      let methods = group.methods;
      let found = methods.find(method => {
        return method.key === currentNav;
      });
      if (found !== undefined) {
        this.setState({ activeIndex: index });
      }
    });
  };


  highlightInString = (term, inString) => {
    const highlightClass = styles.filterHighlight;
    const lowerTerm = term.toLowerCase();
    const lowerString = inString.toLocaleLowerCase();
    const matchIndex = lowerString.search(lowerTerm);
    if (term && term.length > 0 && matchIndex > -1) {
      return (
        <span className={styles.formattedTextString}>
          {inString.split("").map((char, index) => {
            if (index >= matchIndex && index < matchIndex + term.length) {
              return (
                <span key={index} className={highlightClass}>
                  {char}
                </span>
              );
            } else {
              return char;
            }
          })}
        </span>
      );
    } else {
      return inString;
    }
  };

  handleServiceClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newActive = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newActive });
  };

  generateNavigation = () => {
    const nav = this.props.navStructure;
    return (
      <Accordion inverted>
        {nav.map((service, index) => {
          return this.generateServiceGroup(service, index);
        })}
      </Accordion>
    );
  };

  generateServiceGroup = (group, index) => {
    const { activeIndex } = this.state;
    const { currentNav, filtered, filterTerm } = this.props;
    const { service, methods } = group;
    return (
      <React.Fragment key={index}>
        <Accordion.Title
          active={activeIndex === index || filtered}
          index={index}
          onClick={this.handleServiceClick}
          className={styles.sectionTitle}
        >
          <Icon name="dropdown" />
          {this.highlightInString(filterTerm, service)}
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === index || filtered}
          className={styles.serviceMethods}
        >
          <List inverted>
            {methods.map((link, index) => {
              return (
                <List.Item
                  as={Link}
                  to={`/api/${link.key.replace(".", "-")}`}
                  className={[
                    link.key === currentNav ? styles.activeLink : null,
                    styles.navItem
                  ].join(" ")}
                  key={index}
                >
                  {this.highlightInString(filterTerm, link.name)}
                </List.Item>
              );
            })}
          </List>
        </Accordion.Content>
      </React.Fragment>
    );
  };

  render() {
    return this.generateNavigation();
  }
}

NavServices.propTypes = {
  currentNav: PropTypes.string,
  navStructure: PropTypes.array,
  filtered: PropTypes.bool,
  filterTerm: PropTypes.string
};
NavServices.defaultProps = {};

export default NavServices;
