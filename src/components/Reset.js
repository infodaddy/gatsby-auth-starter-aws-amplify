import React from "react"
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { setUser, isLoggedIn } from '../utils/auth'
import Error from './Error'
import { Auth } from 'aws-amplify'
//import { Link } from "react-router-dom";

class Reset extends React.Component {
  state = {
    username: ``,
    password: ``,
    error: ``
  }

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

    reset = async() => {
        var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId, // Your client id here
    };
	
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
    var userData = {
        Username : document.getElementById("inputUsername").value,
        Pool : userPool,
    };
	
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
		
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            console.log('call result: ' + result);
        },
        onFailure: function(err) {
            alert(err);
			console.log(err);
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ' ,'');
            var newPassword = prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
  }
  
  render() {
    if (isLoggedIn()) navigate('/app/profile')
    return (
      <div>
        <h1>Sign In</h1>
        {this.state.error && <Error errorMessage={this.state.error}/>}
        <div style={styles.formContainer}>
         <input
            onChange={this.handleUpdate}
            placeholder='Username'
            name='username'
            value={this.state.username}
            style={styles.input}
          />
          <input
            onChange={this.handleUpdate}
            placeholder='Password'
            name='password'
            value={this.state.password}
            type='password'
            style={styles.input}
          />
          <div style={styles.button} onClick={this.login}>
            <span style={styles.buttonText}>Sign In</span>
          </div>
        </div>
        <Link to="/app/signup">Sign Up</Link><br />
        <Link to="/login/reset">Forgot password?</Link><br />
        <button type="button" onclick="forgotpasswordbutton()">Forgot password button</button>
      </div>
    )
  }
}

const styles = {
  input: {
    height: 40, margin: '10px 0px', padding: 7
  },
  formContainer: {
    display: 'flex', flexDirection: 'column'
  },
  button: {
    backgroundColor: '#3b5998', padding: '15px 7px', cursor: 'pointer', textAlign: 'center', marginBottom: 10
  },
  buttonText: {
    color: 'white'
  }
}

export default Reset