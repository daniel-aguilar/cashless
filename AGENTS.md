# Cashless - Backend Maintenance & Release Workflow

This project is a **Java** and **Spring Boot** application. Follow these rules for maintenance and releases.

## Human Setup
- Install the latest **LTS Java** and **mvnd** (the Maven Daemon).
- Ensure `podman` or `docker` is available for Jib builds.

## Dependency Management (Backend)

### Spring Boot (`pom.xml`)
- **Source of Truth**: `spring-boot-starter-parent` version.
- **Rule**: 
  - Minor and patch number upgrades (e.g., `X.Y.Z` -> `X.Y.Z+1`) **can** be applied automatically.
  - Major version upgrades (e.g., `X.x` -> `Y.x`) **require human intervention**.

### Java Version
- **Constraint**: Stick to the latest **LTS** available.
- **Rule**: Any Java version upgrade requires human intervention.
- **Consistency**: Ensure `<java.version>` in `pom.xml` matches `java-version` in `.github/workflows/build.yml`.

### Plugins & Others
- **Jib (`jib-maven-plugin`)**: Use the latest version.
- **Spotless (`spotless-maven-plugin`)**: Use the latest version.
- **Validation**: After any change, run `mvnd spotless:check` and `mvnd test`. They **must not** return an error.

## Containerization (`pom.xml`)
- **Base Image**: Use `eclipse-temurin` with the latest **LTS JRE Alpine** image.
- **Update Process**:
  1. Check for a new image version/tag.
  2. If a new image is available, update the `<image>` tag in `jib-maven-plugin` configuration.
  3. **Crucial**: Paste the corresponding `sha256sum` as per Jib instructions (e.g., `image@sha256:HASH`).

## CI/CD Alignment
- Ensure GitHub Action versions and runner configurations in `.github/workflows/build.yml` are the latest stable releases.
- Sync Java and Node versions with `pom.xml` and `package.json`.

## Release Workflow (CRITICAL SEQUENCE)
1. **Verification**: `mvnd spotless:apply && mvnd test`.
2. **Maintenance**:
   - Update copyright year in `LICENSE` or headers if needed.
   - Purge old game data (e.g., `truncate table account cascade;`) if required for a fresh start.
3. **Local Build**: `mvnd clean package`.
4. **Bump Version**: Update `<version>` in `pom.xml`.
5. **Commit & Tag**:
   - `git add .`
   - `git commit -m "Cashless vX.Y.Z"` (follow Chris Beams' style)
   - `git tag vX.Y.Z`

## Human Reminders (CRITICAL)
- **Git Push**: AI assistants **must never** execute `git push`. The human must run:
  `git push --atomic origin HEAD vX.Y.Z`
- **Docker Push**: AI assistants **must never** execute the final Docker image push to the registry. The human must handle the registry-specific push command.

## Post-Release Tasks (Local Testing)
- **Docker Build (Local Test)**:
  - `mvnd jib:buildTar -Djib.dockerClient.executable=podman`
  - `podman load --input target/jib-image.tar`

## Notes for LLMs
- **Validation First**: Never commit dependency updates without running local tests and linters.
- **Human Handover**: Major version bumps for Spring Boot or Java MUST be flagged for human review.
- **Human-Only Execution**: AI assistants may prepare the repository, commit changes, and create local tags, but **must never** execute `git push` or the final Docker image push.
