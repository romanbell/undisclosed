import React, { Component } from 'react';
import cookieMonster from '../cookieMonster.jpg';

const ENTER_KEY = 13; 

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    
        this.state = {
            emailVisible: true,
            emailSubmitted: false
        };
    }

    async componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.keyCode === ENTER_KEY) {
            // console.log("enter key pressed, submit email")
            let email_addy = this.getInputValue();
            // console.log(email_addy);
            this.push_email_address_to_db(email_addy)
            document.getElementById("emailInput").value = "";
        }
    }

    async push_email_address_to_db(email_address) {
        if (email_address !== "") {
            // console.log("pushing email to db");
            // console.log(email_address);

            
            var urlencoded = new URLSearchParams();
            urlencoded.append("email", email_address);

            let today = new Date().toISOString().slice(0, 10);
            urlencoded.append("dateAdded", today);

            var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
            };

            const response = await fetch("http://www.undisclosedmedia.xyz/api/v1/emailSubmission", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            if (response !== null) {
                console.log(response)
            }

        }
        else {
            console.log(email_address)
        }
    }

    getInputValue() {
        let inputValue = document.getElementById("emailInput").value; 
        return inputValue
    }

    render() {
        return(
        <div className='Footer'>
            <div className = 'FooterTextBox'>
                <p>For educational purposes only. This platform was created solely for shits & giggles providing no tangible value or legitimate offerings. Mostly just trying to test out some coding stuff and maybe make something cool in the process. Hopefully you find this at least mildly interesting, if not, oh well... be a good person. <a href='https://www.romanbellisari.com' rel="author">-RB</a></p>
            </div>
            <br></br>
                <ul className = 'EmailBox'>
                    <div className = 'CookieMonsterWrapper'>
                        <li>
                            <img src={cookieMonster} className='CookieMonster' alt='Cookie Monster'></img>
                            <input id="emailInput" type="email" name="email" pattern=".+@globex\.com" size="30" onKeyDown = {(e) => this.handleKeyDown(e)}></input>
                        </li>                    
                    </div>
                    <div className = 'EmailSubmissionTextWrapper'>
                        <li>
                            <p className = 'EmailSubmissionText'>The cookie monster that lives here survives on a strict diet of email addresses, please feed him so he doesn't go hungry. </p>
                        </li>
                    </div>
                </ul>
            {/* </div> */}
        </div>
        );
    }
}
