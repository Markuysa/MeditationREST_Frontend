import React from "react";
import classes from "./BlackButton_styles.module.css"
import { useState } from "react";
import { redirect, useNavigate } from 'react-router-dom';

const RegisterButton = ({ children, ...props  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = (e) => {
      const usernameField = document.querySelector('input[name=username]');
      const passwordField = document.querySelector('input[name=password]');
      const emailField = document.querySelector('input[name=email]');
      e.preventDefault();
      const username =  usernameField.value;
      const password = passwordField.value;
      const role = "user"
      const email = emailField.value
      const userData = { 
        username: username, 
        password: password, 
        email: email,
        role: [role],
      };
      const userDataJson = JSON.stringify(userData);
      setIsLoading(true);
      fetch(`http://localhost:8080/api/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },  
        body:userDataJson
      })
        .then((response) => {
          setIsLoading(false)
          switch (response.status){
            case 200: {
              window.location.replace("http://localhost:3000/login") 
              break;
            }
            case 400: {
              usernameField.value = ""
              passwordField.value = ""
              emailField.value = ""
              alert("User with that email/username already exists")
              break;
            }
            default: {
              window.location.replace("http://localhost:3000/errorPage")
              break;
            }
          }

        })
    }
    return (
      <button
        className={classes.button}
        type="submit"
        {...props}
        disabled={isLoading}
        onClick={handleClick}
      >
        {isLoading ? "Идет загрузка..." : children}
      </button>
    );
}

export default RegisterButton;