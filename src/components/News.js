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
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3a971711363644b28d679ada54947af1&page=${page}&pageSize=${props.pageSize}`; // error

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

  // const handlepreclick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };
  // const handlenextclick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=3a971711363644b28d679ada54947af1&page=${
      page + 1
    }&pageSize=${props.pageSize}`; // error
    setPage(page + 1);
    const data = await fetch(url);
    const parsedata = await data.json();
    setAritcles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults);
  };

  return (
    <>
   

      <h1 className="text-center" style={{ margin: "35px", marginTop: "80px" }}>
        Daily - Top Headlines
      </h1>
      {loading && <BeatLoader className="text-center" />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<BeatLoader className=" my-3 text-center" />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitems
                    title={element.title ? element.title.slice(0, 70) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
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
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
