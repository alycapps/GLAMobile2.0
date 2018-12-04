import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Client from './pages/Client';
import Stylist from './pages/Stylist';
import Search from './pages/Search';
import Calendar from "./pages/Calendar";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		console.log('component is mounting')
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (emailAddress, password) => {
		AUTH.login(emailAddress, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout}/>
            <div className="main-view">
              <Switch>
								<Route exact path="/" 
									render={() => {
										if (this.state.user.userType === 'client') {
											return <Client user={this.state.user} />
										} else if (this.state.user.userType === 'stylist') {
											return <Stylist user={this.state.user} />
										}
										return <div>Something is wrong</div>
									}}
									/>
                <Route exact path="/client" component={() => <Client user={this.state.user}/>} />
								<Route exact path="/client/:id" component={Detail} />
								<Route exact path="/search/:id" component={Detail} />
								<Route exact path="/search" component={() => <Search user={this.state.user}/>} />
								<Route exact path="/stylist" component={() => <Stylist user={this.state.user}/>} />
								<Route exact path="/stylist/:id" component={Detail} />
								<Route exact path="/calendar" component={() => <Calendar user={this.state.user}/>} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
				)}
        { !this.state.loggedIn && (
          <div className="auth-wrapper" style={{paddingTop:40}}>
            <Route exact path="/" component={() => <LoginForm login={this.login}/>} />
            <Route exact path="/signup" component={SignupForm} />
						<Route exact path="/client" component={() => <LoginForm user={this.login}/>} />
						<Route exact path="/stylist" component={() => <LoginForm user={this.login}/>} />
						<Route exact path="/search" component={() => <LoginForm user={this.login}/>} />
						<Route exact path="/calendar" component={() => <LoginForm user={this.login}/>} />
          </div>
        )}
			</div>
		)
	}
}

export default App;