import React, { Component } from "react";
import { Input, List, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavServices from "./NavServices.jsx";
import styles from "../styles.scss";
import PropTypes from "prop-types";
import logoImg from "../img/60_x_60_logo.png";

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm: "",
      filteredNavStruct: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentNav !== nextProps.currentNav) {
      this.clearFilter();
    }
  }

  clearFilter = () => {
    this.setState({ filteredNavStruct: [], searchTerm: "" });
  };

  filterNav = e => {
    const term = e.target.value;
    const { navStruct } = this.props;
    const filtered = navStruct.reduce((agg, group) => {
      if (
        JSON.stringify(group)
          .toLowerCase()
          .search(term.toLowerCase()) > -1
      ) {
        const innerFiltered = group.methods.reduce((agg, method) => {
          if (
            JSON.stringify(method)
              .toLowerCase()
              .search(term.toLowerCase()) > -1
          ) {
            agg.push(method);
          }
          return agg;
        }, []);
        agg.push(Object.assign({}, group, { methods: innerFiltered }));
      }
      return agg;
    }, []);
    this.setState({ searchTerm: term, filteredNavStruct: filtered });
  };

  filteredNav = () => {
    const { navStruct } = this.props;

    return this.isFilteredNav() ? this.state.filteredNavStruct : navStruct;
  };

  isFilteredNav = () => {
    return this.state.searchTerm.length > 0;
  };

  render() {
    const { currentNav } = this.props;
    const { searchTerm } = this.state;
    console.log(currentNav);
    return (
      <div className={styles.navigation}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logoImg} />
        </div>
        <div className={styles.search}>
          <Input
            className={styles.stealth}
            onChange={this.filterNav}
            inverted
            fluid
            size="tiny"
            icon="search"
            value={this.state.searchTerm}
            placeholder="Search"
          />
        </div>
        <List inverted className={styles.menuLink}>
          <List.Item
            as={Link}
            to={`/api`}
            className={currentNav === null ? styles.activeLink : null}
          >
            Introduction
          </List.Item>
        </List>
        <Header as="h4" inverted>
          Services
        </Header>
        <NavServices
          filtered={this.isFilteredNav()}
          filterTerm={searchTerm}
          currentNav={currentNav}
          navStructure={this.filteredNav()}
        />
        <List inverted className={styles.menuLink}>
          <List.Item
            as={Link}
            to={`/api/errors`}
            className={currentNav === "errors" ? styles.activeLink : null}
          >
            Errors
          </List.Item>
        </List>
      </div>
    );
  }
}

Navigation.propTypes = {
  navStruct: PropTypes.array,
  currentNav: PropTypes.string
};
Navigation.defaultProps = {};

export default Navigation;
