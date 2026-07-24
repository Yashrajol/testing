# Vedhkrit Database Schema

This directory contains the database schema definitions, seeds, and migrations for the Vedhkrit Learner Development OS.

## Directory Structure

* `schema/`: Split schema files compiled dynamically by Prisma.
  * `schema.prisma`: Generator and datasource configurations.
  * `enums.prisma`: Global database enums.
  * `auth.prisma`: Identity, security sessions, and RBAC permissions.
  * `organization.prisma`: Tenant, school, campus, and cohort configurations.
  * `academics.prisma`: Chapters, lessons, attendance, and homework.
  * `assessment.prisma`: Quizzes, questions, and attempt evaluations.
  * `growth.prisma`: Goals, portfolios, and developmental radars.
  * `ai.prisma`: AI prompt configurations and metrics.
  * `reporting.prisma`: Periodic progress compile parameters.
* `migrations/`: Managed database alteration scripts.
* `seeds/`: Initial catalog data seed injections.
* `fixtures/`: Test data fixtures.
