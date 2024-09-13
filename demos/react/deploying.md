# Deploying the GitHub pages demo (for Qualified staff)

For using Qualified Embed in an actual project, these steps won't be necessary. This procedure is for Qualified staff who need to update our GitHub pages deploy.

```
npm run build
mv dist/index.html .
sed -i 's|src="bundle.js"|src="dist/bundle.js"|; s|href="bundle.css"|href="dist/bundle.css"|' index.html
git add dist index.html
git commit -m "Update the React demo"
git push
```

Feel free to checkout to a branch and do a PR in the above process if you wish.

The index is moved up a level so that the GitHub pages URL won't have `/dist` in it. This build doesn't happen often, so there's no script for a couple of the steps needed to move index.html up a level and remap its resource URLs.
