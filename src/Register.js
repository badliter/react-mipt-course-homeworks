import React from "react";
import {register} from './service/auth';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        };
    }

    onClick = () => {
        console.log('[max_badanin] submit form');
        if (this.checkStateValues()) {
            console.log('[max_badanin] register on server');
            register(this.state)
                .then((data) => {
                    console.log('[max_badanin] data', data);
                    localStorage.setItem('AUTH', JSON.stringify(data));
                    this.props.auth(data);
                })
                .catch(error => {
                    console.log('[max_badanin] error', error);
                })
        }
    };

    checkStateValues = () => {
        console.log('[max_badanin] check state values');
        if (this.state.name === "") {
            console.log('[max_badanin] try again, name is empty');
            return false;
        }
        if (!this.state.email.includes("@")) {
            console.log('[max_badanin] try again, email is incorrect');
            return false;
        }
        if (this.state.password === "") {
            console.log('[max_badanin] try again, password is empty');
            return false;
        }
        if (this.state.password !== this.state.repeatPassword) {
            console.log('[max_badanin] try again, passwords do not match');
            return false;
        }
        console.log('[max_badanin] all state values are ok');
        return true;
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        console.log('[max_badanin] this.props', this.props);
        return (
            <div>
                <div>
                    <span>
                        Name
                    </span>
                    <input name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <div>
                    <span>
                        Email
                    </span>
                    <input name="email" value={this.state.email} onChange={this.onChange}/>
                </div>
                <div>
                    <span>
                        Password
                    </span>
                    <input name="password" value={this.state.password} onChange={this.onChange}/>
                </div>
                <div>
                    <span>
                        RepeatPassword
                    </span>
                    <input name="repeatPassword" value={this.state.repeatPassword} onChange={this.onChange}/>
                </div>
                <button onClick={this.onClick}>Click me</button>
            </div>
        );
    }
}
