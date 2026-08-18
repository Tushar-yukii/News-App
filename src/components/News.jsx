import React, { useCallback, useEffect, useState } from "react";
import Newsitems from "./Newsitems";
import BeatLoader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, category, pageSize }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");

  // Fetch news
  const updateNews = useCallback(
    async (pageNumber = 1, append = false) => {
      try {
        setLoading(true);
        setError("");

        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3a971711363644b28d679ada54947af1&page=${pageNumber}&pageSize=${pageSize}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Failed to fetch news");
        }

        const newArticles = data.articles || [];

        setArticles((prevArticles) =>
          append ? [...prevArticles, ...newArticles] : newArticles,
        );

        setTotalResults(data.totalResults || 0);
      } catch (err) {
        console.error("News API Error:", err);
        setError("Unable to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [country, category, pageSize],
  );

  // Initial news load
  useEffect(() => {
    updateNews(1, false);
  }, [updateNews]);

  // Load next page
  const fetchMoreData = async () => {
    const nextPage = page + 1;

    setPage(nextPage);

    await updateNews(nextPage, true);
  };

  const hasMore = articles.length < totalResults;

  return (
    <>
      <h1
        className="text-center"
        style={{
          margin: "35px",
          marginTop: "80px",
        }}
      >
        Daily - Top Headlines
      </h1>

      {/* Initial loading */}
      {loading && articles.length === 0 && (
        <div className="text-center my-4">
          <BeatLoader />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="container">
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* News */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!loading && hasMore}
        loader={
          <div className="text-center my-4">
            <BeatLoader />
          </div>
        }
        endMessage={
          <p className="text-center my-4">
            <strong>You have reached the end of the news.</strong>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={
                    element.title
                      ? element.title.slice(0, 70)
                      : "No title available"
                  }
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "No description available"
                  }
                  imageurl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt}
                  source={element.source?.name || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
