import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn : false, user : ''};
  }

  componentWillMount() {
    $.ajax({
      type : 'GET',
      url : '/GettingData',
      success : (user) => {
        if (user !== 'Blown') {
          this.setState({isLoggedIn : true, user : user});
        }
      },
      error : () => {
        this.setState({isLoggedIn : false, user : ''});
      }
    })
  }

  render() {
    const element = this.state.isLoggedIn ? <header style={{marginTop : 5}}>
 <nav className="navbar navbar-inverse" style={{backgroundColor : "#0e8cd2", borderColor : "#0e8cd2"}}>
     <div className="container-fluid">
         <div className="navbar-header">
             <a className="navbar-brand" href="/"><span style={{color : "white"}}>ProjectUp</span></a>
         </div>
         <ul className="nav navbar-nav">
             <li><a href="/About.html"><span style={{color : "white"}}>About Us</span></a></li>
             <li><a href="/Contact.html"><span style={{color : "white"}}>Contact Us</span></a></li>
         </ul>
         <ul className="nav navbar-nav navbar-right">
             <li><a href="/logged"><span className="glyphicon glyphicon-user"></span><span style={{color : "white"}}>{this.state.user}</span></a></li>
             <li><a href="/projectupload"><span style={{color : "white"}}>Upload a Project</span></a></li>
             <li><a href="/logoff"><span style={{color : "white"}}>Log out</span></a></li>
         </ul>
     </div>
 </nav>
 </header> : <header style={{marginTop : 5}}>
 <nav className="navbar navbar-inverse" style={{backgroundColor : "#0e8cd2", borderColor : "#0e8cd2"}}>
     <div className="container-fluid">
         <div className="navbar-header">
             <a className="navbar-brand" href="/"><span style={{color : "white"}}>ProjectUp</span></a>
         </div>
         <ul className="nav navbar-nav">
             <li><a href="/About.html"><span style={{color : "white"}}>About Us</span></a></li>
             <li><a href="/Contact.html"><span style={{color : "white"}}>Contact Us</span></a></li>
         </ul>
         <ul className="nav navbar-nav navbar-right">
             <li><a href="/public/Form.html"><span className="glyphicon glyphicon-user"></span> <span style={{color : "white"}}>Sign Up</span></a></li>
             <li><a href="/public/LogIn.html"><span className="glyphicon glyphicon-log-in"></span> <span style={{color : "white"}}>Login</span></a></li>
         </ul>
     </div>
 </nav>
 </header>
    return (
      <div>{element}</div>
    )
  }
}
