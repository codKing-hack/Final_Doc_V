# Implementation Plan: Email OTP Verification

## Overview

This implementation plan breaks down the email OTP verification feature into discrete coding tasks. The feature adds secure identity verification through time-limited OTP codes sent via Gmail SMTP, integrating with the existing Node.js/Express backend and React/TypeScript frontend.

The implementation follows a bottom-up approach: starting with core services (OTP generation, email delivery), adding middleware (rate limiting), creating API routes, implementing frontend components, and finally integrating everything with comprehensive testing.

## Tasks

- [x] 1. Set up database schema and models
  - Create MongoDB schema for OTP collection with required fields (email, otp, createdAt, expiresAt, validated, validationAttempts, validatedAt)
  - Add database indexes on email, createdAt, and expiresAt fields
  - Configure TTL index on expiresAt field (expireAfterSeconds: 86400)
  - Create Mongoose model file at `models/OTP.js`
  - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [ ] 2. Implement OTP Service
  - [x] 2.1 Create OTP Service core functionality
    - Create `services/otpService.js` file
    - Implement `generateOTP(email)` method using crypto.randomInt() for 6-digit codes
    - Implement `validateOTP(email, otp)` method with expiration and validation checks
    - Implement `invalidateOTPs(email)` method to invalidate previous codes
    - Implement `cleanupExpiredOTPs()` method for removing old records
    - Add error handling for database operations
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3, 3.4, 3.5, 7.3_
  
  - [x] 2.2 Write property test for OTP format validity
    - **Property 1: OTP Format Validity**
    - **Validates: Requirements 1.1**
  
  - [x] 2.3 Write property test for OTP-email association
    - **Property 2: OTP-Email Association**
    - **Validates: Requirements 1.3**
  
  - [x] 2.4 Write property test for OTP expiration time
    - **Property 3: OTP Expiration Time**
    - **Validates: Requirements 1.4**
  
  - [x] 2.5 Write property test for OTP invalidation on regeneration
    - **Property 4: OTP Invalidation on Regeneration**
    - **Validates: Requirements 1.5**
  
  - [x] 2.6 Write property test for OTP validation correctness
    - **Property 7: OTP Validation Correctness**
    - **Validates: Requirements 3.1, 3.4**
  
  - [x] 2.7 Write property test for expired OTP rejection
    - **Property 8: Expired OTP Rejection**
    - **Validates: Requirements 3.2**
  
  - [x] 2.8 Write property test for incorrect OTP rejection
    - **Property 9: Incorrect OTP Rejection**
    - **Validates: Requirements 3.3**
  
  - [x] 2.9 Write property test for OTP single-use enforcement
    - **Property 10: OTP Single-Use Enforcement**
    - **Validates: Requirements 3.5**
  
  - [x] 2.10 Write unit tests for OTP Service
    - Test specific examples (generate for "test@example.com")
    - Test edge cases (empty email, very long email)
    - Test error conditions (database failure, invalid format)

- [ ] 3. Implement Email Service
  - [ ] 3.1 Create Email Service with Gmail SMTP
    - Create `services/emailService.js` file
    - Configure nodemailer with Gmail SMTP using environment variables (EMAIL_USER, EMAIL_PASS)
    - Implement `sendOTPEmail(email, otp, expiresAt)` method
    - Implement `verifyConfiguration()` method for startup validation
    - Format email with subject "Document Verification OTP"
    - Include OTP code, expiration time, and security warning in email body
    - Add error handling for SMTP failures
    - Use TLS encryption for secure connection
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [~] 3.2 Write property test for email subject format
    - **Property 5: Email Subject Format**
    - **Validates: Requirements 2.2**
  
  - [~] 3.3 Write property test for email content completeness
    - **Property 6: Email Content Completeness**
    - **Validates: Requirements 2.3**
  
  - [~] 3.4 Write property test for sender email consistency
    - **Property 20: Sender Email Consistency**
    - **Validates: Requirements 6.5**
  
  - [~] 3.5 Write unit tests for Email Service
    - Test successful email sending with valid SMTP config
    - Test special characters in email addresses
    - Test SMTP authentication failure
    - Test network timeout scenarios
    - Mock nodemailer transporter for testing

