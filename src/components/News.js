import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }
  articles = []
  constructor() {
    super()
    this.state = {
      articles: this.articles,
      loading: false,
      page: 0,
      author: ""
    }
  }
  async componentDidMount() {
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b586e343f20456694d1270ba88db145&pageSize=${this.props.pageSize}&page=1`
    let data = await fetch(url)
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, 
    totalResults: parsedData.totalResults,
    loading:false,
    author:parsedData.author })
  }
  handlePrevPage = async () => {
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b586e343f20456694d1270ba88db145&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log("Previous")
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false,
      author:parsedData.author
    })
  }
  handleNextPage = async () => {
    if (this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      
    }
    else {
      this.setState({loading:true})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b586e343f20456694d1270ba88db145&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
      let data = await fetch(url)
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false,
        author:parsedData.author
      })
    }
  }
  render() {
    let { mode } = this.props

    return (
      <div className={`bg-${mode}`}>
        <div className={`container py-4`}>
          <h2 className={mode === "light" ? "text-dark py-4" : "text-light py-4"}>NewsDose | Take your daily top news dose</h2>
          {this.state.loading === true ? <Spinner /> :""}
          <div className='row'>
            {/* this line means if loading is false than map function will be called on an array of articles  */}
            {!this.state.loading===true && this.state.articles.map((element) => {
              return <div className='col md-4 my-2' key={element.url}>
                <NewsItem title={element.title ? element.title : ""} author={element.author ? element.author : "Unknown" } description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            })}
          </div>
          <div className={`container d-flex justify-content-between p-2 bg-${mode} border-top`}>
            <button type="button" disabled={this.state.page <= 1} className={mode === "light" ? "btn btn-dark px-4" : "btn btn-light px-4"} onClick={this.handlePrevPage}>&larr; Previous</button>
            <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className={mode === "light" ? "btn btn-dark px-4" : "btn btn-light px-4"} onClick={this.handleNextPage}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}
