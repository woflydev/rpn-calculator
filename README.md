# BRUH - A Bad Reverse Polish Notation Calculator
In case you were wondering, BRUH stands for Bad RPN Utility without Heaps. ``engine/`` does not run with the website.

ZIP file codebase does not include Firebase deployment configuration. Please use the GitHub repository for the full codebase and consult the [Firebase CLI Documentation](https://firebase.google.com/docs/cli) for further informatio on custom deployment.

In order to deploy, ensure that Firebase is installed by running:

```
npm install -g firebase-tools
```

Then, run:

```
firebase login
```

To initialize the repository with your own cloud project, run:

```
firebase init
```

Finally, run the script to copy over required files to the ``public`` directory for deployment:

```
./deploy.bat
```

Have fun and happy RPN calculating!