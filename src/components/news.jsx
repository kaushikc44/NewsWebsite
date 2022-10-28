import React, { Component } from 'react'
import Newsitem from './newsitem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  article = []

  constructor(){
    super();
    this.state = { 
      articles:this.article,
      loading:false,
      page:1

    }
  }
  static defaultProps = {
    country:"in",
    pageSize:5,
    category:"sports"
  }
static propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  country: PropTypes.string

}

  async updateNews(){
      this.props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.props.setProgress(30);
      let data = await fetch(url);
      this.props.setProgress(60);
      let parseddata = await data.json();
      this.props.setProgress(80);
      this.setState({articles:parseddata.articles,totalResult:0})
      this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
      this.setState({page:this.state.page + 1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=068639b3eed245d6a3dd73b41dfe281f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({articles:this.state.articles.concat(parseddata.articles),totalResult:0})
  };

  async componentDidMount(){
    this.updateNews()
  }

  handleNextClick = async () => {
    this.setState({page : this.state.page + 1})
    this.updateNews()
    
  } 

  handlePreviousClick = async () => {

    this.setState({page : this.state.page - 1})
    this.updateNews()
  }

  

  render() {
    return (
      <div>
          <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
        >
          <div className="container">
          <div className="row my-4">
          {this.state.articles.map((element) => {
           return  <div className="col-md-4 my-3" key={element.id}>
            <Newsitem  newsid={element.url} title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt}/>
            </div>
          })}
          </div>
          </div>
          </InfiniteScroll>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick} > &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} > Next &rarr; </button>

        </div>
        
      </div>
    )
  }
}

export default News;
