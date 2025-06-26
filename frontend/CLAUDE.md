# FlaskPlastic Frontend - Manufacturing Management System

> **🏭 React-based Manufacturing Management System for Plastic Injection Molding**  
> **Tech Stack**: React 18 + RTK Query + Zustand + Material-UI + Ant Design

## 🚀 Quick Start

### Development Commands
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
```

## 🏗️ Project Architecture

### Core Technology Stack
- **Frontend**: React 18 (JavaScript, no TypeScript)
- **State Management**: 
  - RTK Query for API calls and server state
  - Zustand for local client state
- **UI Framework**: 
  - Material-UI (@mui/material) for core components
  - Ant Design (antd) for data tables and complex widgets
  - styled-components for custom styling
- **Form Handling**: React Hook Form + Yup validation
- **Routing**: React Router v6
- **Build Tool**: Create React App

### Project Structure
```text
src/
├── components/
│   ├── WiseScheduling/           # Production scheduling system
│   │   ├── components/
│   │   │   ├── machine/         # Machine management components
│   │   │   │   ├── board/       # Machine dashboard
│   │   │   │   ├── controls/    # Machine control components
│   │   │   │   └── manager/     # Status management
│   │   │   └── schedule/        # Production scheduling
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API services
│   │   └── configs/             # Configuration files
│   ├── QuotationManagementSystem/     # Sales quote management
│   ├── QuotationManagementSystemFQ/   # Factory quote management
│   ├── ProductionRecord/        # Production tracking
│   ├── QualityManagementSystem/ # Quality assurance
│   ├── MaintenanceSystem/       # Machine maintenance
│   ├── CostWiseSystem/          # Cost management
│   ├── Global/                  # Shared components
│   └── Login/                   # Authentication
├── config/                      # App configuration
├── pages/                       # Page components
├── router/                      # Routing configuration
├── store/                       # Redux store & API
├── services/                    # External API services
├── styles/                      # Global styles
└── utility/                     # Utility functions
```

## 🏭 Manufacturing Domain Context

### Machine Management System
- **Machine Status Types**: RUN (生產中), IDLE (待機中), TUNING (上模與調機), TESTING (產品試模), OFFLINE (機台停機)
- **Production Areas**: A (10 machines), B (11 machines), C (9 machines), D (9 machines) - total 39 machines
- **Machine Types**: 單色 (single color), 雙色 (dual color)
- **Status Transitions**: Complex business logic with form validation

### Key Business Components
1. **MachineBoard**: Real-time machine status dashboard
2. **StatusManager**: Machine status transition management
3. **ProductInput**: Production planning input forms
4. **StatusSlider**: User interface for status changes

### Key Configuration Files
- `/home/harry/flaskplastic/frontend/src/config/config.js` - Machine lists, production areas, process categories
- `/home/harry/flaskplastic/frontend/src/components/WiseScheduling/configs/constants/fieldNames.js` - Status mappings
- `/home/harry/flaskplastic/frontend/src/config/enum.js` - Application enumerations

## 🎯 Development Standards

### Code Style Requirements
- **Pure JavaScript** (no TypeScript)
- **Function Components** with Hooks only
- **JSDoc documentation** for all functions
- **AHA Principles**: Avoid Hasty Abstractions
- **Push Ifs Up**: Move conditional logic to higher levels

### Component Patterns
```javascript
// Standard component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Component description with JSDoc
 * @param {Object} props - Component props
 * @returns {JSX.Element} Component JSX
 */
const ComponentName = ({ prop1, prop2 }) => {
  // Local state and effects
  const [state, setState] = useState(initialValue);
  
  // Custom hooks
  const { data, loading } = useCustomHook();
  
  // Event handlers
  const handleEvent = () => {
    // Implementation
  };
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.object,
};

export default ComponentName;
```

### API Integration Patterns
```javascript
// RTK Query service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const machineApi = createApi({
  reducerPath: 'machineApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    updateMachineStatus: builder.mutation({
      query: (data) => ({
        url: '/machine/status',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
```

## 🔧 Common Development Patterns

### State Management
- **Global State**: Use RTK Query for server state, Zustand for client state
- **Local State**: Use useState for component-level state
- **Form State**: Use React Hook Form for all forms

### Error Handling
```javascript
// Error boundary pattern
const handleError = (error, context) => {
  console.error(`Error in ${context}:`, error);
  // Add user notification
};

// API error handling
const { data, error, isLoading } = useGetDataQuery();
if (error) {
  return <ErrorMessage error={error} />;
}
```

### Performance Optimization
- Use `React.memo` for expensive components
- Use `useMemo` and `useCallback` for expensive computations
- Implement virtual scrolling for large data sets
- Use code splitting with `React.lazy`

## 🚨 Critical Business Logic

### Machine Status Validation
The system has complex status transition rules implemented in:
- `/home/harry/flaskplastic/frontend/src/components/WiseScheduling/components/machine/controls/StatusSlider.jsx` - UI-level status change validation
- `/home/harry/flaskplastic/frontend/src/components/WiseScheduling/hooks/machine/useStatusManager.js` - Business logic validation (exported as `useStatusForm`)
- `/home/harry/flaskplastic/frontend/src/components/WiseScheduling/utils/validator/statusValidator.js` - Status transition validation rules
- Status changes must preserve business rules while allowing user flexibility

### Form Submission Flow
1. User changes status via StatusSlider component
2. useStatusForm hook (from useStatusManager.js) validates the change
3. Form data is prepared and validated through validateStatusTransition
4. API call updates machine status via machineStatusApi
5. UI reflects the new state through real-time updates

## 🧪 Testing Guidelines

### Test Structure
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Test Coverage Requirements
- All user interactions
- Error states and edge cases
- API integration points
- Business logic validation

## 🔒 Security Considerations

- Input validation on all form fields
- XSS prevention in dynamic content
- Secure API endpoints with proper authentication
- No sensitive data in client-side code
- RBAC implementation for feature access

## 📝 Best Practices

### Component Development
1. Start with existing component patterns
2. Follow naming conventions (PascalCase for components)
3. Use PropTypes for type checking
4. Implement error boundaries
5. Add comprehensive JSDoc documentation

### Performance
1. Minimize re-renders with proper memoization
2. Use React DevTools Profiler for optimization
3. Implement lazy loading for large components
4. Optimize bundle size with code splitting

### Maintenance
1. Regular dependency updates
2. Code review for all changes
3. Maintain test coverage above 80%
4. Document breaking changes
5. Follow semantic versioning

## 🎯 Common Commands

```bash
# Find components by pattern
find src -name "*.jsx" -type f | grep -i machine

# Search for specific imports
grep -r "useStatusManager" src/

# Check component dependencies
grep -r "import.*from.*components" src/

# Count total machines in configuration
grep -c "machineSN" src/config/config.js
```

This project follows manufacturing industry standards with emphasis on reliability, performance, and maintainability. Always consider the production environment impact when making changes to machine status management components.

