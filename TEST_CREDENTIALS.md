# Test Credentials

Use these credentials to test the application:

## Tenant Account
- **Email:** `tenant@test.com`
- **Password:** `tenant123`
- **Name:** John Doe
- **Role:** Tenant

### Tenant Access:
- View and manage verification requests
- Create new property requests
- View tenant dashboard
- Update tenant profile
- Access: `/tenant/dashboard`, `/tenant/profile`, `/tenant/requests`

## Landlord Account
- **Email:** `landlord@test.com`
- **Password:** `landlord123`
- **Name:** Sarah Johnson
- **Role:** Landlord

### Landlord Access:
- View and manage tenant verification requests
- Approve/reject requests
- Request more information from tenants
- View landlord dashboard
- Update landlord profile
- Access: `/landlord/dashboard`, `/landlord/profile`

## Testing Steps:

1. Go to `/login` page
2. Enter one of the credentials above
3. You will be redirected to the appropriate dashboard based on role
4. Navigate to Profile page to see user-specific profile information
5. All data is mock data and will reset on page refresh

