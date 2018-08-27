import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import olxLogo from '../../assets/img/olx-logo.png';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
    }
  }

  // componentWillReceiveProps(nextProps) {

  // }

  render() {

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-2 mb-3 mb-md-0">
              <img src={olxLogo} alt={`OLX Pakistan`} />
            </div>
            <div className="col-6 col-sm-2">
              <ul className="list-unstyled">
                <li><Link to="#">Location Map</Link></li>
                <li><Link to="#">Popular Searches</Link></li>
                <li><Link to="#">Sitemap</Link></li>
              </ul>
            </div>
            <div className="col-6 col-sm-2">
              <ul className="list-unstyled">
                <li><Link to="#">Terms of Use</Link></li>
                <li><Link to="#">Help &amp; Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-6 col-sm-2">
              <ul className="list-unstyled">
                <li><Link to="#">Who we are <i className="fa fa-arrow-down"></i></Link></li>
                <li><Link to="#">Join OLX</Link></li>
                <li><Link to="#">Happy OLXers</Link></li>
              </ul>
            </div>
            <div className="col-6 col-sm-4">
              <ul className="list-unstyled">
                <li><h4>Contact Us</h4></li>
                <li><a href="mailto:help@olx.com.pk">help@olx.com.pk</a></li>
                <li><span className="bold">080010101</span><small className="text-muted">(9:30am to 6:30pm)</small></li>
                <li><span className="bold">Business Packages</span><small className="text-muted">(featured ads, advertising)</small></li>
                <li><Link to="#">click here</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
Footer.propTypes = {
  settings: PropTypes.object
};

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(Footer);