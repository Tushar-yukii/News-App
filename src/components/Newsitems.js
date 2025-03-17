import React from "react";

const Newsitems = (props) => {
  let { title, description, imageurl, newsUrl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card">
        <span
          class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: "1" }}
        >
          {source}
        </span>
        <img
          src={
            !imageurl
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfX1-Xu9C5cmao92ha05kIu50dYOmWcLm7Wgs"
              : imageurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body my-2">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-danger">
              By {!author ? "Unknows" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="blank"
            className="btn btn-sm btn-dark"
            style={{ color: "white" }}
          >
            Search More
          </a>
        </div>
      </div>
    </div>
  );
};
export default Newsitems;
