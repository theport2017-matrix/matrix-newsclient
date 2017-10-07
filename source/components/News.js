import React from 'react';

class Article extends React.Component {
	render() {
		return (<div class="article">
			<img src={this.props.image}/>
			<h1>{this.props.title}</h1>
			<p>{this.props.body}</p>
		</div>);
	}
}

export default class News extends React.Component {
  render() {

  	// TODO: Filter on `local` key
  	const globalNews = this.props.news;

  	const newsItems = globalNews.map((article) => {
  		return <Article title={article.title} body={article.body} image={article.image}/>;
  	});

  	console.info(newsItems);

    return (
      <div className="news">
      	{newsItems}
      </div>);
  }
}
