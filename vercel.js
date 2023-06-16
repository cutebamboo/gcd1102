{
    "version": 2,
    "builds": [
      {
        "src": "./webapp2.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      
      {
        "src": "/(.*)",
        "dest": "/"
      }
    ]
  }