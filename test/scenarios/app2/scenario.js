module.exports = {
  name: "Automatic detection.",
  run: [
    {
      name: "Run npm from .",
      pwd: "app",
      run: "npm start",
    },
    {
      name: "Run from .",
      pwd: "app",
      run: "node app.js",
    },
    {
      name: "Run from ..",
      pwd: ".",
      run: "node app",
    },
    {
      name: "Run from bin",
      pwd: "app/bin",
      run: "node app",
    },
    {
      name: "Run bin from .",
      pwd: "app",
      run: "node bin/app.js",
    },
    {
      name: "Run bin from ..",
      pwd: ".",
      run: "node app/bin/app.js",
    },
    {
      name: "Run bin from bin",
      pwd: "app/bin",
      run: "node app.js",
    },
  ]
};
