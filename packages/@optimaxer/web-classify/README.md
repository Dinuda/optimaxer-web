# @optimaxer/web-classifier

## Overview

The `@optimaxer/web-classifier` library is a robust tool for classifying natural language texts into predefined categories, including sentiment analysis. It leverages advanced models to provide accurate and efficient classification.


## Installation

To install the library, run:

```bash
npm install @optimaxer/web-classifier
```


## Available Components

- `Classifier`: This component allows you to set up and classify user texts efficiently.


## Features

- **setup:** Initializes the classifier by configuring the Small Language Model and Browser Embedding Engine.
- **classify:** Classifying the given user command to predifined categories.


## Usage

Here's a basic example of how to use the Classifier component:

```javascript
import { Classifier } from '@optimaxer/web-classifier';

await classifier.value.setup('gemma', 'media-pipe');

const sentiment = await props.classifier.classify(feedback.feedback,'sentiment', ['positive', 'negative']);
```

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for any enhancements or bug fixes.


## License
This project is licensed under the MIT License.