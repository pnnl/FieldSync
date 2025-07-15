# FieldSync

FieldSync is the base repository used for building and customizing data collection workflows for the [Quality Install Tool (QI Tool)](https://github.com/pnnl/Quality-Install-Tool). It supports MDX-based workflow templates and local data storage through PouchDB. This repository is configured for GitHub Pages deployment, and you're welcome to fork it for reuse or customization.

---

## App Startup Overview

1. The server serves the Webpack-built `index.html` for any route.
2. `index.html` loads global styles from `index.css` and `App.css`.
3. `App.js` mounts the root-level React component `<App />`.
4. `App.tsx` defines the app's route configuration using React Router.
5. Routes like `/app/<database name>/:docId` use the `MdxTemplateView` to render templates from `src/templates`, mapped via `templates_config.ts`.

---

## Installation Instructions

Use the following command to install dependencies:

```bash
yarn install --frozen-lockfile
```

This ensures package versions are not updated unexpectedly.

---

## Development Server

To run the development server:

```bash
yarn start
```

- Launches on `http://localhost:3000`
- Automatically reloads on changes inside `src/`
- To reflect changes in `public/` or `config/`, restart the dev server

---

## Production Build

To create a production build:

```bash
yarn build
```

To serve the static build locally:

```bash
npx http-server-spa ./build
```

- This serves on `http://localhost:8080`
- Supports client-side routing via SPA fallback to `index.html`

---

## Linting and Formatting

- Run `yarn lint` to check for formatting issues
- Run `yarn lint:fix` to auto-fix common issues

---

## Creating a New Workflow Template

### 1. Add a New `.mdx` Template

Create a file in:

```
src/templates/<TEMPLATE_NAME>.mdx
```

Use `Tabs` and `Tab` components to organize content. For example:

```jsx
<Tabs>
  <Tab eventKey="Project" title="Project">
    <ProjectInfoInputs {...props} />
  </Tab>
  <Tab eventKey="Assessment" title="Assessment">
    ## Assessment Heading
  </Tab>
  <Tab eventKey="Report" title="Report">
    <PrintSection>
      Printable content here
    </PrintSection>
  </Tab>
</Tabs>
```

### 2. Register Template in `index.ts`

In `src/templates/index.ts`:

```ts
import MyTemplate from './my_template.mdx';

export const templates = {
  my_template: {
    title: 'My Custom Template',
    template: MyTemplate,
  },
  // ...other templates
};
```

---

## Data Storage

FieldSync uses [PouchDB](https://pouchdb.com/guides/databases.html) for local storage on the client's browser (backed by IndexedDB). Data may be lost if the browser cache is cleared.

---

## MDX Components Reference

Templates automatically import reusable components via the `MdxWrapper`. Below are the available components:

### Form Input Components

- **StringInput / TextInput**
```jsx
<StringInput label="Name" path="document.name" hint="Enter full name" />
<TextInput label="Notes" path="document.notes" multiline />
```

- **NumberInput**
```jsx
<NumberInput label="Label" min={0} max={100} path="document.value" />
```

- **DateInput**
```jsx
<DateInput label="Label" path="document.date" />
```

- **Select**
```jsx
<Select label="Choose option" options={["A", "B"]} path="document.choice" />
```

- **Checkbox**
```jsx
<Checkbox label="Enable feature" path="document.enabled" />
```

- **Radio**
```jsx
<Radio label="Options" options={["Yes", "No"]} path="document.choice" />
```

- **USStateSelect**
```jsx
<USStateSelect label="State" path="document.state" />
```

- **ClimateZoneSelect**
```jsx
<ClimateZoneSelect label="Climate Zone" path="document.zone" />
```

### File and Media Components

- **FileInput**
```jsx
<FileInput id="file-id" label="Attach PDF">Upload supporting document</FileInput>
```

- **PhotoInput**
```jsx
<PhotoInput id="photo-id" label="Upload Photo" uploadable>Photo description</PhotoInput>
```

- **Photo** (for displaying)
```jsx
<Photo id="photo-id" label="Installed Unit" required>Before installation</Photo>
```

- **PDFRenderer**
```jsx
<PDFRenderer id="pdf-id" label="Document Viewer" />
```

### Layout and Structure Components

- **Collapsible**
```jsx
<Collapsible header="Section Title">Content</Collapsible>
```

- **CollapsibleText**
```jsx
<CollapsibleText header="Details">Expandable text content</CollapsibleText>
```

- **CollapsibleTextContainer**
```jsx
<CollapsibleTextContainer>
  <CollapsibleText header="Section 1">Content 1</CollapsibleText>
  <CollapsibleText header="Section 2">Content 2</CollapsibleText>
</CollapsibleTextContainer>
```

- **PrintSection**
```jsx
<PrintSection label="Print Report">Report Content</PrintSection>
```

- **PageBreak**
```jsx
<PageBreak />
```

- **ShowOrHide**
```jsx
<ShowOrHide show={condition}>Conditional content</ShowOrHide>
```

- **Repeatable**
```jsx
<Repeatable path="document.items">
  {(itemPath) => (
    <StringInput label="Item" path={`${itemPath}.name`} />
  )}
</Repeatable>
```

- **Table**
```jsx
<Table headers={["Name", "Value"]} rows={data} />
```

### Data Display Components

- **LabelValue**
```jsx
<LabelValue label="Field" value="Content" />
```

- **DateStr**
```jsx
<DateStr date={timestamp} />
```

- **DateTimeStr**
```jsx
<DateTimeStr datetime={timestamp} />
```

- **LocationStr**
```jsx
<LocationStr location={locationObject} />
```

- **GPSCoordStr**
```jsx
<GPSCoordStr coordinates={coordinatesObject} />
```

- **Figure**
```jsx
<Figure caption="Image description">
  <img src="path/to/image.jpg" alt="Description" />
</Figure>
```

### Project Components

- **ProjectInfoInputs**
```jsx
<ProjectInfoInputs {...props} />
```

- **InstallationSelect**
```jsx
<InstallationSelect label="Select Installation" path="document.installation" />
```

---

## Component Props

Most components support these common props:
- `label`: Display label for the component
- `path`: Data path for form inputs (e.g., "document.fieldName")
- `hint`: Helper text shown below the component
- `required`: Whether the field is required
- `disabled`: Whether the component is disabled
- `className`: Custom CSS classes
- `id`: Unique identifier (required for file/photo components)

---

## Notes

- The MDX system allows combining Markdown content with React components
- All inputs automatically sync with PouchDB through the document path
- File and photo components use `id`-based referencing for local storage
- Use `PrintSection` to mark content for PDF generation
- The `Repeatable` component helps create dynamic form arrays
- Wrapper components (e.g., `select_wrapper.tsx`) provide additional functionality to base components

---

For more information, see:
- MDX documentation: [https://mdxjs.com](https://mdxjs.com)
- PouchDB documentation: [https://pouchdb.com/guides/](https://pouchdb.com/guides/)

To contribute or customize this tool, fork this repo and deploy using GitHub Pages or your preferred static hosting.
