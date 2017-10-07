import React from 'react';

class Article extends React.Component {
  render() {
    return (<div className="article">
      <img src={this.props.image}/>
      <h1>{this.props.title}</h1>
      <p>{this.props.body}</p>
    </div>);
  }
}

export default class News extends React.Component {
  render() {

    // TODO: Filter on `local` key
    const globalNews = this.props.news.slice(-4);

    const newsItems = globalNews.map((article, index) => {
      return <Article key={index} title={article.title} body={article.body} image={article.image}/>;
    });

    return (<div>
      <h1 className="newsHeader">News</h1>
      <div className="news">
          {newsItems}
      </div>
    </div>);
  }
}
