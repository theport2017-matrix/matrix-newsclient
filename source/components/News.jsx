import FontAwesome from 'react-fontawesome';
import React from 'react';

class Article extends React.Component {
  render() {
    let shortBody = this.props.body;
    if (shortBody.length > 200) {
      shortBody = shortBody.slice(
        0, shortBody.indexOf(' ', 200)
      ).trim() + '...';
    }

    return (
      <div className=
      {this.props.isLocal ? ("article article-local"):("article")}
      >
        <img src={this.props.image}/>
        <div className="article-body">
          <h3 className="article-title">{this.props.title}</h3>
          <p className="article-text">{shortBody}</p>
        </div>
        {this.props.isLocal ? (
          <div className="article-local-sign">
            <FontAwesome name="dot-circle-o fa-3x"/>
          </div>) : null
        }
      </div>
    );
  }
}

export default class News extends React.Component {
  render() {
    const newsArticles = this.props.news.filter((article) => {
      return article.body.length > 50;
    }).sort((a,b) => {
        return b._timeReceived - a._timeReceived;
    }).map((article, index) => {
      return <Article
        key={index}
        title={article.title}
        body={article.body}
        image={article.image}
        isLocal={article.local}/>;
    }).slice(0, 6);

    return (<div className="news-feed">
      <h2 className="newsHeader">
        <FontAwesome name="newspaper-o" className="title-icon"/>
        News
      </h2>
      <div className="news">
          {newsArticles}
      </div>
    </div>);
  }
}
