# Product Catalog Manager

> A full-stack web application for browsing, filtering, and managing a product catalog — with an admin dashboard, wishlist, and PDF export.

---

## Overview

Product Catalog Manager is built for businesses or developers who need a clean, organized way to showcase products online and manage them through a secure admin interface. Visitors can search, filter by tags and price, and save favorites to a wishlist. Admins can create, update, and delete products and tags behind a JWT-protected dashboard. The application is notable for its clean separation of concerns — a React SPA frontend backed by an ASP.NET Core REST API following the repository/service pattern.

---

## 🚀 Live Demo

🚀 Demo coming soon

---

## Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Styling | Tailwind CSS, MUI (Material UI) |
| UI Components | rsuite, SweetAlert2, react-alice-carousel |
| Form Handling | React Hook Form |
| Backend Framework | ASP.NET Core Web API (.NET) |
| ORM | Entity Framework Core |
| Database | SQL Server |
| Authentication | JWT Bearer Tokens |
| Object Mapping | AutoMapper |
| PDF Generation | IronPDF |
| API Documentation | Swagger / OpenAPI |

---

## ✨ Key Features

- 🛍️ **Product Catalog** — Browse all products in a responsive card grid with name, price, and images
- 🔍 **Search & Filter** — Filter products by tag, price range (with a range slider), and keyword search simultaneously
- 🔎 **Product Detail View** — View full product details with image zoom capability
- ❤️ **Wishlist** — Add and remove products from a persistent in-app wishlist
- 📄 **PDF Export** — Generate and download a PDF of all wishlisted products
- 🔐 **JWT Authentication** — Secure admin login and registration with token-based auth
- 🛠️ **Admin Dashboard** — Protected admin panel to add, edit, and delete products and tags
- 🏷️ **Tag Management** — Create, update, and delete tags used for product categorization

---

## Architecture Overview

The project is split into two independent applications that communicate over a REST API:

```
┌─────────────────────────────┐        HTTP/JSON        ┌───────────────────────────────┐
│      CatalogueFrontend      │ ──────────────────────► │      ProductCatalogue API      │
│   React SPA (Vite + Redux)  │                         │  ASP.NET Core Web API (.NET)   │
└─────────────────────────────┘                         └───────────────────────────────┘
                                                                        │
                                                                        ▼
                                                              ┌──────────────────┐
                                                              │   SQL Server DB  │
                                                              └──────────────────┘
```

**Frontend** routes visitors to a public product catalog and admins to a protected dashboard. Redux manages filter state, wishlist state, and auth state globally.

**Backend** follows a layered architecture:
- **Controllers** — handle HTTP requests and return DTOs
- **Services** — contain business logic
- **Repositories** — abstract data access via Entity Framework Core
- **Models / DTOs** — separate domain models from API contracts

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [.NET SDK](https://dotnet.microsoft.com/download) 7.0+
- [SQL Server](https://www.microsoft.com/en-us/sql-server) (local or remote instance)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yashvi-khunt/product-catalog-manager.git
cd product-catalog-manager
```

**2. Set up the backend**

```bash
cd ProductCatalogue/ProductCatalogue
dotnet restore
```

Update `appsettings.json` with your SQL Server connection string and JWT settings (see [Environment Variables](#environment-variables) below), then apply migrations:

```bash
dotnet ef database update
```

**3. Set up the frontend**

```bash
cd ../../CatalogueFrontend
npm install
```

---

### Environment Variables

**Backend** — `ProductCatalogue/ProductCatalogue/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=.;Database=ProductCatalogue;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Jwt": {
    "Issuer": "https://localhost:7184",
    "Audience": "https://localhost:7184",
    "Key": "<your-secret-key>"
  }
}
```

**Frontend** — `CatalogueFrontend/.env`

```env
VITE_BASEURL=https://localhost:7184/api
```

---

### Run Locally

**Start the backend:**

```bash
cd ProductCatalogue/ProductCatalogue
dotnet run
```

The API will be available at `https://localhost:7184`. Swagger UI is accessible at `https://localhost:7184/swagger` in development mode.

