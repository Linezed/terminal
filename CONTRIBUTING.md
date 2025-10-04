<div align="center">
    <img src="https://assets.linezed.dev/logo-stripped.png" alt="Linezed" height="40" />
    <h2>Linezed</h2>
    <p>Empowering the Web with modern technologies.</p>
    <hr>
</div>

### Welcome!

In this file, you will find guidelines and best practices for contributing to the `@linezed/terminal` project. We welcome contributions from the community to help improve and enhance this project.
Please read through the following sections to understand how you can contribute effectively.

---

### How to Contribute

1. **Reporting Issues**: If you encounter any bugs or have suggestions for new features, please open an issue on our [GitHub Issues page](https://github.com/linezed/terminal/issues). Provide as much detail as possible to help us understand and address the issue.
2. **Submitting Pull Requests**: If you would like to contribute code, please fork the repository and create a new branch for your changes. Once you have made your changes, submit a pull request with a clear description of what you have done.
3. **Code Reviews**: All pull requests will be reviewed by the maintainers. Please be patient while we review your changes. We may request changes or provide feedback to help improve your contribution
4. **Coding Standards**: Please follow the existing coding style and conventions used in the project. This includes using meaningful variable names, writing clear and concise comments, and adhering to the project's formatting guidelines.

---

### Code Style

We follow a specific code style to maintain consistency across the codebase. Please refer to the [STYLE_GUIDE.md](STYLE_GUIDE.md) file for detailed information on our coding standards and best practices.
Please, read [STYLE_GUIDE.md](STYLE_GUIDE.md) before submitting any code contributions.

---

### Testing

All features and bug fixes should include appropriate tests to ensure the stability and reliability of the project.
We use [uvu](https://github.com/lukeed/uvu) as our testing framework. Please refer to the existing tests in the `tests`
directory for examples of how to write tests for your contributions.

To run tests, use the following command:

```bash
npm test
```

All files inside the `tests` directory are considered test files and will be executed when running the test command,
you do not have to include the test files in any other way.

---

### Documentation

All features and changes should be documented to help users understand how to use them.
Please update the documentation in the `docs` directory as needed to reflect your changes.

**Structure of the Documentation**

We use VitePress for our documentation site. The main entry point for the documentation is the `docs/index.md` file.

The documentation structure is organized into sections, each represented by a folder inside the `docs/contents` directory.
Each section can contain multiple subdirectories with their own `index.md` files and additional metadata files.

**Visual representation of the documentation structure:**

```text
docs/
├── index.md                    # Main entry point for the documentation
└── contents/                   # Directory containing documentation sections
    ├── basics/                 # Section folder
    │   ├── getting-started     # Subdirectory with its own index.md
    │   │   ├── index.md        # Documentation page for getting started
    │   │   └── metadata.json   # Metadata file for the page title
    │   ├── installation/       # Another subdirectory
    │   │   ├── index.md        # Documentation page for installation
    │   │   └── metadata.json   # Metadata file for the page title
    │   └── metadata.json       # Metadata file for the section title
    └── advanced/               # Another section folder
        ├── customization/      # Subdirectory
        │   ├── index.md        # Documentation page for customization
        │   └── metadata.json   # Metadata file for the page title
        └── metadata.json       # Metadata file for the section title
```

**Metadata Files**

Each folder representing a section or subdirectory should contain a `title.txt` file.
This file should contain a single line with the title of that section or page.

**Example of a `metadata.json` file:**

```json
{
    "title": "Getting Started",
    "priority": 1
}
```

The `priority` field is optional and can be used to control the order
of the sections or pages in the navigation menu.

The allowed priority values are:
- `0`: Highest priority, appears first
- `1`: High priority
- `2`: Medium priority
- `3`: Low priority
- `4`: Lowest priority, appears last 

If no priority is specified, it defaults to `3`.

**Adding New Documentation Pages**

To add a new documentation page, create a new folder inside the `docs/contents` directory (or an existing section folder).
Inside this folder, create an `index.md` file for the content of the page and a `metadata.json` file for the title.

**Example of adding a new page with a shell command:**

```bash
mkdir -p docs/contents/basics/new-feature
echo "# New Feature" > docs/contents/basics/new-feature/index.md
echo "{\"title\": \"New Feature\", \"priority\": 2}" > docs/contents/basics/new-feature/metadata.json
```

This will create a new page titled "New Feature" under the "Basics" section.

The configuration script should automatically detect the new page and include it in the
documentation site in the appropriate section. You do not have to modify any configuration
files manually.

> **Note:** If you already have a documentation server running, the script won't detect
> new files automatically. You will need to restart the server to see the changes.

**Adding New Documentation Sections**

To add a new section to the documentation, create a new folder inside the `docs/contents` directory.
Inside this folder, create a `metadata.json` file for the section title.

**Example of adding a new section with a shell command:**

```bash
mkdir -p docs/contents/new-section
echo "{\"title\": \"New Section\", \"priority\": 2}" > docs/contents/new-section/metadata.json
```

This will create a new section titled "New Section" in the documentation.

**Starting the documentation server & building the docs**

To start a local server for the documentation, run:

```bash
npm run docs:dev
```

To build the static documentation site, run:

```bash
npm run docs:build
```

---

### Code of Conduct

We expect all contributors to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).
Please read it to understand the standards of behavior we expect from everyone involved in the project.

---

### Additional Restrictions

By contributing to this project, you agree to the following additional restrictions:
- Your contributions will be licensed under the same license as the project (MIT License).
- You will not include any proprietary or confidential information in your contributions.
- You will not submit any code that you do not have the right to contribute.
- You will not use the project for any illegal or unethical purposes.
- You will respect the intellectual property rights of others and will not include any code or content that infringes on those rights.
- You will not engage in any behavior that could harm the reputation or integrity of the project or its maintainers.
- You will not use the project to engage in any form of harassment or discrimination.
- You will not push any changes directly to the `main` branch; all changes must be made through pull requests.
- You will not push any obfuscated code or minified code; all code must be in a readable format.