- [~] 4. Checkpoint - Ensure core services work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement Rate Limiter Middleware
  - [~] 5.1 Create rate limiting middleware
    - Create `middleware/rateLimiter.js` file
    - Implement `rateLimitGeneration(req, res, next)` - 3 attempts per 15 minutes
    - Implement `rateLimitValidation(req, res, next)` - 5 attempts per session
    - Implement `checkSessionLock(req, res, next)` for lockout enforcement
    - Store attempt counts and timestamps in Express session
    - Implement 15-minute lockout for exceeded limits
    - Return appropriate error messages with remaining time
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [~] 5.2 Write property test for generation rate limiting
    - **Property 11: Generation Rate Limiting**
    - **Validates: Requirements 4.1**
  
  - [~] 5.3 Write property test for validation rate limiting
    - **Property 12: Validation Rate Limiting**
    - **Validates: Requirements 4.2**
  
  - [~] 5.4 Write property test for session lockout duration
    - **Property 13: Session Lockout Duration**
    - **Validates: Requirements 4.3**
  
  - [~] 5.5 Write property test for audit logging completeness
    - **Property 14: Audit Logging Completeness**
    - **Validates: Requirements 4.4**
  
  - [~] 5.6 Write property test for lockout error message
    - **Property 15: Lockout Error Message**
    - **Validates: Requirements 4.5**
  
  - [~] 5.7 Write unit tests for Rate Limiter
    - Test allowing 3 generation attempts
    - Test blocking 4th generation attempt
    - Test session expiration during rate limit
    - Test missing session data handling

- [ ] 6. Create API Routes
  - [~] 6.1 Implement OTP API endpoints
    - Create `routes/otpRoutes.js` file
    - Implement POST `/api/otp/generate` endpoint with email validation
    - Implement POST `/api/otp/validate` endpoint with OTP validation
    - Implement POST `/api/otp/resend` endpoint with 60-second cooldown
    - Apply rate limiting middleware to all endpoints
    - Add input validation for email and OTP format
    - Return consistent error response format
    - Add structured logging for all operations
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 3.1, 3.2, 3.3, 4.4, 5.2, 5.6_
  
  - [~] 6.2 Write unit tests for API routes
    - Test successful OTP generation flow
    - Test successful OTP validation flow
    - Test resend with cooldown enforcement
    - Test input validation errors
    - Test rate limiting integration
    - Mock OTP Service and Email Service

- [ ] 7. Integrate routes with Express server
  - [~] 7.1 Wire OTP routes into main server
    - Import otpRoutes in `server.js`
    - Mount routes at `/api/otp` path
    - Ensure session middleware is configured before OTP routes
    - Initialize Email Service and verify SMTP configuration on startup
    - Add error handling middleware for OTP-related errors
    - _Requirements: 6.3, 6.4_
  
  - [~] 7.2 Write integration tests for complete OTP flow
    - Test end-to-end: generate → send → validate
    - Test resend flow: generate → resend → validate
    - Test rate limit flow: exceed limit → wait → retry
    - Test error recovery: email failure → retry → success
    - Use in-memory MongoDB for testing

