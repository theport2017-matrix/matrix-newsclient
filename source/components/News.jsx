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
      <div className="article">
        <img src={this.props.image}/>
        <div className="article-body">
          <h3 className="article-title">{this.props.title}</h3>
          <p className="article-text">{shortBody}</p>
        </div>
        {this.props.isLocal ? (
          <div className="article-local">
            <FontAwesome name="dot-circle-o fa-3x"/>
          </div>) : null
        }
      </div>
    );
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
      const element = <Article
        key={index}
        title={article.title}
        body={article.body}
        image={article.image}
        isLocal={article.local}/>;

      if (!newsItems[article.title]) {
        newsItems[article.title] = element;
      }
    });



    return (<div className="news-feed">
      <h2 className="newsHeader">
        <FontAwesome name="newspaper-o" className="title-icon"/>
        News
      </h2>

      <div className="news">
          {Object.keys(newsItems).map((k) => newsItems[k])}
      </div>
    </div>);
      // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAVUlEQVQ4jWNUVlb+z0ADwEQLQxkYGBhYYIy7d+8ykmMAzMcw/TA+zVzMOPzCGD0MCQGYehZ0AWoBol1MKhiGkYcN4ItQjMgjB+ALRooMHl4uHnrJDQCslS4LVhnT2wAAAABJRU5ErkJggg=="/>
  }
}