**Start the frontend:**

```bash
cd CatalogueFrontend
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
product-catalog-manager/
│
├── CatalogueFrontend/               # React frontend (Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   ├── apiService.js        # Visitor-facing API calls
│   │   │   └── adminApi.js          # Admin API calls
│   │   ├── components/
│   │   │   ├── admin/               # Admin dashboard pages (Product, Tag, AddProduct, AddTag)
│   │   │   ├── auth/                # Login page and auth layout guard
│   │   │   ├── wishlist/            # Wishlist button and list components
│   │   │   ├── routes/              # React Router configuration
│   │   │   ├── FilterComponent.jsx  # Slide-in filter panel (tags, price range, search)
│   │   │   ├── ProductCard.jsx      # Product card for grid listing
│   │   │   ├── ProductDetail.jsx    # Full product detail with image zoom
│   │   │   ├── ProductList.jsx      # Product grid with filter trigger
│   │   │   ├── Header.jsx           # Site header
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   └── Visitor.jsx          # Public-facing layout (Header + ProductList + Footer)
│   │   ├── store/
│   │   │   ├── store.js             # Redux store setup
│   │   │   ├── authSlice.js         # Authentication state
│   │   │   ├── filterSlice.js       # Filter state (tags, price range, search text)
│   │   │   ├── wishListSlice.js     # Wishlist state
│   │   │   └── imageSlice.js        # Image upload state
│   │   ├── config.js                # App-level config
│   │   ├── App.jsx                  # Root component
│   │   └── main.jsx                 # Entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── ProductCatalogue/                # ASP.NET Core backend
    ├── ProductCatalogue.sln
    └── ProductCatalogue/
        ├── Controllers/
        │   ├── ProductController.cs # CRUD + wishlist + PDF endpoints
        │   ├── TagController.cs     # Tag CRUD endpoints
        │   ├── AuthController.cs    # Login and register endpoints
        │   └── ImageController.cs   # Image upload endpoint
        ├── Services/
        │   ├── ProductService.cs    # Product business logic
        │   ├── TagService.cs        # Tag business logic
        │   ├── AuthService.cs       # Auth and JWT logic
        │   └── InAppStorageService.cs
        ├── Repositories/            # Service interfaces (IProduct, ITag, IAuth)
        ├── Models/                  # EF Core entity models (Product, Tag, Image, User)
        ├── DTOs/                    # Data transfer objects for API contracts
        ├── Helper/                  # PDF HTML template generator
        ├── Validations/             # Input validation logic
        ├── Program.cs               # App bootstrap, DI registration, middleware
        └── appsettings.json         # App configuration
```

---

## 📸 Screenshots

📸 Screenshots coming soon

---

## What I Learned

- **Full-stack integration** — Connecting a React SPA to an ASP.NET Core REST API taught me how to manage CORS, JWT token flow from login through protected routes, and consistent API response shaping with DTOs.
- **Redux state architecture** — Designing independent slices for auth, filters, and wishlist showed me how to keep global state predictable and co-locate logic (reducers + selectors) close to where it's consumed.
- **Repository and service pattern** — Separating data access (repositories) from business logic (services) made the backend much easier to reason about and keeps controllers thin.
- **PDF generation from HTML** — Generating a formatted wishlist PDF dynamically using IronPDF with a custom HTML template gave me hands-on experience turning in-app data into shareable documents.

---

## Author

**Yashvi Khunt**  
MS Computer Science (Cybersecurity) @ Stevens Institute of Technology  
🔗 [github.com/yashvi-khunt](https://github.com/yashvi-khunt)  
💼 [linkedin.com/in/yashvi-khunt](https://linkedin.com/in/yashvi-khunt)
