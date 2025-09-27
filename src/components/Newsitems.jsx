import React from "react";

const Newsitems = (props) => {
  const { title, description, imageurl, newsUrl, author, date, source, mode } =
    props;

  return (
    <div className="my-3">
      <div
        className={`card h-100 shadow-sm ${
          mode === "dark" ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        {/* Badge */}
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: "1" }}
        >
          {source}
        </span>

        {/* Image */}
        <img
          src={
            !imageurl
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfX1-Xu9C5cmao92ha05kIu50dYOmWcLm7Wgs"
              : imageurl
          }
          className="card-img-top"
          alt={title}
          style={{ objectFit: "cover", height: "200px" }}
        />

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title ? title.slice(0, 70) : ""}...</h5>
          <p className="card-text">
            {description ? description.slice(0, 88) : ""}...
          </p>

          <p className="card-text mt-auto">
            <small className={mode === "dark" ? "text-light" : "text-muted"}>
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>

          {/* Button */}
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-sm ${
              mode === "dark" ? "btn-light text-dark" : "btn-dark text-light"
            }`}
            style={{ borderRadius: "14px" }}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitems;
