import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const Breadcrumb = ({ breadcrumbs }) => {
  const brLinks = breadcrumbs.map((breadcrumb, index) => {
    return (
      <span key={index}>
        <span className="breadcrumb-separator">/</span>
        {breadcrumb.link ? (<Link to={breadcrumb.link}>{breadcrumb.text}</Link>) : breadcrumb.text}
      </span>
    )
  });
  return (
    <div className="single-listing-breadcrumb">
      <span>
        <Link to="/"><i className="fa fa-home"></i> Home</Link>
      </span>
      {brLinks}
    </div>
  );
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
}

export default Breadcrumb;