# code-talks19

## Hosting the Shop

In order for the shop to work properly, you need to host the static files and backend code on a server that can execute the Node application.

This section describes how to deploy the files to you Baqend app that you can start here: dashboard.baqend.com

For hosting on Baqend the following steps are needed:
1. Upload all assets from the static folder to the `www` of your Baqend app.
2. Create Baqend modules with the name `talks` and `topProducts` and fill them with the code from the backend folder.
3. Visit `https://<yourAppName>.app.baqend.com/v1/code/talks` to see the landing page of the shop.
