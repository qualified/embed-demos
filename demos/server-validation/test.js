// This is a simple test script to run Playwright without a browser

require("util").inspect.defaultOptions.depth = null;

const code = `const sayHello = name =>
  name ? \`Hello, \${name}!\` : "Hello there!";
`;

fetch("http://localhost:3003/submit", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ fileContents: { code } }),
})
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
