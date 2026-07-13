# Database Schema & Entity-Relationship (ER) Diagrams

This document outlines the database structure and relational models defined inside our Prisma configurations.

---

## 1. Entity-Relationship Diagram (Mermaid)

The relations, keys, and cardinalities are mapped in the following diagram:

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string phoneNumber UK
        string name
        string passwordHash
        Role role
        AccountStatus status
        DateTime createdAt
        DateTime updatedAt
    }

    UserOTP {
        string id PK
        string userId FK
        string otpCode
        DateTime expiresAt
        DateTime verifiedAt
        DateTime createdAt
    }

    Session {
        string id PK
        string userId FK
        string refreshToken UK
        string ipAddress
        string userAgent
        DateTime expiresAt
        DateTime createdAt
    }

    StudentProfile {
        string id PK
        string userId FK
        string grade
        string schoolName
        string parentLinkId FK
        string membershipId FK
    }

    ParentProfile {
        string id PK
        string userId FK
    }

    SchoolProfile {
        string id PK
        string userId FK
        string board
        string address
        string licenseDocUrl
        ApprovalStatus approvalStatus
        DateTime approvedAt
    }

    MentorProfile {
        string id PK
        string userId FK
        string expertise
        string resumeUrl
        ApprovalStatus approvalStatus
        DateTime approvedAt
    }

    PricingPlan {
        string id PK
        string name
        float priceINR
        string billingCycle
        string features
        boolean isActive
    }

    Membership {
        string id PK
        string planId FK
        SubscriptionStatus status
        DateTime startedAt
        DateTime expiresAt
    }

    Transaction {
        string id PK
        string orderId UK
        string paymentId UK
        string planId FK
        float amount
        string currency
        string status
        json rawPayload
    }

    CmsPage {
        string id PK
        string slug UK
        string title
        string metaTitle
        string metaDesc
    }

    CmsSection {
        string id PK
        string pageId FK
        string sectionName
        int layoutIndex
        string title
        string subtitle
        string desc
        string ctaLabel
        string ctaLink
        json cards
    }

    ContactQuery {
        string id PK
        string name
        string email
        string phone
        string subject
        string message
        boolean isResolved
    }

    AuditLog {
        string id PK
        string userId FK
        string action
        string ipAddress
        json payload
    }

    %% Relationships Mapping
    User ||--o| StudentProfile : "has 1-to-1 profile"
    User ||--o| ParentProfile : "has 1-to-1 profile"
    User ||--o| SchoolProfile : "has 1-to-1 profile"
    User ||--o| MentorProfile : "has 1-to-1 profile"
    
    User ||--o{ UserOTP : "requests OTPs"
    User ||--o{ Session : "maintains login sessions"
    User ||--o{ AuditLog : "records audits"

    ParentProfile ||--o{ StudentProfile : "links child accounts"
    StudentProfile }o--o| Membership : "belongs to active license"
    Membership }o--|| PricingPlan : "based on pricing rules"
    Transaction }o--|| PricingPlan : "charges for plan type"

    CmsPage ||--o{ CmsSection : "structured by layouts"
```

---

## 2. Table Cardinality Specifications

* **User Profiles (1:1):** Every `StudentProfile`, `ParentProfile`, `SchoolProfile`, and `MentorProfile` maps back to exactly one parent record in the `User` table via the `userId` field. This ensures credentials, status codes, and security settings are centralized.
* **Parent-Child Link (1:N):** A `ParentProfile` can link to multiple `StudentProfile` accounts (supporting parents with multiple children), while each student profile connects to at most one parent manager.
* **OTP & Sessions logs (1:N):** An active user account can trigger multiple login sessions or verification OTP records over time, cleared periodically via database cleanup crons.
* **Page Layout Blocks (1:N):** A `CmsPage` (e.g. `slug = "homepage"`) holds multiple `CmsSection` layouts representing headers, timelines, and sliders, sorted dynamically by their `layoutIndex`.

---

## 3. Recommended Performance Indexes

To guarantee high speeds when serving up to 5,000 requests per second, the database creates the following composite indexes:

1. **`UserOTP` lookup:** Index on `[userId]` for fast lookup during verification.
2. **`Session` verification:** Index on `[userId, refreshToken]` to validate session integrity.
3. **`StudentProfile` linkage queries:** Index on `[parentLinkId]` to render parent dashboards.
4. **`Transaction` lookup:** Index on `[orderId]` and `[paymentId]` to ensure payments verification can validate signatures immediately.
