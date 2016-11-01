import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import '../assets/github.png'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  loginWithProvider(provider){
    const {actions} = this.props
    switch (provider) {
      case 'github':
        actions.signInWithGithub()
        break
      case 'google':
        actions.signInWithGoogle()
        break
    }
  }

  loginWithEmail(e){
    e.preventDefault()
    this.props.actions.signInWithEmail(this.state.email, this.state.password)
  }
  register(e) {
    e.preventDefault()
    this.props.actions.register(this.state.email, this.state.password)
  }

  handleResetPassword(){
    this.props.actions.resetPassword(this.state.email)
  }

    render() {
      const styles = StyleSheet.create({
        loginPage: {
          width: '460px',
          padding: '8% 0 0',
          margin: 'auto'
        },
        form: {
            position: 'relative',
            zIndex: 1,
            background: '#FFFFFF',
            maxWidth: '360px',
            margin: '0 auto 100px',
            padding: '45px',
            textAlign: 'center',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'

        },
        input: {
          outline: 0,
          background: '#f2f2f2',
          width: '100%',
          border: 0,
          margin: '0 0 15px',
          padding: '15px',
          boxSizing: 'border-box',
          fontSize: '14px'

        },
        button: {
          outline: 0,
          background: '#4CAF50',
          width: '100%',
          border: 0,
          padding: '15px',
          color: '#FFFFFF',
          fontSize: '14px',
          cursor: 'pointer',
          margin: '5px',
          marginTop: 20
        },
        register: {
          backgroundColor: 'grey'
        },
        loginWith: {
          display: 'flex',
          marginTop: '15px',
          fontWeight: 'bold',
          fontSize: '20px'
        },
        loginProvidersContainer: {
          display: 'flex',
          marginTop: '10px'
        },
        loginProvider: {
          margin: '5px',
          padding: '10px',
          backgroundColor: '#eeeeee',
          color: 'grey',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'

        },
        github: {
          backgroundColor: 'black',
          color: 'white',
          width: '100px'
        },
        error: {
          color: 'red',
          margin: '10px',
          padding: '5px',
          fontWeight: 'bold'
        },
        resetPassword: {
          display: 'flex',
          justifyContent: 'flex-end',
          textDecoration: 'underline',
          color: 'grey',
          fontSize: 14,
          cursor: 'pointer'
        }
      })
        return(
            this.props.main.connected?(<div className={css(styles.loginPage)}>
              <div className={css(styles.form)}>
                <form>
                  <input onChange={(e) => this.setState({email:e.target.value})} value={this.state.email} type="text" placeholder="email" className={css(styles.input)}/>
                  <input onChange={(e) => this.setState({password:e.target.value})} value={this.state.password} type="password" placeholder="password" className={css(styles.input)}/>
                  <div onClick={this.handleResetPassword.bind(this)} className={css(styles.resetPassword)}>Reset password</div>
                  <div style={{display:'flex', justifyContent: 'space-around'}}>
                    <button onClick={this.loginWithEmail.bind(this)} className={css(styles.button)}>LOGIN</button>
                    <button onClick={this.register.bind(this)} className={css([styles.button, styles.register])}>REGISTER</button>
                  </div>

                </form>
                <div>
                  <div className={css(styles.loginWith)}>Login with</div>
                  <div className={css(styles.loginProvidersContainer)}>
                    <div onClick={this.loginWithProvider.bind(this,'github')} className={css([styles.loginProvider, styles.github])}>
                      <img src='static//github.png' style={{width: '25px', height: '25px'}}/> Github
                    </div>
                    <div onClick={this.loginWithProvider.bind(this,'google')} className={css([styles.loginProvider])}>Google</div>
                  </div>
                </div>
              </div>
              </div>):null
    	)
    }
}

export default Login;
