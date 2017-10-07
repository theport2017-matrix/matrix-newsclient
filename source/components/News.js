import React from 'react';

class Article extends React.Component {
  render() {
    const shortBody = this.props.body.slice(0, this.props.body.indexOf(' ', 100));

    return (<div className="article">
      <img src={this.props.image}/>
      <h1>{this.props.title}</h1>
      <p>{shortBody}...</p>
    </div>);
  }
}

export default class News extends React.Component {
  render() {

    // TODO: Filter on `local` key
    const globalNews = this.props.news.sort((a,b) => {
        return b._timeReceived - a._timeReceived;
    }).slice(0, 6);
    const newsItems = {};

    globalNews.forEach((article, index) => {
      const element = <Article key={index} title={article.title} body={article.body} image={article.image}/>;

      if (!newsItems[article.title]) {
        newsItems[article.title] = element;
      }
    });

    return (<div>
      <h1 className="newsHeader">News</h1>
      <div className="news">
          {Object.keys(newsItems).map((k) => newsItems[k])}
      </div>
    </div>);
  }
}
