<h1 align="center">
<img src="/assets/logo/WhatSupperLogo.svg" alt="WhatSupper" width="700">
</h1>

<h4 align="center">Unlock Savings on Every Plate</h4>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#members">Members</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#library-and-module-installations">Library and Module Installations</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#related">Related</a>
</p>

# Description

WhatSupper is an app that gets AI-generated recipes from flyers, plan meals effortlessly, and save money and time. Discover and share budget-friendly recipes to make life easier on your schedule and wallet. Currently not working due to no funds for openai.

# Members

[<img src="/assets/pfp/eric.svg" alt="Eric" width="170"/>](www.linkedin.com/in/eric-hs-qian) [<img src="/assets/pfp/jordan.svg" alt="Jordan" width="170"/>](https://www.linkedin.com/in/jordannguyenn) [<img src="/assets/pfp/mariela.png" alt="Mariela" width="170"/>](https://www.linkedin.com/in/marielapedrano) [<img src="/assets/pfp/rose.svg" alt="Rose" width="170"/>](https://www.linkedin.com/in/maryrose-nguyen/)

[<img src="/assets/pfp/thamasha.svg" alt="Thamasha" width="170"/>](www.linkedin.com/in/t-amara) [<img src="/assets/pfp/khalil.svg" alt="Khalil" width="170"/>](//www.linkedin.com/inronan-khalil-olaes/) [<img src="/assets/pfp/carolina.svg" alt="Carolina" width="170"/>](https://www.linkedin.com/in/carolinalxu/)

# Key Features

- AI–powered recipe generation from flyers by taking a picture
- Like and save recipe
- Customize recipe after taking a picture
  - Add ingredients
  - Delete ingredients
  - How many recipes you wanna do
- Dark/Light mode
- See scan history

# Library and Module Installations.

## Theme: Colors

- Library: colors
- Import: import { colors } from './theme';
- Example Usage: backgroundColor: colors.olivine;

## Installations

### Camera

- Library: expo-camera
- Installation:

```bash
npx expo install expo-camera
```

### Crop

- Libraries:

  - expo-permissions
  - expo-image-picker
  - expo-file-system
  - expo-image-manipulator
  - expo-image-crop

- Installations:

  ```bash
    npx expo install expo-permissions

    npx expo install expo-image-picker

    npx expo install expo-file-system

    npx expo install expo-image-manipulator

    npm install expo-image-crop
  ```

### Gluestack

- Libraries:

  - @gluestack-ui/themed
  - @gluestack-style/react
  - react-native-svg@13.4.0
  - @gluestack-ui/config

- Installations:

  ```bash
  npm i @gluestack-ui/themed @gluestack-style/react react-native-svg@13.4.0

  npm i @gluestack-ui/config@latest

  npx gluestack-ui-scripts eject-theme
  ```

### Fonts

- Libraries:
  - expo-font
  - @expo-google-fonts/manrope
- Installations:

  ```bash
  npx expo install expo-font

  npx expo install expo-font @expo-google-fonts/manrope

  npx expo install expo-splash-screen
  ```

### Animation

- Library:
  - react-native-reanimated
- Installation:

  ```bash
  npx expo install react-native-reanimated
  ```

### Theme

- Installation:

  ```bash
  npx expo config --type introspect
  ```

### Select List

- Library: react-native-dropdown-select-list
- Installation:

  ```bash
  npm install react-native-dropdown-select-list
  ```

### Firebase

- Libraries:

  - firebase
  - @react-native-async-storage/async-storage

- Installations:

  ```bash
  npm install firebase

  npm i @react-native-async-storage/async-storage
  ```

## How To Use

From your command line:

```bash
# Clone this repository
git clone https://github.com/ReallyNguyen/WhatSupper.git

# Go into the repository
cd WhatSupper

# Install dependencies
npm install

# Run the app on expo
npx expo start
```

## Related

- [whatsupper-blog](https://whatsupper-blog.vercel.app/) - WhatSupper Blog
- [whatsupper-supplement](https://whatsupper-supplement.vercel.app/) - WhatSupper Supplement
