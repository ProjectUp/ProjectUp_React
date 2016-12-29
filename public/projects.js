import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Navbar from './navbar.jsx';

const categ = window.location.search;


class Button extends React.Component {
  render() {
    return(
      <button style={{marginTop:'3px'}} className="btn btn-warning" onClick={this.props.onClick}>Send A Comment</button>
    )
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {opened : false}
  }

  handleChange = () => {
    if (this.state.opened) {
      this.props.handleClose();
      this.setState({opened : false});
    } else {
      this.props.handleOpen();
      this.setState({opened : true});
    }
  }

  render() {
    const Button = this.state.opened ? <button className="btn btn-danger" onClick={this.handleChange}>Close</button> :
                                       <button className="btn btn-primary" onClick={this.handleChange}>Expand</button>
    return(
      <div style={{textAlign:'center'}}>
        {Button}
      </div>
    )
  }
}

class Carousel extends React.Component {
  render() {
    const carousel = this.props.pictures.map((image, number) => {
  if (number === 0) {
    return <div key={0} className="item active">
              <img src={'data:image/*;base64,'+image} style={{height:'240px', width:'360px'}} />
           </div>
} else {
    return <div key={number} className="item">
             <img src={'data:image/*;base64,'+image} style={{height:'240px', width:'360px'}} />
            </div>
      }
})

const dots = this.props.pictures.map((image, number) => {
  if (number === 0) {
    return <li key={0} data-target={"#myCarousel"+this.props.id} data-slide-to="0" className="active"></li>
  } else {
    return <li key={number} data-target={"#myCarousel"+this.props.id} data-slide-to={number}></li>
  }
})


    return(
      <div id={"myCarousel"+this.props.id} className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {dots}
      </ol>
  <div className="carousel-inner" role="listbox">
    {carousel}
  </div>

  <a className="left carousel-control" href={"#myCarousel"+this.props.id} role="button" data-slide="prev">
    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="right carousel-control" href={"#myCarousel"+this.props.id} role="button" data-slide="next">
    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
    )
  }
}


class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments : this.props.comments, value : ''};
  }

  handleChange = (event) => {
    this.setState({value : event.target.value})
  }

  handleSend = () => {
    if (this.state.value) {
      let category = categ.substr(1);
      if (category === 'MobileApplications/Useful%20Apps') {
         category = 'MobileApplications/UsefulApps';
      }
      $.ajax({
        url : '/Comment',
        type: 'POST',
        contentType: 'application/json',
        data : JSON.stringify({
          comment : this.state.value,
          project : this.props.project,
          categ : category
        }),
        success : () => {
          const newComments = this.state.comments.concat(this.state.value);
          this.setState({value : '', comments : newComments});
        },
        error : () => {
          this.setState({value : ''})
          alert('Woow');
        }
      })
    }
  }


  render() {
    const comments = this.state.comments.map((comment, index) => {
      if (comment) {
        return <div key={index}>
           <li
           style={{
             backgroundColor:'#0e8cd2',
             marginLeft:'-45px',
             border:'2px solid #0e8cd2',
             borderRadius:'10px',
             textAlign:'center',
             fontSize:'medium',
             color:'white'}}>
             {comment}
          </li>
          <br />
       </div>
      }
    })
    return(
      <div id={'descr' + this.props.id} style={{display:'none', wordWrap:'break-word'}}>
        <span style={{fontSize:'medium'}}>Description: {this.props.description}</span><br />
        <span style={{fontSize:'medium'}}>Colaborators: {this.props.collabs}</span>
        <ul style={{listStyleType:'none', textAlign:'center'}}>
          <hr style={{marginLeft:'-45px', border:'3px solid #0e8cd2', borderRadius:'3px'}} />
          <div><span style={{marginLeft:'-50px', fontSize:'medium'}}>Comments</span></div>
          <ReactCSSTransitionGroup
          transitionName="comment"
          transitionAppear={true}
          transitionEnter={true}
          transitionEnterTimeout={300}
          transitionLeave={false}>
            {comments}
          </ReactCSSTransitionGroup>
        </ul>
        <textarea
           rows="3"
           cols="50"
           name="comment"
           className="form-control"
           placeholder="Type a comment..."
           value={this.state.value}
           onChange={this.handleChange}>
        </textarea>
        <Button onClick={this.handleSend} />
      </div>
    )
  }
}

class Thumbnail extends React.Component {
  handleOpen = () => {
    $('#descr'+this.props.id).slideDown(400);
  }

  handleClose = () => {
    $('#descr'+this.props.id).slideUp(400);
  }

  render() {
    return(
      <div className="col-sm-6 col-md-4">
      <div className="thumbnail">
            <div className="caption">
            {this.props.children}
                <h3>{this.props.caption}</h3>
                <Display handleOpen={this.handleOpen} handleClose={this.handleClose} />
                <Description
                   id={this.props.id}
                   description={this.props.description}
                   collabs={this.props.collabs}
                   comments={this.props.comments}
                   project={this.props.project} />
            </div>
      </div>
      </div>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects : []}
  }

  componentWillMount() {
    console.log(categ);
    $.ajax({
        url : 'Projects' + categ,
        type : 'GET',
        success : (data) => {
          const allTheProjects = [];
          const thisprojects = JSON.parse(data);
          if(!$.isEmptyObject(thisprojects)) {
            const projectarr = Object.keys(thisprojects);
            projectarr.forEach((value, number) => {
              allTheProjects.push(thisprojects[value]);
            })
            this.setState({projects : allTheProjects});
          } else {
            this.setState({projects:false})
          }
        },
        error : () => {
          console.log('nope');
          this.setState({projects:false})
        }
    })
  }

  componentDidUpdate() {
    $('.carousel').carousel({
          interval : 3500
      })
  }

  render() {
    if (!this.state.projects) {
      return (<div className="alert alert-warning" style={{textAlign:'center'}}><strong>No Projects Yet</strong></div>)
    } else {
    const allProjects = this.state.projects.map((project, index) => {
      if (project.images.length === 1) {
        return <div key={index}>
                  <Thumbnail
                     id={index}
                     caption={project.TheTitle}
                     description={project.descr}
                     collabs={project.cols}
                     comments={project.comments.split('chulchul')}
                     project={project.user+'/'+project.TheTitle}>
                    <img src={"data:image/*;base64,"+project.images[0]} className="img-responsive" style={{height:"240px", width:"360px"}} />
                  </Thumbnail>
               </div>
      } else {
        return <div key={index}>
                  <Thumbnail
                     id={index}
                     caption={project.TheTitle}
                     description={project.descr}
                     collabs={project.cols}
                     comments={project.comments.split('chulchul')}
                     project={project.user+'/'+project.TheTitle}>
                    <Carousel id={index} pictures={project.images} />
                  </Thumbnail>
               </div>
             }
          })

    return(
      <div>
        <Navbar />
        <ReactCSSTransitionGroup
          transitionName="mount"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={true}
          transitionEnterTimeout={300}
          transitionLeave={false}>
          {allProjects}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
}


ReactDOM.render(<Main />, document.getElementById('app'));
