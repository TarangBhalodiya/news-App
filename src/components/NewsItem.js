import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description,imageUrl, newsUrl,author} = this.props;
        let defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwo6ul9ecjS5Hx7L7XWEce6E_acto4Wo987g&usqp=CAU"
        let {mode} = this.props
        return (
        <div>
            <div className="card" style={{ width: '18em' }}>
                <img src={imageUrl?imageUrl:defaultUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className='card-title'>Author "{author}"</h6>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} className="btn btn-dark btn-sm">Read more</a>
                </div>
            </div>
       </div >
    )
    }
}
