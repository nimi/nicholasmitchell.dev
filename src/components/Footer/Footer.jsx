import React, { Component } from "react";
import { Link } from "gatsby";
import "./Footer.css";

class Footer extends Component {
  render() {
    const { config } = this.props;
    const url = config.siteRss;
    const { copyright } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className="footer">
        <div className="notice-container">
          <h4>{copyright}</h4>

          <Link to={url}>
            <button>Subscribe</button>
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
