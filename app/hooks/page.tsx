'use client'

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'

import { PublicClientApplication, Configuration, InteractionStatus } from '@azure/msal-browser'
import { useState, useEffect } from 'react'



// MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: 'ddec4f98-52aa-40b2-801e-31531e319288',
    authority: 'https://login.microsoftonline.com/7cb752a7-6dfd-429e-adc9-129f0ea3fcec',
    redirectUri: 'http://localhost:3000',
  },
};

const pca = new PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ['User.Read']
};

function handleProfile() {
    
    const account = pca.getAllAccounts()[0];

    console.log('*** handleProfile ***');
    console.log('account: ', account);
    console.log('username: ',account.username);
    console.log('name: ',account.name);
    console.log('idTokenClaims: ', account.idTokenClaims);   
        
}

// get token silently
function getTokenSilently() {
    
    const account = pca.getAllAccounts()[0];
    
    const tokenRequest = {
        scopes: ['User.Read'],
        account: account
    };
    pca.acquireTokenSilent(tokenRequest).then((response) => {
        console.log('*** getTokenSilently ***');
        console.log('response: ', response);
        console.log('response.idTokenClaims: ', response.idTokenClaims);
        console.log('response.accessToken: ', response.accessToken);
        console.log('response.scopes', response.scopes);
        console.log(response.scopes[2]);
       
    }).catch((error) => {
        console.log(error);
    });

    const loginRequest = {
        scopes: ['User.Read']
      };
}


export default function HooksPage() {
    const { instance, accounts, inProgress } = useMsal();

    if (accounts.length > 0) {
        console.log('accounts: ', accounts);
        return <span>There are currently {accounts.length} users signed in!</span>
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return (
          <>
            <span>There are currently no users signed in!</span><br />
            <button onClick={() => instance.loginPopup(loginRequest)}>Login</button>
          </>  
        ) 
    }
}