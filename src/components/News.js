import React, { useEffect, useState } from "react";
import Newsitems from "./Newsitems";
import { BeatLoader } from "react-spinners";
import PropTypes, { string } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setAritcles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a971711363644b28d679ada54947af1&page=${page}&pageSize=20`; // error

    setLoading(true);
    const data = await fetch(url);
    const parsedata = await data.json();
    console.log(parsedata);
    setAritcles(parsedata.articles);
    setTotalResults(parsedata.totalResults);
    setLoading(false);
  };
  useEffect(() => {
    updateNews();
  }, []);

  const handlepreclick = async () => {
    setPage(page - 1);
    updateNews();
  };
  const handlenextclick = async () => {
    setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a971711363644b28d679ada54947af1&page=1&pageSize=20`; // error

    const data = await fetch(url);
    const parsedata = await data.json();
    setAritcles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px" }}>
        Daily - Top Headlines
      </h1>
      {loading && <BeatLoader className="text-center" />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<BeatLoader className=" my-3 text-center" />}
      >
        <div className="container" >
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url} >
                  <Newsitems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
