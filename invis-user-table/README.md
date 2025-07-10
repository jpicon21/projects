# Dynamic User Data Table

Builds a single-page web application that fetches user data from a public API and
displays it in a dynamically rendered table.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast development and builds
- **Jotai** for atomic state management
- **Tailwind CSS v4** as a Vite plugin for modern styling
- **Axios** for API requests

## AI Tools Used
- **Claude.ai**: Used to help optomize component files and logic
- **Copilot**: Used within IDE for simple autofills and logic creation

## Setup and Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd user-table-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build for Production

```bash
npm run build
npm run preview
```


## Architecture Decisions

### Component Structure

- **UserTable**: Handles data fetching and high-level state management
- **TableHeader/TableRow**: Presentational components that receive configuration
- **tableColumns**: Centralized column configuration with render functions
- **SortIcon**: Creates the sorting chevrons and active logic 
- **ErrorMessage**: Global error component if API calls were to fail
- **LoadingSpinner**: Global Loading state component that can be used wherever needed as the API calls are pending success state

### State Management with Jotai
I selected Jotai over others for several reasons:

1. **Minimal Boilerplate**: No actions, reducers, or providers to manage
2. **Atomic Design**: Each piece of state is independent and composable
3. **TypeScript First**: Excellent type inference without extra configuration
4. **Performance**: Only components using specific atoms re-render

My atom structure:
- **Base Atoms**: `usersAtom`, `loadingAtom`, `errorAtom`
- **UI Atoms**: `sortFieldAtom`, `sortDirectionAtom`
- **Derived Atoms**: `sortedUsersAtom` computes sorted data without mutations

### Dynamic Column System
Instead of hardcoding table columns, I implemented a configuration-based approach:

```typescript
{
  field: 'name',
  label: 'Name',
  render: (user) => user.name,
  className?: 'custom-styles'
}
```

Benefits:
- Easy to add/remove/reorder columns
- Each column defines its own rendering logic
- Reusable for different data types
- Maintains type safety

### Sorting Implementation
I used configuration object approach:

```typescript
const sortValueGetters: Record<SortField, (user: AugmentedUser) => string | number> = {
  name: (user) => user.name.toLowerCase(),
  // ... other fields
};
```

This is more maintainable, follows DRY principles, and is easily extensible.

### Styling Decisions

I chose **Tailwind CSS v4** as a Vite plugin for:
- Zero-config setup with Vite
- Faster build times than PostCSS approach
- Modern utility-first styling
- Excellent developer experience

**Visual Design Choices**:
- Clean, minimal aesthetic with subtle interactions
- Blue accent color for links
- Purple for active states for column sorting
- Gray color palette for easy clean looks
- Smooth transitions for better UX

## Conditional Rendering Implementation

### 1. Email Formatting
- Implemented as clickable `mailto:` links
- `stopPropagation()` prevents sort trigger on click
- Styled with Tailwind's text and hover utilities

### 2. Company Name Icon
- Simple conditional check: `companyName.toLowerCase().startsWith('c')`
- Star emoji (⭐) renders inline when condition is met
- Keeps visual hierarchy clean and scannable

### 3. Website Link Conditional Text
- Checks for "biz" substring: `website.toLowerCase().includes('biz')`
- Shows "Visit Business Site" vs actual URL
- All links open in new tabs with security attributes

### 4. City Highlighting
- Population > 10,000 triggers bold text
- Uses Tailwind's `font-bold` utility class
- Native browser tooltips show exact population on hover
- Bold cities display "Population: 15,000 (Large City)"
- Regular cities display "Population: 5,000"
- Help cursor (`cursor-help`) indicates hoverable bold cities
- Population data handled via augmentation strategy

## Population Data Strategy

I implemented a hybrid approach for population data:

1. **Predefined Mapping**: Known cities have consistent, realistic populations
2. **Random Fallback**: Unknown cities get random values (1,000-30,000)

This ensures:
- Consistent behavior across sessions
- Realistic data distribution
- No external API dependencies
- Demonstrates both bold and regular text rendering

## Performance Optimizations

1. **Jotai's Atomic Updates**: Only affected components re-render
2. **Derived Atoms**: `sortedUsersAtom` memoizes sort calculations
3. **Inline SVGs**: No network requests for sort icons
4. **Tailwind CSS**: No runtime style calculations
5. **Component Modularity**: Enables future React.memo optimizations

## Key Design Decisions

### Why Not Redux?
- Overkill for this application's state needs
- Jotai provides similar benefits with less complexity
- Better TypeScript integration out of the box

### Why Inline SVGs?
- Simple arrow icons don't justify separate files
- Enables dynamic color changes with Tailwind
- Reduces build complexity
- Better performance (no extra requests)

## Future Enhancements

- **Pagination**: For handling larger datasets
- **Filtering**: Column-specific filter inputs
- **Column Visibility**: Toggle columns on/off
- **Export Functionality**: CSV/Excel download
- **Generic Table Component**: Reusable for any data type
- **Virtualization**: For massive datasets
- **Accessibility**: ARIA labels and keyboard navigation

## Challenges Addressed

1. **Type Safety**: Full TypeScript coverage with proper generics
2. **Maintainability**: Clear separation of concerns
3. **Performance**: Optimized re-renders with atomic state
4. **Developer Experience**: Hot module replacement, type inference
5. **Code Quality**: ESLint and Prettier ready