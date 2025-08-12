# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language
やりとりは日本語を採用する。

## Project Overview

This is a static landing page for "ココもやり展" (Kokomoyari Exhibition), a philosophy exhibition website. The project consists of a simple HTML/CSS structure without any build tools or JavaScript framework.

## Project Structure

- `index.html` - Main landing page with sections for concept, event info, access, and contact form
- `style.css` - Minimal, responsive CSS using modern features (CSS custom properties, clamp(), container queries)
- `kokomoyariLP/` - Empty directory (purpose unclear)

## Development Notes

### Form Handling
The contact form in `index.html` currently has a placeholder `ACTION_URL` that needs to be configured with an actual form handler endpoint.

### Missing Assets
- `/assets/favicon.png` - Referenced but not present
- OGP image (`https://example.com/ogp.jpg`) - Placeholder URL needs updating

### Deployment Configuration
The OGP URL meta tag references a GitHub Pages deployment pattern but needs the actual username configured.

### CSS Architecture
- Uses CSS custom properties for consistent spacing and breakpoints
- Mobile-first responsive design with minimal media queries
- System font stack for optimal performance across platforms

## Important Considerations

1. This is a pure static site with no build process
2. All changes can be tested by opening `index.html` directly in a browser
3. The site is in Japanese and targets a Japanese audience
4. Form submissions require external handling (no backend present)