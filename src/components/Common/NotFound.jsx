import React from 'react';
import {Link} from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="container">
      <section id="not-found">
        <h1>Errro 404!</h1>
        <h2>Oopsss!!! It seems that the page you are looking for has been moved or deleted.</h2>
        <Link to="/">Homepage</Link>
      </section>
    </div>
  );
};

export default NotFound;
