# Sassy Slides

Creates a slide deck for distribution - running off markdown. The main intention is for white-label company slide decks.


![](https://media.giphy.com/media/5VKbvrjxpVJCM/200w.webp)

_Think quicker sprint review presentation creation_

Uses a bunch of front end tools under the hood;

- nunchucks
- gulp
- sass
- auto-prefixer
- remarkjs

## To Run

Use [nvm] if node is not yet installed.

```sh
# Get the correct node version
nvm use

# Install dependencies
npm i

# Start Development
npm start

# Build Artifacts
npm run build

# Zip package Artifacts
npm run package
```

Add your assets as follows:

Type | Location
--- | ---
Slide | `./slides`
Image | `./public/images`

## Pro-tips

Function | key
--- | ---
Presenter mode | p
Presentation screen | c

<!-- MARKDOWN REFS -->

[nvm]: https://github.com/creationix/nvm
