# SVG-Flow

Production-grade React components from raw SVGs. An AST-driven optimization pipeline and workflow automation tool built for modern frontend architecture.

## Overview

SVG-Flow bridges the gap between design assets and production-ready code. Instead of manually formatting exported SVGs, managing dimensions, and resolving strict camelCase React warnings, SVG-Flow automates the entire pipeline. It utilizes an AST (Abstract Syntax Tree) optimization engine to strip bloated metadata, normalize attributes, and output strict, type-safe TSX components.

## Core Features

* **AST Optimization Engine:** Powered by SVGO, performing multi-pass optimizations. It removes invisible elements, minifies paths, and forces React camelCase compliance instantly.
* **Cloud Vault:** A secure, serverless PostgreSQL storage layer powered by Neon and Drizzle ORM. Developers can synchronize their generated components across sessions and manage their personal asset library.
* **Terminal Native (CLI):** Designed for local development environments. The included CLI allows for batch conversions. Point the tool to a directory, and it will compile hundreds of SVGs into TSX components in milliseconds.
* **Zero Configuration, Absolute Control:** Works out of the box with sensible defaults, while providing a granular configuration panel for developers requiring specific AST manipulations, precision controls, or custom attributes.
* **Bulk Export:** Package and download the entire component library as a ready-to-import bundle with an automatically generated index file.

## Technical Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Bento Grid Architecture)
* **Engine:** SVGO (SVG Optimizer)
* **Database:** Neon (Serverless PostgreSQL)
* **ORM:** Drizzle ORM
* **Authentication:** Clerk
* **UI Components:** Radix UI / custom motion interfaces via Framer Motion

## Getting Started

### Prerequisites

* Node.js 18.x or later
* A Neon Database account
* A Clerk Authentication account

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/enderkaran/svg-flow.git](https://github.com/enderkaran/svg-flow.git)
    cd svg-flow
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables. Create a `.env.local` file in the root directory and add your keys:
    ```env
    DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
    CLERK_SECRET_KEY="sk_test_..."
    ```

4.  Push the database schema:
    ```bash
    npx drizzle-kit push
    ```

5.  Start the development server:
    ```bash
    npm run dev
    ```

## CLI Usage

SVG-Flow includes a command-line interface for batch processing local files.

```bash
# Build the CLI tool
npm run cli:build

# Execute batch conversion
npx svg-flow ./path-to-svg-folder -o ./output-directory

```

## Architecture Notes

The application utilizes a modular design. The transformation engine operates securely via Next.js Server Actions, ensuring that AST parsing and string manipulation do not block the client thread. The UI implements a strict "Quiet Luxury" aesthetic, utilizing dark themes, negative space, and a Bento Grid layout to prioritize developer experience and focus.

## License

MIT License.

## Author

Ender Karan
