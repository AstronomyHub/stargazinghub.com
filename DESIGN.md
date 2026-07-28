# Stargazing Hub editorial design system

## 1. Visual theme and atmosphere

The site should feel like a small observatory designed by an architect: quiet,
precise, dark, and shaped by measured light. Product imagery is the visual
anchor. Decoration stays structural, using datum lines, numbered bays, generous
negative space, and restrained warm light.

## 2. Color palette and roles

- Canvas: `oklch(0.13 0.018 258)` for the night-sky ground.
- Raised canvas: `oklch(0.17 0.018 258)` for deliberate elevation.
- Limestone: `oklch(0.93 0.012 86)` for primary text.
- Mist: `oklch(0.73 0.018 255)` for secondary copy.
- Brass: `oklch(0.78 0.11 82)` for primary actions and wayfinding.
- Sage: `oklch(0.72 0.055 164)` for quiet status and observational context.
- Hairline: `oklch(0.93 0.012 86 / 0.12)` for grid and section structure.

## 3. Typography rules

Use Schibsted Grotesk for Latin and Cyrillic, followed by the platform CJK
fonts. Display type uses weight 600, tight Latin tracking, and compact line
height. Body copy stays between 16px and 19px with a maximum readable measure of
65 characters. CJK headings use normal tracking and body copy uses 1.75 line
height.

## 4. Component styling

Buttons use a 6px radius and a fixed 48px action height. Primary actions use
limestone or brass on the dark canvas; secondary actions are quiet text links or
hairline outlines. Media frames use a 12px radius, a single inset outline, and
no decorative shadow. Cards are reserved for media or facts that need a shared
boundary.

## 5. Layout principles

Desktop layouts follow a twelve-column grid inside a 1240px shell. Sections use
120px to 152px of vertical space, with asymmetrical compositions and one visual
anchor per viewport. Mobile stacks content in editorial order: claim, evidence,
then action.

## 6. Depth and elevation

Depth comes from surface luminance steps, not glass blur. The base canvas is
near-black, media wells are slightly lighter, and prominent facts use one
additional white overlay. Hairlines describe structure without boxing every
item.

## 7. Do and do not

- Do lead with real product imagery.
- Do give each section one editorial job.
- Do use numbers as sequence markers, not vanity metrics.
- Do keep App Store editorial materials Apple-first.
- Do preserve forecast and privacy claim boundaries.
- Do not use gradient text, glassmorphism, or glowing card grids.
- Do not publish unattributed testimonials or static upcoming-event claims.
- Do not expose SEO keywords or internal implementation language in the UI.

## 8. Responsive behavior

The principal breakpoint is 900px. Desktop split compositions collapse into a
single reading column below it. At 375px, buttons keep their natural width,
product imagery appears before secondary actions, and all interactive targets
remain at least 44px high. Motion is disabled for reduced-motion users.

## 9. Agent prompt guide

- Hero: canvas `oklch(0.13 0.018 258)`, 12-column grid, 72px/600 headline,
  `-0.022em` tracking, one 9:16 product image, 6px button radius.
- Editorial fact rail: four equal bays, 1px hairlines, 12px uppercase labels,
  16px values, no card shadows.
- Workflow bay: sequence number in brass, 28px/600 title, 16px body, real 9:16
  screenshot, 112px desktop section rhythm.
- Mobile CTA: 48px height, natural width, left aligned, brass fill, 6px radius.
