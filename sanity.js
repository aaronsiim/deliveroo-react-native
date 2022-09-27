import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    projectId: "0i4oe1ux",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// RUN THIS to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000
// OR
// Go to sanity.io and add manually on API section 

export default client;


// IF CHANGE IN BACKEND (sanity folder) then redeploy it
// npx sanity deploy
