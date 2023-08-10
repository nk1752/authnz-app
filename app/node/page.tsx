import Link from 'next/link'
import * as msal from '@azure/msal-node'

const clientConfig = {
    auth: {
        clientId: "ddec4f98-52aa-40b2-801e-31531e319288",
        authority: "https://login.microsoftonline.com/7cb752a7-6dfd-429e-adc9-129f0ea3fcec",
        clientSecret: "xgl8Q~5E~Ydx7gthhv9NL0te0Cm6vVJ-Ip-sea32",
        redirectUri: 'http://localhost:3000',
    }
};
const pca = new msal.ConfidentialClientApplication(clientConfig);

const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
    redirectUri: 'http://localhost:3000',
};

pca.acquireTokenByClientCredential(tokenRequest).then((response) => {
    console.log("\nResponse: \n:", response);
}).catch((error) => {
    console.log(error);
});

export default function NodePage() {
    return (
        <div>
            <h1>Home</h1>
            <Link href="/react"> React Page</Link>
            <Link href="/node"> Node Page</Link>
        </div>
    )
}