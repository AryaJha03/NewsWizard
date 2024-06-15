import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 20,
    categories: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    categories: PropTypes.string
  }
  constructor(props) {
    super(props);
    console.log("hello")

    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`${this.props.category} - NewsWizard`
  }

  async updatefunc(p) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cab3fe3e050947b3b5f8bf94113c1d80&page=${p}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true
    })
    console.log(url) //debug
    let data = await fetch(url)
    let parseddata = await data.json()
    console.log(parseddata)
    this.setState({
      articles: parseddata.articles,
      totalresults: parseddata.totalResults,
      loading: false
    })

  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cab3fe3e050947b3b5f8bf94113c1d80&pageSize=${this.props.pageSize}`
    // this.setState({
    //   loading: true 
    // })
    // let data = await fetch(url)
    // let parseddata = await data.json()
    // console.log(parseddata)
    // this.setState({ articles: parseddata.articles, 
    //   totalresults: parseddata.totalResults, 
    //   loading: false})
    const p = this.state.page;
    this.updatefunc(p)
  }


  handlepreviousclick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cab3fe3e050947b3b5f8bf94113c1d80&page=${this.state.page - 1}&
    // pageSize=${this.props.pageSize}`
    // this.setState({
    //   loading: true 
    // })
    // let data = await fetch(url)
    // let parseddata = await data.json()
    // console.log(parseddata)
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseddata.articles,
    //   loading: false
    // })
    const p = this.state.page - 1
    this.setState({
      page: this.state.page - 1
    })
    this.updatefunc(p)
  }
  handlenextclick = async () => {
    // if (this.state.page < (Math.ceil(this.state.totalresults / 20))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cab3fe3e050947b3b5f8bf94113c1d80&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //   this.setState({
    //     loading: true 
    //   })
    //   let data = await fetch(url)
    //   let parseddata = await data.json()
    //   console.log(parseddata)
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseddata.articles,
    //     loading: false
    //   })
    // }
    const p = this.state.page + 1;
    this.setState({
      page: this.state.page + 1
    })
    this.updatefunc(p)
  }


  render() {
    console.log("render")
    return (
      <div className="container my-4">
        <h2>NewsWizard - Top headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((elements) => {
            return <div className="col-md-3" key={elements.url}>
              <Newsitem title={elements.title ? elements.title.slice(0, 45) : ""} description={elements.description ? elements.description.slice(0, 88) : ""} imageurl={elements.urlToImage} newsurl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
            </div>
          })}

        </div>
        <div className='conatiner d-flex justify-content-between'>
          <button type="button" className="btn btn-secondary" disabled={this.state.page <= 1} onClick={this.handlepreviousclick}>&larr; Previous</button>
          <button type="button" className="btn btn-secondary" disabled={!(this.state.page < (Math.ceil(this.state.totalresults / 20)))} onClick={this.handlenextclick}>Next &rarr;</button>
        </div>
      </div>

    )
  }
}

export default News