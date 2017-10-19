# node-jwt-test

```sh
git clone https://github.com/samuelnovaes/node-jwt-test.git
cd node-jwt-test
npm install
npm start
```
# Users

- **login:** aaa, **password:** aaa
- **login:** bbb, **password:** bbb

# Routes (method route body headers)

- **method:** POST
- **url:** /login
- **body params:** login, password
---
- **method:** GET
- **url:** /user
- **headers:** x-access-token: "your token here"
