import React, { Component } from 'react';

export default class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseURL: this.props.baseURL,
        };
    }
 

    async componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    async push_contact_message_to_db() {
        let message = this.getTextInput();
        let contactEmail = this.getEmailInput(); 
        // console.log(message)
        // console.log(contactEmail)
        if (message !== "" && contactEmail !== "") {
            // console.log('pushing message to db')
            // console.log(message)


            var urlencoded = new URLSearchParams();
            urlencoded.append("message", message);
            urlencoded.append("email", contactEmail);
            let today = new Date().toISOString().slice(0, 10);
            urlencoded.append("dateAdded", today);

            var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
            };

            const response = await fetch(this.state.baseURL + "/api/v1/messagesubmission", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            if (response !== null) {
                console.log(response)
            }

            document.getElementById('contactMessageInput').style.borderColor = 'black';
            document.getElementById('contactEmailSubmissionInput').style.borderColor = 'black';
            document.getElementById("contactMessageInput").value = "";
            document.getElementById('contactEmailSubmissionInput').value = "";
        }

        else {
            if (message !== "") {
                // Highlight text box if user tries to submit empty message
                let text_box = document.getElementById("contactMessageInput");
                text_box.style.borderColor = 'red';
            }
            else if (contactEmail !== "") {
                // Highlight email box if user tries to submit message with no email
                let email_box = document.getElementById("contactEmailSubmissionInput");
                email_box.style.borderColor = 'red';
            }
            else {
                // Highlight both
                let text_box = document.getElementById("contactMessageInput");
                text_box.style.borderColor = 'red';

                let email_box = document.getElementById("contactEmailSubmissionInput");
                email_box.style.borderColor = 'red';
            }
        }

    }

    getTextInput() {
        let inputValue = document.getElementById("contactMessageInput").value; 
        return inputValue
    }

    getEmailInput() {
        let inputValue = document.getElementById("contactEmailSubmissionInput").value; 
        return inputValue
    }
   
    render() {
        return(
            <div className="contactWrapper">
                <div className="subheadingWrapper">
                    <div className="subheadingTitle">
                        <p>Contact</p>
                    </div>
                    <div className="subheadingCaption">
                        <p>Send a love letter (or hate letter)</p> 
                        <br></br>
                    </div>
                </div>

                <div className="contactBoxWrapper">
                    <textarea id="contactMessageInput" type="text" name="forum"></textarea>
                </div>

                <div className='photoButtonsWrapper'>
                    <div className="contactSubmitButton">
                        <button onClick={() => this.push_contact_message_to_db()}> Submit </button>
                    </div>
                    <div className="contactEmailSubmissionWrapper">
                        <input id='contactEmailSubmissionInput' type="email" name="email" pattern=".+@globex\.com" size="30" placeholder='email'></input>
                    </div>
                </div>

            </div>
        );
    }
}
