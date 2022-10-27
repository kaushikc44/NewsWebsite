import React, { Component } from 'react'
import Newsitem from './newsitem';
import PropTypes from 'prop-types';
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

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=068639b3eed245d6a3dd73b41dfe281f&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    // console.log(parseddata);
    this.setState({articles:parseddata.articles,totalResult:parseddata.totalResult})
  }

  handleNextClick = async () => {
    console.log("next")
    if (this.state.page + 1 > Math.ceil(this.state.totalResult/20)){
    }else{
      this.setState({page : this.state.page + 1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=068639b3eed245d6a3dd73b41dfe281f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({articles:parseddata.articles})
    }
    
  } 

  handlePreviousClick = async () => {
    console.log("previous")
    this.setState({page : this.state.page - 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=068639b3eed245d6a3dd73b41dfe281f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({articles:parseddata.articles})
  }

  

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
          <div className="row my-4">
          {this.state.articles.map((element) => {
           return  <div className="col-md-4 my-3" key={element.id}>
            <Newsitem  newsid={element.url} title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}/>
            </div>
          })}
            
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick} > &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} > Next &rarr; </button>
          </div>
        </div>
        
      </div>
    )
  }
}

export default News;
