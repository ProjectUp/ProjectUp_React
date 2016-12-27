import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Navbar from './navbar.js';

const thumbnails = [
  {text : 'Web Sites', pics : 'WebSites.gif', location : '/ProjectsPages?WebSites'},
  {text : 'Blogs', pics : 'Blogs.gif', location : '/ProjectsPages?Blogs'},
  {text : 'Other', pics : 'Other.gif', location : '/ProjectsPages?Other'}
],
lists = ['Games', 'Educational', 'Media', 'News', 'Scientific', 'Useful Apps', 'Utilities'];



class Button extends React.Component {
  handleClick = () => {
    window.location.href = this.props.location;
  }

  render() {
    return(
      <button onClick = {this.handleClick} className="btn btn-primary">Open</button>
    )
  }
}

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"col-sm-6 col-md-" + this.props.size}>
      <div className="thumbnail">
            <div className="caption">
            <img src={'/Images/' + this.props.src} style={this.props.styles} className="img-responsive"/>
                <h3>{this.props.caption}</h3>
                {this.props.children}
            </div>
      </div>
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    const thumbNail = this.props.thumbnails.map((item, index) => <Thumbnail caption={item.text} src={item.pics} size="4" key={index}><Button location={item.location}/></Thumbnail>)
    const list = this.props.lists.map((item, index) => <li key={index}><a href={'/ProjectsPages?MobileApplications/'+item}>{item}</a></li>)
    return (
      <div>
      <Navbar />
      <ReactCSSTransitionGroup
        transitionName="categ"
        transitionAppear={true}
        transitionEnter={false}
        transitionEnterTimeout={300}
        transitionLeave={false}>
          {thumbNail}
          <Thumbnail caption="Mobile Apllications" src="menu.gif" styles={{width:'1500'}} size="12">
                  <div className="dropup">
                       <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Expand
                           <span className="caret"></span></button>
                       <ul className="dropdown-menu">
                           {list}
                       </ul>
                  </div>
        </Thumbnail>
        </ReactCSSTransitionGroup>
      </div>
  )
  }

  shouldComponentUpdate() {
    return false;
  }
}

ReactDOM.render(<Main thumbnails={thumbnails} lists={lists} />,document.getElementById("app"));
