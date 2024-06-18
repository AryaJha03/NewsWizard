import React from 'react'
import { useEffect, useState } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  //  document.title=`${props.category} - NewsWizard`




  const updatefunc = async (p) => {
    props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${p}&pageSize=${props.pageSize}`
    setLoading(true)
    props.setProgress(30)
    // console.log(url) //debug
    let data = await fetch(url)
    let parseddata = await data.json()
    props.setProgress(60)
    // console.log(parseddata)
    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setLoading(false)
    props.setProgress(100)

  }

  useEffect(() => {
    const p = page;
    updatefunc(p)
  },[]
)




  const handlepreviousclick = async () => {

    //removed after refactoring the functions into updatefunction

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page - 1}&
    // pageSize=${props.pageSize}`
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
    const p = page - 1
    setPage(page-1)
    updatefunc(p)
  }






  const handlenextclick = async () => {

    //removed after refactoring the functions into updatefunction

    // if (this.state.page < (Math.ceil(this.state.totalresults / 20))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`
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
    const p = page + 1;
    setPage(page+1)
    updatefunc(p)
  }





  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    let parseddata = await data.json()
    setArticles(articles.concat(parseddata.articles))
    setTotalResults(parseddata.totalResults)
    setLoading(false)
  }

  return (
    <>
      <div className='container my-4' >
        <h2 style={{marginTop:'90px'}}>NewsWizard - Top headlines</h2>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={page <= Math.ceil(totalResults / props.pageSize)}
        loader={<Spinner />}
      >
        <div className='container my-4'>

          <div className="row">
            {articles.map((elements) => {
              return <div className="col-md-3" key={elements.id}>
                <Newsitem title={elements.title ? elements.title.slice(0, 45) : ""} description={elements.description ? elements.description.slice(0, 88) : ""} imageurl={elements.urlToImage} newsurl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
              </div>
            })}
            -
          </div>
        </div>
      </InfiniteScroll>


      {/* <div className='conatiner d-flex justify-content-between'>
          <button type="button" className="btn btn-secondary" disabled={this.state.page <= 1} onClick={this.handlepreviousclick}>&larr; Previous</button>
          <button type="button" className="btn btn-secondary" disabled={!(this.state.page < (Math.ceil(this.state.totalresults / 20)))} onClick={this.handlenextclick}>Next &rarr;</button>
        </div> */}
      {/* next previous buttons removed after adding infinite scroll */}




    </>

  )

}
News.defaultProps = {
  country: "in",
  pageSize: 20,
  categories: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  categories: PropTypes.string
}

export default News