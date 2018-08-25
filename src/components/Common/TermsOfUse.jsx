import React from 'react';
import {Link} from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
const breadcrumbs = [
  {
    text: 'Terms of Use'
  }
]
const TermsOfUse = () => {
  return (
    <div className="container">
      <Breadcrumb
        breadcrumbs={breadcrumbs}
      />
      <section className="page-container">
        <h1>Terms Of Use</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi odio nam sapiente, neque fugiat et vitae sed sint aperiam dignissimos pariatur distinctio optio doloribus beatae corrupti nobis rerum voluptate id?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias illum veniam asperiores modi ea ab cumque voluptatum necessitatibus eligendi consectetur eos, repellendus vel. Assumenda perspiciatis vero accusantium. Nobis aut quaerat ipsum voluptatem. Qui recusandae dolores veritatis! Repudiandae inventore a exercitationem deserunt molestiae explicabo in distinctio commodi, iusto non dolorem itaque natus obcaecati nihil error debitis consequuntur atque doloribus quidem voluptatibus dolore. In culpa nostrum nihil mollitia veniam eum nam ipsam veritatis, maxime explicabo totam delectus recusandae possimus quos ratione amet illum animi labore ab velit. Omnis esse ipsam iusto rerum repellendus magni dolore ab velit, modi, tenetur totam ullam dolorem.
        </p>
        <p>
          sLorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, ex doloribus! Debitis reiciendis sapiente ex, et earum nobis, corporis quisquam enim possimus officia harum amet asperiores, hic quam minus facilis. Necessitatibus culpa fuga sunt perspiciatis maxime consequatur similique debitis deserunt ipsum. Quia aliquam corporis eligendi possimus reprehenderit maiores doloremque magni.
        </p>
        <Link to="/">Homepage</Link>
      </section>
    </div>
  );
};

export default TermsOfUse;