- [~] 8. Checkpoint - Ensure backend is complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Create frontend API service layer
  - [~] 9.1 Extend API service with OTP methods
    - Add OTP methods to `services/api.ts` (or create if doesn't exist)
    - Implement `generateOTP(email: string)` method
    - Implement `validateOTP(email: string, otp: string)` method
    - Implement `resendOTP(email: string)` method
    - Use existing network retry logic (withNetworkRetry)
    - Add proper TypeScript types for request/response
    - Handle network errors with user-friendly messages
    - _Requirements: 5.2, 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 10. Implement OTP Verification Component
  - [~] 10.1 Create OTP Verification UI component
    - Create `components/auth/OTPVerification.tsx` file
    - Implement component with props: email, onSuccess, onCancel
    - Add 6-digit OTP input field with auto-focus
    - Implement countdown timer showing remaining validity time
    - Add resend button (disabled for first 60 seconds)
    - Display masked email address for privacy
    - Show error messages from API responses
    - Add loading states during API calls
    - Style component to match existing design system
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 8.2, 8.3, 8.4_
  
  - [~] 10.2 Write property test for email masking display
    - **Property 16: Email Masking Display**
    - **Validates: Requirements 5.3**
  
  - [~] 10.3 Write property test for countdown timer accuracy
    - **Property 17: Countdown Timer Accuracy**
    - **Validates: Requirements 5.5**
  
  - [~] 10.4 Write property test for resend button availability
    - **Property 18: Resend Button Availability**
    - **Validates: Requirements 5.6**
  
  - [~] 10.5 Write property test for error message propagation
    - **Property 19: Error Message Propagation**
    - **Validates: Requirements 5.7**

- [ ] 11. Integrate OTP component with Authentication Page
  - [~] 11.1 Add OTP verification step to auth flow
    - Update `AuthenticationPage.tsx` (or equivalent) to include OTP verification step
    - Add state management for OTP verification flow
    - Trigger OTP verification after signup/signin
    - Display OTPVerification component at appropriate step
    - Handle successful validation by proceeding to document verification
    - Handle cancellation by returning to previous step
    - _Requirements: 5.1, 5.8_

- [ ] 12. Add environment configuration
  - [~] 12.1 Document and configure environment variables
    - Add EMAIL_USER and EMAIL_PASS to `.env.example` file
    - Add optional OTP configuration variables with defaults (OTP_EXPIRY_MINUTES, OTP_GENERATION_LIMIT, etc.)
    - Document Gmail App Password setup in README or deployment docs
    - Add environment variable validation on server startup
    - _Requirements: 6.1, 6.2, 6.3_

- [ ] 13. Implement database cleanup job
  - [~] 13.1 Create scheduled cleanup task
    - Create cleanup function that calls `otpService.cleanupExpiredOTPs()`
    - Schedule cleanup to run every 6 hours (using node-cron or similar)
    - Add logging for cleanup operations
    - _Requirements: 7.3_
  
  - [~] 13.2 Write property test for expired record cleanup
    - **Property 21: Expired Record Cleanup**
    - **Validates: Requirements 7.3**
  
  - [~] 13.3 Write property test for OTP record completeness
    - **Property 22: OTP Record Completeness**
    - **Validates: Requirements 7.4**

- [~] 14. Final checkpoint - Complete system integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Add error handling and logging
  - [~] 15.1 Implement comprehensive error handling
    - Add custom error classes (ValidationError, RateLimitError, InfrastructureError)
    - Implement email masking utility for logs
    - Add structured logging for all OTP operations
    - Ensure all error messages match requirements specifications
    - Add error recovery mechanisms (retry logic, fallbacks)
    - _Requirements: 4.4, 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 16. Final validation and cleanup
  - [~] 16.1 Verify all requirements are met
    - Run full test suite (unit, property, integration)
    - Verify all 22 correctness properties pass
    - Check test coverage meets goals (85% line, 80% branch, 90% function)
    - Test complete user flow manually in development environment
    - Verify SMTP configuration works with Gmail
    - Review all error messages for clarity
    - Ensure all logging includes proper masking of sensitive data

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check with minimum 100 iterations
- All property tests must reference their design property number
- Backend uses JavaScript (Node.js/Express), frontend uses TypeScript (React)
- Checkpoints ensure incremental validation throughout implementation
- The implementation integrates with existing authentication and session infrastructure
