# Architectural Decision Records (ADR) - Version 1.0

This file records the critical architectural design decisions made for the Vedhkrit Learner Development OS.

---

## ADR 01: Core Architecture Framework
- **Status**: Approved
- **Decision**: Use NestJS 11 + Prisma ORM structured in Clean Architecture with Domain-Driven Design (DDD) & CQRS.
- **Rationale**: Strict isolation of business domains ensures high maintainability. Nest's module system organizes boundary contexts, and CQRS isolates queries (low-latency read pipelines) from commands (auditable writes).

---

## ADR 02: Multi-Tenant Partitioning
- **Status**: Approved
- **Decision**: Implement shared database instances with dynamic schema-based or logical tenant scoping (`organizationId` & `tenantId`).
- **Rationale**: Simplifies operations while guaranteeing security, allowing seamless horizontal scale-out.

---

## ADR 03: Event-Driven Communications
- **Status**: Approved
- **Decision**: Integrate RabbitMQ for asynchronous domain event propagation and Redis for cache/rate limit states.
- **Rationale**: Isolates heavy workloads (notifications, third-party integrations sync, reporting agg) from front-facing HTTP controllers, ensuring sub-100ms API response latency.

---

## ADR 04: AI Platform Provider Abstraction
- **Status**: Approved
- **Decision**: Abstract LLM invocations behind `IAIProvider` supporting hot-swappable providers (OpenAI, Gemini, Anthropic, Azure OpenAI).
- **Rationale**: Avoids vendor lock-in, optimizes cost via model routing, and ensures resilient fallback logic.
