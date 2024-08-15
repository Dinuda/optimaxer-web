# @optimaxer/web-forms

Welcome to **@optimaxer/web-forms**, a powerful library designed to simplify and enhance form-filling processes in your web applications. This library utilizes advanced in-browser technology to auto-fill forms based on text data, reducing repetitive tasks and optimizing user workflows. By leveraging a small language model and a dedicated data injection engine, **@optimaxer/web-forms** ensures seamless integration and improved user experience without the need for a dedicated server.

## Overview

**@optimaxer/web-forms** is built with efficiency in mind, offering the following key features:

- **In-Browser Processing:** Utilizes a small language model running directly in the user's browser for entity extraction, eliminating the need for server-side processing and reducing latency.
- **Flexible Data Injection:** Transforms extracted data into the required format for your forms, ensuring compatibility with various UI frameworks and libraries.
- **Easy Integration:** Designed to work seamlessly with any front-end technology, providing a smooth setup and usage experience.
- **Improved User Experience:** Automates the form-filling process to save time and reduce manual data entry errors, leading to a more efficient workflow.

## Quickstart

### Getting Started with web-forms Library

Getting started with the **@optimaxer/web-forms** library is straightforward. Follow these steps to integrate and utilize the library in your web application effectively.

#### Step 1: Install the Library

To begin using **@optimaxer/web-forms**, you'll first need to install it in your project. You can do this using npm. Open your terminal and run the following command:

```bash
npm install @optimaxer/web-forms
```
This command will add the library to your project's dependencies.

#### Step 2: Setting Up the Web-Forms

Once the library is installed, you need to set up the FormEngine component. 
This step involves initializing the form engine with the appropriate configurations, including the Small Language Model and Browser Embedding Engine.

Here’s how to do it:

 1. Import the `FormEngine` component:
    ```javascript
    import { FormEngine } from '@optimaxer/web-forms';
    ```
2. Create an instance of the `FormEngine`:
    ```javascript
    const formEngine = new FormEngine();
    ```
3. Configure the `FormEngine`:
        You need to specify the model and engine for the form. For example, if you are using 'gemma' as your model and 'media-pipe' as your embedding engine, you can set it up like this:
    ```javascript
    await formEngine.setup('gemma', 'media-pipe');
    ```

### Step 3: Extract the Data for the Web-Form

Prepare a JSON schema representing the form fields you want to auto-fill. Use the extract method to obtain the necessary data:

```javascript
// Define your form schema here, according to your requirement
const formSchema = {
    firstName: '',
    lastName:''
    address:'',
};

const extractedData: any = await formEngine.extract(formSchema);

```

Note:
When providing the form schema for data extraction, ensure that you use a JSON object where the keys correspond to the form fields, and the values are empty strings. This setup helps in defining the structure of the form and the fields to be populated.

Additional Information:
To improve the accuracy of data extraction, use meaningful names for the keys in your form schema object. Descriptive names help the model understand the context and extract relevant data more precisely.


#### Step 4: Fill the Form using the Extracted Data

After extracting the data using **@optimaxer/web-forms**, the next step is to populate your form fields with this data. How you accomplish this will depend on the specific UI framework or library you're using, but the general process is similar across different environments.

If you’re developing an application without using any specific UI framework, you’ll need to manipulate the DOM directly. Here’s how you can achieve this:

1. ***Identify Form Elements:*** Ensure each form field has a unique `id` or `name` attribute that you can use to target them.

2. ***Populate Fields***: Use JavaScript to select the form elements and set their values based on the extracted data.

Here’s a basic example:

```html
<!-- Example Form -->
<form id="myForm">
  <input id="name" type="text" placeholder="Name" />
  <input id="email" type="email" placeholder="Email" />
  <!-- More fields as needed -->
  <button type="submit">Submit</button>
  <button type="button" id="smartPasteButton">Smart Paste</button>
</form>

<script>
  import { FormEngine } from '@optimaxer/web-forms';

  // Initialize FormEngine
  const formEngine = new FormEngine();
  await formEngine.value.setup('gemma', 'media-pipe');

   // Function to handle smart paste
  async function handleSmartPaste() {
    // Define your form schema here
    const formSchema = {
      name: '',
      email: '',
      // Other fields as needed
    };
    
    // Extract data using FormEngine
    const extractedData = await formEngine.extract(formSchema);
    // Fill the form with the extracted data
    fillForm(extractedData.result);
  }

  // Function to fill the form
  function fillForm(data) {
    document.getElementById('name').value = data.name || '';
    document.getElementById('email').value = data.email || '';
    // Set values for other fields as needed
  }

  document.getElementById('smartPasteButton').addEventListener('click', handleSmartPaste);
</script>
```

By following the above steps and integrating the @optimaxer/web-forms, you can streamline your form-filling processes and provide a better user experience by leveraging cutting-edge technology right in the browser.

