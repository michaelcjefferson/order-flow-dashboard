# Overview

A simple order status tracking dashboard, demonstrating clean and reactive front-end architecture.

Two main views:
- OrderTable - display summary of all orders, highlighting current status and ideally allowing filtering.
- OrderDetail - display details on one specific order.

## Key Decisions

### Project Structure
Follow domain-driven design principles to promote flexibility and clarity of communication with stakeholders - orders are a first-class entity, business logic built around this

- /app - holds global app logic/files, eg. routes
- /components - holds components that may be used across domains, eg. UI components
- /features - application entities and their typing, business logic, repos etc. (domains)
- /layouts - base app-wide page layouts
- /services - API logic (may be used to mock API calls in this project)
- /styles - global themes
### Style
- Intuitive, not flashy - components and tools (sorting, filtering, flow from summary to detail) should be familiar to users coming from other software and to new users
- Declare theme variables in /styles/index.css, use Tailwind everywhere else - minimal CSS file management, easy on-boarding and reuse, style syntax/naming consistent from the outset
- Desktop-first, but mobile friendly - users will predominantly be using desktop view
### Data Entities
Demo project - don't go too in-depth on custom typing, but clearly define Order entities and ensure Orders are robust and communicative of issues in case of malformed/missing fields. Declare types for restricted property sets, eg. OrderStatus, to more easily prevent malformed/unknown values
### Application State
- Zustand works well with React - good performance, easy to use. There are better choices for large scale applications but Zustand suits this scope. Keep it lean, define getters and setters and only use those to interact with data. For this app, will only deal with Order state
- Use React memos on order table to prevent unchanged orders from re-rendering when an update on orders is triggered
### AI Usage
Less than usual - goal is to demonstrate decision making/development process, and to refamiliarise myself with the React/typescript landscape. For that purpose, generate snippets and use Claude for research