# Puntopia

[![Live version Here](https://img.shields.io/badge/Live%20version-Here-blue.svg)](https://puntopia.vercel.app/)

Puntopia is an open-source community sharing tool designed to discover, create, and share funny puns!

The app provides the following features:
- Users need to sign up with Google Auth0 to post puns (this allows us to track who did what).
- CRUD operations for puns.
- Search puns based on tags, users, and text within puns.
- View other user profiles.
- Store and load data from a MongoDB database.

# Becode requirement

- Repository: `advanced-react`
- Mode: `solo`
- Type of Challenge: `consolidation`
- Duration: `4+1 days`
- Deployment: `Github pages` or `Netlify`

## Intro

The project assumes familiarity with using React hooks, creating JSX components, routing between components, and passing information through them.

Now, we can utilize this newfound knowledge to have some fun!

## Instructions

You will have one week to complete this project.

You are free to choose your own topic for the project, but please spend no more than an hour deciding on a topic!

**All topics should meet the following requirements.**

### Requirements

- Use a router.
- Include multiple pages/components.
- Implement data updating on change/filter.
- Load data on page load.
- Install and use at least one package/library.
- Pass props through components.

# What Puntopia Offers

## Next.js

For this assignment, Next.js was chosen over pure React. The reasons for this decision are as follows:

- Next.js provides an easier and simpler routing system, including support for dynamic routes.
- Next.js allows interaction with databases, enabling the development of full-stack applications instead of just front-end apps.
- Next.js offers flexibility in router management based on the method used from a URL.
- React's official documentation recommends using frameworks to build React apps.
- By default, Next.js works on the server side, and if a client-sided component is required, the first line of the component should include the code "use client." [More info here](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components)

## Other Technologies Used

- MongoDB
- Tailwind CSS
- Google Auth0
- bcrypt

## Files Structure

<details>
<summary>Click here to see the picture of the file structure</summary>
 
![Preview of the file structure](./ReadmeFiles/fileStructure.png)
</details>

The main application is located in the `app` folder. In Next.js, the base layout and page correspond to the application's index.

### Next.js Routing System

Every folder inside the `app` folder is considered a route. For example, a `profile` folder with a `page.jsx` inside it would correspond to the following route:

```
http://mysite.com/profile
```

For dynamic routes, create an inside folder with the name of the dynamic parameter enclosed in square brackets. In this case, clicking on a user's email allows you to navigate to their profile and view their posts.

The folder structure for this would be:

```
app
└── profile
    ├── [id]
    │   └── page.jsx
    └── page.jsx
```

The code for the link would look like this:

```jsx
<Link
  href={
    post.creator._id === session?.user.id
      ? "/profile"
      : `/profile/${post.creator._id}?name=${post.creator.username}`
  }
>
  {post.creator.username}
</Link>
```
<details> 
<summary> Let's breakdown this link together 😁</summary>

- `<Link`: This is the start of a Next.js `Link` component, which is used for client-side navigation in Next.js applications. It renders an anchor tag (`<a>`) and handles the navigation internally without a full page reload.

- `href={...}`: This is an attribute of the `Link` component. It determines the destination URL that the link will navigate to. In this case, it uses a JavaScript expression as the value.

- `post.creator._id === session?.user.id`: This is a conditional expression that checks if the `_id` property of `post.creator` is equal to the `id` property of `session?.user`. The `?.` is an optional chaining operator that prevents an error if `session` or `session.user` is null or undefined.

- `? "/profile" : /profile/${post.creator._id}?name=${post.creator.username}`: This is a ternary operator. If the condition is true (`post.creator._id === session?.user.id`), it sets the href value to `"/profile"`. If the condition is false, it sets the href value to `/profile/${post.creator._id}?name=${post.creator.username}`. This conditionally generates the correct URL for the link based on the comparison.

- `{post.creator.username}`: This is the content of the `Link` component. It will display the `username` property of `post.creator` as the visible text of the link.

- `</Link>`: This is the closing tag of the `Link` component.

Overall, this code snippet is generating a link to a user's profile page. If the `_id` of the `post.creator` matches the `id` of the `session.user`, the link will navigate to "/profile". Otherwise, it will navigate to "/profile/{post.creator._id}?name={post.creator.username}". The `post.creator.username` is displayed as the visible text of the link.

</details> <br><br>

### The API Folder

This folder contains the router and logic for authentication. [See documentation here](https://next-auth.js.org/)

In the API folder, you'll find the router and logic for authentication using Next.js' API routes. The authentication logic is implemented using the NextAuth.js library, which simplifies the authentication process. You can refer to the documentation for more information on how to configure NextAuth.js for your project.

Within the **Pun** folder, you'll find the logic and router for interacting with the database. To facilitate this interaction, the project utilizes Mongoose, an Object Data Modeling (ODM) library for MongoDB.

- First, the connection logic is imported from the utils folder.
- Then, the Pun model is imported, which defines the schema for storing puns in MongoDB.
- Inside the Pun folder, there is a function with the necessary methods to interact with the database. It follows a try-catch structure to handle any errors that may occur during the interaction.

### The Component Folder

The Component folder contains reusable React components such as Navbar, Form, Profile, Puncard, Feed, and Providers. These components are utilized throughout the application to create a consistent UI and provide necessary functionality.

### The Model Folder

The Model folder contains the Mongoose schemas for the application. In this case, there are two models: Pun and User.

#### The Pun Model

The Pun model schema includes a field named `creator` that represents a reference to a User model. This establishes a one-to-many relationship between the Pun model and the User model.

The `creator` field is of type `Schema.Types.ObjectId` and uses the `ref` property to reference the "User" model. This means that each Pun document will have a reference to the corresponding User document as its creator.

With this setup, multiple Pun documents can reference the same User document, creating a one-to-many relationship where one user can be associated with multiple puns.

It's important to note that the code snippet only represents the schema definition and the association between the Pun and User models. The actual relationship between the models will be established when creating and saving the documents using Mongoose.

<details>
<summary>Click here to see the code</summary>

```js
import  {Schema, model, models} from "mongoose";

const PunSchema = new Schema({
//this is here that the relation is created
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
//the text of the pun is required and have a String property
  pun: {
    type: String,
    required: [true, "Pun is required"],
  },
//same for the tag
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});
const Pun = models.Pun ||  model('Pun', PunSchema);
export default Pun;
```

Let's breakdown the last line of code

```js
const Pun = models.Pun ||  model('Pun', PunSchema);
```

- models.Pun: This part checks if there is already a model named "Pun" defined. The models object represents all the models registered with Mongoose. It looks for an existing model named "Pun" using models.Pun.

- model('Pun', PunSchema): If there is no existing model named "Pun", this part creates a new model using the Mongoose model function. It takes two parameters: the name of the model ("Pun" in this case) and the PunSchema defined earlier. This creates a new Mongoose model with the name "Pun" and the provided schema.

- Pun = models.Pun || model('Pun', PunSchema): The result of this line is assigned to the variable Pun. It either assigns the existing "Pun" model from models.Pun if it exists, or assigns the newly created model using model('Pun', PunSchema) if there is no existing model named "Pun". This ensures that the Pun variable holds a reference to the "Pun" model, whether it already exists or is newly created.

- Overall, this line ensures that the Pun variable holds the Mongoose model for the "Pun" schema, regardless of whether it was previously defined or needs to be created.

</details>

Similar to the Pun model, the User model is defined with its own schema to store user-related information.

### Extra Info

The project includes an `.env.example` file to provide the basic structure for the environment file. It's recommended to create an actual `.env` file based on the example and populate it with the required credentials and configuration specific to your project.

To ensure that the authentication works properly, you need to specify a Callback URI. This URI can be configured in the credentials of your OAuth client on the [Google Cloud Console](https://console.cloud.google.com/apis/credentials/oauthclient/).

![URI Config](./ReadmeFiles/uriConfig.png)

Thank you for taking the time to read this, and enjoy exploring Puntopia!
