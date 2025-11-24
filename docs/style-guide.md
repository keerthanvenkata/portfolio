# Portfolio Style Guide

This document outlines the complete styling system, color palette, typography, effects, and aesthetic guidelines for the portfolio website. Use this guide to maintain consistency across all future development.

---

## Table of Contents

1. [Aesthetic & Design Philosophy](#aesthetic--design-philosophy) *(For Non-Developers)*
2. [Development Conventions & Quick Reference](#development-conventions--quick-reference) *(For Developers)*
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Backgrounds & Gradients](#backgrounds--gradients)
6. [Layout & Spacing](#layout--spacing)
7. [Borders & Shadows](#borders--shadows)
8. [Effects & Animations](#effects--animations)
9. [Component Styles](#component-styles)
10. [Interactive States](#interactive-states)
11. [Responsive Design](#responsive-design)

---

## Aesthetic & Design Philosophy

*This section describes the visual design and aesthetic in non-technical terms for designers, stakeholders, and anyone who wants to understand the "look and feel" of the portfolio.*

### Overall Visual Identity

The portfolio website embodies a **futuristic, cyberpunk-inspired aesthetic** with a dark, immersive atmosphere. Think of it as a sleek, high-tech interface you might see in a sci-fi film—deep space black backgrounds punctuated by vibrant neon purple and pink accents that create an energetic, cutting-edge feel.

### Professional Bright Mode (Planned)

- **Purpose**: Same content, different skin—clean, high-contrast light UI for recruiters, investors, and resume links.
- **Tone**: Still Keerthan’s voice (informal, friendly), but expressed through warm neutrals, charcoal accents, and measured color pops.
- **Access**: Dark remains default; bright mode will be opt-in via toggle + URL parameter (see `docs/professional_version.md`).
- **Design Pillars**:
  - Matte off-white canvas (`#F5F3EF`) with charcoal typography.
  - Reuse accent colors sparingly (violet/magenta for dividers, CTA outlines).
  - Subtle embossing/glass for cards instead of neon glows.
  - Maintain identical layout, spacing, and content hierarchy to avoid regressions when flipping themes.

### Color Story

#### The Foundation: Deep Space Black
The base of the design is **pure black** (`#000000`), creating a deep, immersive canvas. This isn't just any black—it's the void of space, providing maximum contrast for the vibrant neon accents. The black background ensures that every pop of color truly shines and creates a comfortable viewing experience, especially in low-light environments.

#### The Primary Accent: Neon Purple & Pink
The **signature accent colors are vibrant purple and pink** (magenta), creating a neon-like glow effect throughout the site. These colors work together in gradients to create the site's most distinctive visual elements:

- **Violet** (`#7F00FF`): A bright, electric purple—the primary brand color
- **Magenta** (`#FF00FF`): A vibrant fuchsia/magenta—the secondary accent
- **Electric Pink** (`#FF0080`): A hot pink—used for high-impact elements

These colors are used for:
- **Hero text and main headings**: Large, glowing text with purple-to-pink gradients that immediately draw attention
- **Active navigation items**: The current page is highlighted with a bright purple-to-pink gradient background that spans the full width
- **Primary buttons**: Solid purple-to-magenta gradient backgrounds ("View Projects")
- **Secondary buttons**: Pink/magenta borders with transparent backgrounds ("Get In Touch")
- **Section titles**: Important headings glow with purple/pink gradients
- **Links and interactive text**: "See all →" links, "Open in Spotify" links
- **Hover effects**: Cards and buttons respond with purple/pink glows and borders

These neon colors create a sense of energy, innovation, and cutting-edge technology. They're bold and vibrant, creating a memorable brand identity that stands out.

#### Supporting Colors

**Profound Blue** (`#1E007E`): A deep, rich blue-purple used in background gradients to add depth and atmosphere. It's subtle but present, creating ambient lighting effects.

**Neon Green** (`#39FF14`): Used sparingly for status indicators (like "Live" project badges) and specific accent elements. It provides a bright, energetic contrast to the purple/pink palette.

**Orange** (`#FFA500` range): Used for the "Food" section, creating a warm, inviting contrast to the cool purple/pink tones.

**Gray Scale**: Various shades of gray are used for:
- **Sidebar background**: Dark purple-gray (`bg-profound-blue/90`) with backdrop blur
- **Cards and containers**: Semi-transparent black (`rgba(0, 0, 0, 0.4)`) with glass morphism
- **Text hierarchy**: Light gray for secondary text, white for primary content
- **Borders**: Subtle purple-tinted borders (`border-violet/30`, `border-violet/50`)

### Typography & Text Treatment

#### The Hero Name: Glowing Neon Text
The main name "Venkata Keerthan Nimmala" appears in **very large, glowing text** (`text-7xl md:text-8xl`) with a purple-to-pink-to-electric-pink gradient. This creates a "neon sign" effect—bold, attention-grabbing, and distinctly futuristic. The text has a subtle glow shadow that enhances the neon feel.

#### Font Families
- **Headings**: **Orbitron** - A futuristic, geometric sans-serif that feels tech-forward and modern
- **Body Text**: **Inter** - A clean, readable sans-serif that ensures excellent readability

#### Text Hierarchy
- **Hero/Display**: Very large (`text-7xl` to `text-8xl`), bold, gradient text with glow
- **Section Titles**: Large (`text-2xl` to `text-3xl`), bold, colored or gradient
- **Body Text**: Medium (`text-base` to `text-xl`), clean and readable
- **Metadata**: Small (`text-sm` to `text-xs`), muted gray

### Visual Effects & Atmosphere

#### Neon Glow Effects
The most distinctive visual effect is the **neon glow** on text and interactive elements:
- **Text Glow**: Purple, pink, and magenta text shadows create a luminous effect
- **Box Shadows**: Interactive elements glow with colored shadows on hover
- **Neon Borders**: Cards and containers have animated gradient borders that glow

#### Animated Background
The background features **animated radial gradients** that slowly move and rotate, creating a living, breathing atmosphere. These gradients use purple, magenta, and pink at low opacity, creating ambient lighting that never distracts but always adds depth.

#### Glass Morphism
Cards and containers use a **frosted glass effect** (`glass` class):
- Semi-transparent black background (`rgba(0, 0, 0, 0.4)`)
- Backdrop blur (`backdrop-filter: blur(10px)`)
- Subtle purple borders
- Creates a modern, layered, high-tech feel

#### Smooth Animations
All interactive elements feature **smooth, purposeful animations**:
- Fade-in animations for content (Framer Motion)
- Scale transforms on hover (`hover:scale-105`)
- Color transitions
- Shadow intensity changes
- Nothing feels abrupt—everything flows smoothly

### Layout & Structure

#### Sidebar Navigation
The left sidebar provides clear navigation with a dark purple-tinted background. When a page is active, it's highlighted with a **bright purple-to-pink gradient background** that spans the full width, making it immediately clear where you are. The sidebar uses glass morphism and backdrop blur for a modern, floating effect.

#### Card-Based Content
Content is organized in **cards with rounded corners** (`rounded-xl`) and glowing neon borders. These cards have:
- Glass morphism backgrounds
- Purple/pink gradient borders that glow
- Hover effects that intensify the glow
- Smooth transitions on all interactions

#### Spacious Layout
The design uses **generous spacing** and padding, preventing the interface from feeling cramped. This spaciousness contributes to the premium, high-end feel of the site.

### Design Principles

1. **Dark-First Philosophy**: The design is built for dark mode, creating a comfortable, modern viewing experience (bright/professional mode inherits the same spacing but swaps colors—see professional version doc)
2. **Neon Accents**: Purple and pink create energy and innovation without overwhelming
3. **Atmospheric Depth**: Animated gradients and glows add dimension and prevent flatness
4. **High Contrast**: Bright neon accents on deep black backgrounds ensure excellent readability
5. **Smooth Interactions**: Every interaction feels polished and responsive
6. **Modern Minimalism**: Clean layouts with purposeful use of color and space
7. **Tech-Forward Aesthetic**: The overall feel suggests cutting-edge technology and innovation
8. **Glass Morphism**: Modern frosted glass effects create depth and sophistication

### Emotional Tone

The design conveys:
- **Innovation**: The neon colors and futuristic aesthetic suggest forward-thinking technology
- **Professionalism**: The dark, sophisticated palette and clean layout feel premium
- **Energy**: The vibrant purple/pink accents add excitement and dynamism
- **Sophistication**: The careful use of space, typography, and effects feels refined
- **Modernity**: The overall aesthetic is distinctly contemporary and tech-oriented

### Color Palette Summary (Non-Technical)

- **Primary Background**: Pure black (the foundation)
- **Primary Accents**: Vibrant neon purple (`#7F00FF`), magenta (`#FF00FF`), and electric pink (`#FF0080`)
- **Supporting Colors**: Deep blue-purple for atmosphere, neon green for status, orange for special sections, and a future bright palette (warm neutrals + muted gold) reserved for the professional version
- **Neutrals**: Sophisticated grays and semi-transparent blacks for structure and hierarchy

### When to Use Which Colors

- **Purple/Pink Gradients**: Use for anything that needs to draw attention—headings, active states, primary buttons, important text
- **Electric Pink**: Use for secondary buttons, links, hover states, high-impact elements
- **Dark Backgrounds**: Use for structure—sidebars, cards, containers
- **Gray Text**: Use for secondary information—descriptions, metadata, less important text
- **White Text**: Use for primary content—titles, main body text
- **Neon Glow**: Apply to hero text, section titles, and key interactive elements

---

## Development Conventions & Quick Reference

*This section provides a TL;DR for developers working on the portfolio. It covers conventions, quick reference, and essential patterns to maintain consistency.*

### TL;DR - Core Principles

1. **Colors**: Use `violet`, `magenta`, and `electric-pink` for accents.
2. **Backgrounds**: Pure black (`#000000`) base. Use `.glass` class for cards (semi-transparent with blur).
3. **Typography**: `font-heading` (Orbitron) for headings, default (Inter) for body.
4. **Borders**: Use `.neon-border` for cards. Violet borders at 30-50% opacity.
5. **Animations**: Always include `transition-all duration-300` on interactive elements.
6. **Hover**: Scale (`hover:scale-105`), glow shadows, and color transitions.
7. **Spacing**: Use Tailwind spacing scale. `p-6` for cards, `px-6` for page padding.
8. **Gradients**: `from-violet to-magenta` for primary, `from-violet via-magenta to-electric-pink` for hero.

### Color Conventions

#### Always Use Custom Colors
```tsx
// ✅ CORRECT
className="text-violet bg-gradient-to-r from-violet to-magenta"
className="text-electric-pink border-electric-pink"

// ❌ WRONG - Don't use default Tailwind colors for accents
className="text-cyan-400 bg-blue-500"
```

#### Color Usage Rules
- **Primary Brand**: `violet` (`#7F00FF`) - Use for main brand elements
- **Secondary Accent**: `magenta` (`#FF00FF`) - Use in gradients with violet
- **High Impact**: `electric-pink` (`#FF0080`) - Use for links, secondary buttons, hover states
- **Status**: `neon-green` (`#39FF14`) - Use only for status badges
- **Atmosphere**: `profound-blue` (`#1E007E`) - Use for sidebar, background gradients

#### Opacity Conventions
- **90%**: Sidebar backgrounds (`bg-profound-blue/90`)
- **50%**: Prominent borders (`border-violet/50`)
- **30%**: Standard borders (`border-violet/30`)
- **20%**: Hover backgrounds (`bg-violet/20`, `bg-electric-pink/20`)
- **15%**: Background glows (radial gradients)

### Typography Conventions

#### Font Classes
```tsx
// Headings - Always use Orbitron
<h1 className="font-heading font-bold">Title</h1>

// Body - Default is Inter (no class needed)
<p>Body text</p>
```

#### Text Size Hierarchy
- **Hero**: `text-7xl md:text-8xl` (only for main hero name)
- **Page Titles**: `text-2xl` to `text-3xl`
- **Section Titles**: `text-2xl`
- **Card Titles**: `text-xl` to `text-2xl`
- **Body**: `text-base` to `text-xl`
- **Metadata**: `text-sm` to `text-xs`

#### Gradient Text Pattern
```tsx
// Hero/Display text
className="bg-gradient-to-r from-violet via-magenta to-electric-pink bg-clip-text text-transparent text-glow-purple"

// Section titles
className="bg-gradient-to-r from-violet to-magenta bg-clip-text text-transparent"
```

### Logo Conventions

#### Logo Component
The portfolio uses the `VKLogo` component for the brand logo. It's a circular badge with "VK" initials.

#### Logo Usage
```tsx
import VKLogo from './components/VKLogo'

// In sidebar header
<VKLogo size="lg" />

// In mobile header
<VKLogo size="md" />
```

#### Logo Sizes
- **Small**: `size="sm"` → `w-8 h-8 text-sm` (32px)
- **Medium**: `size="md"` → `w-12 h-12 text-lg` (48px) - Default
- **Large**: `size="lg"` → `w-16 h-16 text-xl` (64px)

#### Logo Styling
**Current Implementation:**
- **Shape**: Circular (`rounded-full`)
- **Background**: Gradient (`bg-gradient-to-br from-cyan-400 to-blue-500`)
- **Text**: White, bold
- **Hover**: `hover:from-cyan-300 hover:to-blue-400`
- **Transition**: `transition-all duration-200`
- **Link**: Wraps in `<Link to="/">` for navigation

**Note**: The logo currently uses cyan-blue gradient. Consider updating to match the purple/pink theme:
```tsx
// Suggested update to match brand colors
className="bg-gradient-to-br from-violet to-magenta hover:from-electric-pink hover:to-magenta"
```

#### Logo Requirements & Guidelines

**Shape Requirement:**
- **MUST be circular** (`rounded-full`) - The logo component and all future logo implementations must maintain a circular shape
- This ensures consistency across the site and works well with the sidebar hover behavior

**Size Requirements:**
- **Small**: 32px × 32px (`w-8 h-8`)
- **Medium**: 48px × 48px (`w-12 h-12`) - Default
- **Large**: 64px × 64px (`w-16 h-16`)

**Design Guidelines:**
- Logo should be **circular only** - no square, rectangular, or other shapes
- Should work well at all three size variants
- Must maintain readability and visual clarity at small sizes
- Should complement the purple/pink color scheme (current cyan-blue can be updated to match brand)

**Implementation Notes:**
- Logo is used in:
  - Sidebar header (large size)
  - Mobile header (medium size)
  - Floating logo when sidebar is collapsed (large size)
- Logo is always clickable and navigates to home page
- Logo should have hover state for visual feedback

**Future Logo Updates:**
- When updating the logo, ensure it:
  1. Maintains circular shape
  2. Works at all three size variants
  3. Matches or complements the purple/pink color scheme
  4. Is accessible (good contrast, readable)
  5. Is optimized for web (SVG preferred, or high-quality PNG)

#### Logo Placement
- **Sidebar**: Centered in header section (`flex justify-center`) - desktop only
- **Mobile Header**: Fixed top bar with logo (left) and hamburger menu toggle (right)
- **Mobile Menu**: Full-screen overlay with close button only (no duplicate logo)

#### Logo Accessibility
- Logo is wrapped in a `<Link>` component for keyboard navigation
- Clicking logo navigates to home page (`/`)
- Hover state provides visual feedback

#### Alternative Logo Components
The codebase includes alternative logo implementations:
- **VKLogoSVG**: SVG version with more control over styling
- **VKLogoImage**: Image-based logo with fallback to CSS version

**Recommendation**: Use `VKLogo` component for consistency unless specific requirements need SVG or image versions.

### Component Patterns

#### Card Pattern
```tsx
<div className="glass rounded-xl p-6 neon-border hover:shadow-[0_0_30px_rgba(255,0,128,0.4)] transition-all">
  {/* Content */}
</div>
```

**Required Classes:**
- `.glass` - Glass morphism effect
- `rounded-xl` - Border radius
- `p-6` - Padding
- `.neon-border` - Gradient border with glow
- `transition-all` - Smooth transitions

#### Primary Button Pattern
```tsx
<button className="px-8 py-4 bg-gradient-to-r from-violet to-magenta rounded-lg font-heading font-semibold text-white hover:shadow-[0_0_30px_rgba(127,0,255,0.5)] transition-all duration-300 transform hover:scale-105">
  Button Text
</button>
```

#### Secondary Button Pattern
```tsx
<button className="px-8 py-4 border-2 border-electric-pink rounded-lg font-heading font-semibold text-electric-pink hover:bg-electric-pink hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]">
  Button Text
</button>
```

#### Link Pattern
```tsx
<a className="text-electric-pink hover:text-magenta transition-colors">
  Link Text
</a>
```

#### Active Navigation Pattern
```tsx
<Link className={`px-4 py-3 rounded-lg transition-all duration-300 ${
  isActive 
    ? 'bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_20px_rgba(127,0,255,0.5)]'
    : 'text-gray-300 hover:bg-violet/20 hover:text-violet hover:shadow-[0_0_10px_rgba(127,0,255,0.3)]'
}`}>
  Nav Item
</Link>
```

### Animation Conventions

#### Always Include Transitions
```tsx
// ✅ CORRECT - Always add transition
className="transition-all duration-300"

// ❌ WRONG - No transition
className="hover:scale-105"
```

#### Standard Animation Pattern
```tsx
// Interactive elements
className="transition-all duration-300 transform hover:scale-105"

// Color changes only
className="transition-colors"

// Transform only
className="transition-transform duration-300"
```

#### Framer Motion Pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {/* Content */}
</motion.div>
```

**Convention**: Use staggered delays (0.2s, 0.4s, 0.6s, etc.) for sequential animations.

### Spacing Conventions

#### Standard Spacing Values
- **Page Padding**: `px-6` (horizontal), `py-12` (standard vertical), `py-20` (hero)
- **Card Padding**: `p-6`
- **Button Padding**: `px-4 py-2` (small), `px-8 py-4` (large)
- **Gap Between Cards**: `gap-6` or `gap-8`
- **Section Margins**: `mb-6` (standard), `mb-16` (large sections), `mb-20` (hero)

#### Container Widths
- **Large**: `max-w-6xl` (homepage, projects)
- **Medium**: `max-w-4xl` (blog, detail pages)
- **Small**: `max-w-3xl` (contact, centered content)

### Border Conventions

#### Always Use Neon Border for Cards
```tsx
// ✅ CORRECT
className="glass rounded-xl p-6 neon-border"

// ❌ WRONG - Don't use plain borders for main cards
className="border border-gray-700"
```

#### Border Opacity Levels
- **Sidebar**: `border-violet/50`
- **Cards**: `.neon-border` class (gradient border)
- **Inputs**: `border-violet/30`
- **Hover**: `border-electric-pink`

### Shadow/Glow Conventions

#### Standard Glow Values
```tsx
// Violet glow (default)
shadow-[0_0_20px_rgba(127,0,255,0.3)]

// Violet glow (intense)
shadow-[0_0_30px_rgba(127,0,255,0.5)]

// Pink glow (hover)
shadow-[0_0_30px_rgba(255,0,128,0.4)]

// Pink glow (intense)
shadow-[0_0_30px_rgba(255,0,128,0.5)]
```

#### Text Glow Classes
- `.text-glow-purple` - For violet text
- `.text-glow-pink` - For pink text
- `.text-glow-magenta` - For magenta text

### Responsive Conventions

#### Breakpoint Usage
- **Mobile First**: Default styles for mobile, add `sm:`, `md:`, or `lg:` for larger screens
- **Sidebar**: `hidden lg:flex` (hidden on mobile, visible on desktop)
- **Text Sizes**: `text-4xl sm:text-5xl md:text-7xl lg:text-8xl` (responsive scaling)
- **Grids**: `grid-cols-2 md:grid-cols-4` (responsive columns)
- **Overflow**: `overflow-x-hidden` on containers to prevent horizontal scrolling

#### Mobile Considerations
- Always account for mobile header: `pt-16 lg:pt-0`
- Use `flex-wrap` for button groups on mobile
- Test touch targets (minimum 44x44px)

### Code Organization

#### Class Order Convention
1. Layout/Display (`flex`, `grid`, `hidden`)
2. Positioning (`relative`, `absolute`, `sticky`)
3. Sizing (`w-`, `h-`, `max-w-`)
4. Spacing (`p-`, `m-`, `gap-`)
5. Typography (`text-`, `font-`)
6. Colors (`bg-`, `text-`, `border-`)
7. Effects (`shadow-`, `backdrop-`, `transition-`)
8. Responsive (`md:`, `lg:`)

#### Example
```tsx
className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-violet to-magenta text-white font-heading font-semibold hover:shadow-[0_0_30px_rgba(127,0,255,0.5)] transition-all duration-300 transform hover:scale-105"
```

### Common Mistakes to Avoid

#### ❌ Don't Do This
```tsx
// Using cyan/blue for primary accents
className="text-cyan-400 bg-blue-500"

// Plain borders on cards
className="border border-gray-700"

// Missing transitions
className="hover:scale-105"

// Wrong font for headings
<h1 className="font-bold">Title</h1> // Missing font-heading

// Inconsistent spacing
className="p-4" // Should be p-6 for cards

// No hover effects on interactive elements
<button className="bg-violet">Click</button>
```

#### ✅ Do This Instead
```tsx
// Use custom colors
className="text-violet bg-gradient-to-r from-violet to-magenta"

// Use neon-border class
className="glass rounded-xl p-6 neon-border"

// Always include transitions
className="transition-all duration-300 hover:scale-105"

// Use font-heading for headings
<h1 className="font-heading font-bold">Title</h1>

// Consistent spacing
className="p-6" // Standard card padding

// Add hover effects
<button className="bg-gradient-to-r from-violet to-magenta hover:shadow-[0_0_30px_rgba(127,0,255,0.5)] transition-all duration-300 transform hover:scale-105">
  Click
</button>
```

### Quick Reference Checklist

When creating a new component, ensure:

- [ ] Uses custom colors (`violet`, `magenta`, `electric-pink`) not default Tailwind
- [ ] Includes `transition-all duration-300` on interactive elements
- [ ] Uses `.glass` class for cards/containers
- [ ] Uses `.neon-border` for card borders
- [ ] Includes hover effects (scale, glow, color change)
- [ ] Uses `font-heading` for headings
- [ ] Follows spacing conventions (`p-6` for cards, `px-6` for pages)
- [ ] Includes responsive classes where needed
- [ ] Uses proper opacity levels (30%, 50%, 90%)
- [ ] Includes appropriate glow shadows on hover

### File Structure Notes

- **Styles**: `frontend/src/styles.css` - Global styles, animations, custom classes
- **Tailwind Config**: `frontend/tailwind.config.ts` - Custom colors, fonts, utilities
- **Components**: `frontend/src/components/` - Reusable components
- **Pages**: `frontend/src/pages/` - Page components

### CSS Variables Reference

Available in `:root`:
```css
--bg: #000000
--profound-blue: #1E007E
--violet: #7F00FF
--magenta: #FF00FF
--electric-pink: #FF0080
--neon-green: #39FF14
--blush-rose: #F0E0E0
```

Use Tailwind classes instead of CSS variables when possible for consistency.

---

## Color Palette

### Primary Colors

#### Base Background
- **Primary Background**: `#000000` (CSS variable: `--bg`)
  - Pure black, serves as the foundation color
  - Used in: `:root` CSS variable, body background base, glass morphism backgrounds

#### Custom Color Palette

**Violet** (Primary Brand Color)
- **Hex**: `#7F00FF` / `rgba(127, 0, 255)`
- **CSS Variable**: `--violet`
- **Tailwind Class**: `violet`, `text-violet`, `bg-violet`, `border-violet`
- **Usage**: 
  - Primary brand color
  - Hero text gradients
  - Active navigation backgrounds
  - Section titles
  - Links and interactive elements
  - Borders and glows

**Magenta** (Secondary Accent)
- **Hex**: `#FF00FF` / `rgba(255, 0, 255)`
- **CSS Variable**: `--magenta`
- **Tailwind Class**: `magenta`, `text-magenta`, `bg-magenta`, `border-magenta`
- **Usage**:
  - Gradient endpoints (violet → magenta)
  - Section titles
  - Hover states
  - Background glows

**Electric Pink** (High-Impact Accent)
- **Hex**: `#FF0080` / `rgba(255, 0, 128)`
- **CSS Variable**: `--electric-pink`
- **Tailwind Class**: `electric-pink`, `text-electric-pink`, `bg-electric-pink`, `border-electric-pink`
- **Usage**:
  - Secondary buttons (borders)
  - Links ("See all →", "Open in Spotify")
  - Hover states
  - Focus states
  - High-impact text
  - Call-to-action elements

**Profound Blue** (Atmospheric Support)
- **Hex**: `#1E007E` / `rgba(30, 0, 126)`
- **CSS Variable**: `--profound-blue`
- **Tailwind Class**: `profound-blue`, `bg-profound-blue`
- **Usage**:
  - Sidebar background (`bg-profound-blue/90`)
  - Background radial gradients
  - Atmospheric depth

**Neon Green** (Status Indicator)
- **Hex**: `#39FF14` / `rgba(57, 255, 20)`
- **CSS Variable**: `--neon-green`
- **Tailwind Class**: `neon-green`, `text-neon-green`, `bg-neon-green`, `border-neon-green`
- **Usage**:
  - Project status badges ("Live", "Active")
  - Status indicators
  - Specific accent elements

**Blush Rose** (Reserved)
- **Hex**: `#F0E0E0` / `rgba(240, 224, 224)`
- **CSS Variable**: `--blush-rose`
- **Tailwind Class**: `blush-rose`
- **Usage**: Reserved for future use

### Gray Scale

- **Gray 900**: `bg-gray-900` / `#111827`
  - Used for: Structural elements (when not using custom colors)

- **Gray 800**: `bg-gray-800` / `#1f2937`
  - Used for: Secondary backgrounds

- **Gray 700**: `bg-gray-700` / `#374151`
  - Used for: Borders, secondary elements

- **Gray 500**: `text-gray-500` / `#6b7280`
  - Used for: Metadata, timestamps, less important text

- **Gray 400**: `text-gray-400` / `#9ca3af`
  - Used for: Secondary text, descriptions, social icons (default state)

- **Gray 300**: `text-gray-300` / `#d1d5db`
  - Used for: Body text, secondary headings

- **Gray 200**: `text-gray-200` / `#e5e7eb`
  - Used for: Input text, form elements

### Special Section Colors

**Orange** (Food Section)
- **Orange 400**: `text-orange-400` / `#fb923c`
- **Orange 900/30**: `bg-orange-900/30` / `rgba(154, 52, 18, 0.3)`
- **Orange 500/30**: `border-orange-500/30` / `rgba(249, 115, 22, 0.3)`
- **Gradient**: `from-orange-900/30 to-red-900/30`
- **Usage**: Food section background and accents

**Purple-Pink** (Music Section)
- **Purple 400**: `text-purple-400` / `#a78bfa`
- **Purple 900/30**: `bg-purple-900/30` / `rgba(88, 28, 135, 0.3)`
- **Purple 500/30**: `border-purple-500/30` / `rgba(168, 85, 247, 0.3)`
- **Gradient**: `from-purple-900/30 to-pink-900/30`
- **Usage**: Music section background and accents

### Text Colors
- **White**: `text-white` / `#ffffff`
  - Used for: Primary headings, card titles, main content, button text

- **Black**: `bg-black` / `#000000`
  - Used for: Base backgrounds, glass morphism overlays

### Color Opacity Variants

Common opacity levels used:
- **90%**: `bg-profound-blue/90` - Sidebar backgrounds
- **50%**: `border-violet/50` - Borders
- **30%**: `border-violet/30`, `bg-violet/20` - Subtle borders and backgrounds
- **20%**: `bg-violet/20`, `bg-electric-pink/20` - Hover states, subtle backgrounds
- **15%**: Radial gradient glows in backgrounds
- **10%**: Very subtle effects

---

## Typography

### Font Families

#### Headings: Orbitron
- **Font Family**: `'Orbitron', sans-serif`
- **CSS Class**: `font-heading`
- **Usage**: All headings (h1, h2, h3, h4, h5, h6)
- **Characteristics**: Futuristic, geometric, tech-forward
- **Fallback**: `sans-serif`

#### Body Text: Inter
- **Font Family**: `'Inter', sans-serif`
- **CSS Class**: `font-body` (default)
- **Usage**: Body text, descriptions, metadata
- **Characteristics**: Clean, readable, modern
- **Fallback**: `sans-serif`

### Font Sizes

#### Display/Hero Text
- **Hero Name**: `text-7xl md:text-8xl` / `4.5rem` to `6rem` / `72px` to `96px`
  - Usage: Main hero title on homepage
  - Style: Bold, gradient text (violet → magenta → electric-pink), with glow

#### Headings
- **H1 (Page Title)**: `text-2xl` to `text-3xl` / `1.5rem` to `1.875rem` / `24px` to `30px`
  - Usage: Page headers in sticky header
  - Style: Bold, colored (violet or magenta), with glow

- **H2**: `text-2xl` / `1.5rem` / `24px`
  - Usage: Section headings
  - Style: Bold, colored or gradient

- **H3**: `text-xl` / `1.25rem` / `20px`
  - Usage: Card titles, blog post titles
  - Style: Bold, white or colored

#### Body Text
- **Large**: `text-2xl` to `text-4xl` / `1.5rem` to `2.25rem` / `24px` to `36px`
  - Usage: Subtitle text (e.g., "SDE Applied AI & Entrepreneur")

- **Medium**: `text-xl` to `text-2xl` / `1.25rem` to `1.5rem` / `20px` to `24px`
  - Usage: Description text, taglines

- **Base**: Default / `1rem` / `16px`
  - Usage: Body text, descriptions

- **Small**: `text-sm` / `0.875rem` / `14px`
  - Usage: Metadata, timestamps, badges, tech tags

- **Extra Small**: `text-xs` / `0.75rem` / `12px`
  - Usage: Footer secondary text, fine print

### Font Weights
- **Bold**: `font-bold` / `700`
  - Usage: Headings, titles, brand name

- **Semibold**: `font-semibold` / `600`
  - Usage: Section headings, card titles, buttons

- **Medium**: `font-medium` / `500`
  - Usage: Navigation items, links

- **Normal**: Default / `400`
  - Usage: Body text, descriptions

### Text Effects

#### Gradient Text
- **Primary Implementation**: `bg-gradient-to-r from-violet via-magenta to-electric-pink bg-clip-text text-transparent`
  - Creates the signature neon purple-to-pink gradient effect
  - **Usage**: Hero name, section titles, prominent headings
  - **Direction**: Left to right (`to-r`)
  - **Effect**: Glowing neon sign aesthetic

- **Violet to Magenta**: `bg-gradient-to-r from-violet to-magenta bg-clip-text text-transparent`
  - **Usage**: Section titles, active navigation text

- **Animated Gradient Text**: `.gradient-text-purple` and `.gradient-text-pink` classes
  - Smooth color shift animation (4s ease-in-out infinite)
  - **Usage**: Special animated text effects

#### Text Glow Effects
- **Purple Glow**: `.text-glow-purple`
  - `text-shadow: 0 0 10px rgba(127, 0, 255, 0.5), 0 0 20px rgba(127, 0, 255, 0.3)`
  - **Usage**: Purple text, headings

- **Pink Glow**: `.text-glow-pink`
  - `text-shadow: 0 0 10px rgba(255, 0, 128, 0.5), 0 0 20px rgba(255, 0, 128, 0.3)`
  - **Usage**: Pink text, call-to-action text

- **Magenta Glow**: `.text-glow-magenta`
  - `text-shadow: 0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)`
  - **Usage**: Magenta text

#### Text Colors by Context
- **Primary Text**: `text-white`
- **Secondary Text**: `text-gray-300`
- **Tertiary Text**: `text-gray-400`
- **Metadata**: `text-gray-500`
- **Links**: `text-electric-pink` or `text-violet`
- **Hover Links**: `hover:text-magenta` or `hover:text-violet`
- **Colored Headings**: `text-violet`, `text-magenta`, `text-electric-pink`

---

## Backgrounds & Gradients

### Main Background

#### Body Background
```css
background: 
  radial-gradient(circle at 20% 30%, rgba(127, 0, 255, 0.15) 0%, transparent 50%),
  radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
  radial-gradient(circle at 50% 50%, rgba(30, 0, 126, 0.2) 0%, transparent 70%),
  var(--bg);
background-attachment: fixed;
```

**Components:**
- **First Radial Gradient**: 
  - Position: `20% 30%` (top-left area)
  - Color: `rgba(127, 0, 255, 0.15)` (violet with 15% opacity)
  - Fade: Transparent at 50%

- **Second Radial Gradient**:
  - Position: `80% 70%` (bottom-right area)
  - Color: `rgba(255, 0, 255, 0.15)` (magenta with 15% opacity)
  - Fade: Transparent at 50%

- **Third Radial Gradient**:
  - Position: `50% 50%` (center)
  - Color: `rgba(30, 0, 126, 0.2)` (profound blue with 20% opacity)
  - Fade: Transparent at 70%

- **Base**: `#000000` (pure black)

**Effect**: Creates subtle ambient lighting with violet, magenta, and blue glows

#### Animated Background Overlay
The `.animated-bg` class creates an animated gradient overlay:
```css
.animated-bg::before {
  background: 
    radial-gradient(circle at 20% 30%, rgba(127, 0, 255, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.15) 0%, transparent 50%);
  animation: gradient 20s ease infinite;
}
```

**Animation**: The gradients slowly move and rotate, creating a living, breathing background effect.

### Component Backgrounds

#### Glass Morphism
- **Class**: `.glass`
- **Background**: `rgba(0, 0, 0, 0.4)` (semi-transparent black)
- **Backdrop Filter**: `blur(10px)`
- **Border**: `1px solid rgba(127, 0, 255, 0.2)` (subtle violet border)
- **Usage**: Cards, containers, modals

#### Sidebar Background
- **Background**: `bg-profound-blue/90` (90% opacity profound blue)
- **Backdrop Blur**: `backdrop-blur-sm`
- **Border**: `border-r border-violet/50`

#### Card Backgrounds
- **Primary Cards**: `.glass` class (semi-transparent black with blur)
- **Nested Cards**: `bg-black/30` (30% opacity black)

### Gradient Backgrounds

#### Primary Gradients

**Violet to Magenta** (Most Common)
- `bg-gradient-to-r from-violet to-magenta`
- **Usage**: Primary buttons, active navigation, filter buttons

**Violet to Magenta to Electric Pink** (Hero Text)
- `bg-gradient-to-r from-violet via-magenta to-electric-pink`
- **Usage**: Hero name, prominent headings

**Hover Gradient Shift**
- `hover:from-electric-pink hover:to-magenta`
- **Usage**: Button hover states

#### Special Section Gradients

**Music Section**:
- `bg-gradient-to-br from-purple-900/30 to-pink-900/30`
- Direction: Bottom-right diagonal
- Colors: Purple to pink (30% opacity)

**Food Section**:
- `bg-gradient-to-br from-orange-900/30 to-red-900/30`
- Direction: Bottom-right diagonal
- Colors: Orange to red (30% opacity)

### Background Image Utilities

**Grid Pattern** (Tailwind Config):
```css
backgroundImage: {
  'grid': "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
}
```
- Creates a grid pattern with 1px white lines at 5% opacity
- Available as `bg-grid` utility class

**Grid Overlay** (CSS):
```css
.grid-overlay {
  background-image: radial-gradient(circle at 1px 1px, rgba(127, 0, 255, 0.1) 1px, transparent 0);
  background-size: 24px 24px;
}
```
- Dotted grid pattern with violet dots
- Available as `.grid-overlay` class

---

## Layout & Spacing

### Container Widths
- **Max Width (Large)**: `max-w-6xl` / `72rem` / `1152px`
  - Usage: Homepage, projects page, resume page

- **Max Width (Medium)**: `max-w-4xl` / `56rem` / `896px`
  - Usage: Blog page, "Outside Code" page, detail pages

- **Max Width (Small)**: `max-w-3xl` / `48rem` / `768px`
  - Usage: Contact page, centered content

### Padding

#### Page Padding
- **Horizontal**: `px-6` / `1.5rem` / `24px`
- **Vertical (Large)**: `py-20` / `5rem` / `80px` (Homepage hero)
- **Vertical (Medium)**: `py-12` / `3rem` / `48px` (Standard pages)
- **Vertical (Small)**: `py-4` / `1rem` / `16px` (Headers, compact sections)

#### Component Padding
- **Cards**: `p-6` / `1.5rem` / `24px`
- **Sidebar Header**: `p-6` / `1.5rem` / `24px`
- **Sidebar Navigation**: `p-4` / `1rem` / `16px`
- **Navigation Items**: `px-4 py-3` / `1rem × 0.75rem` / `16px × 12px`
- **Buttons**: `px-4 py-2` to `px-8 py-4` / `1rem × 0.5rem` to `2rem × 1rem`
- **Badges**: `px-2 py-1` to `px-3 py-1` / `0.5rem × 0.25rem` to `0.75rem × 0.25rem`

### Spacing

#### Gaps
- **Grid Gap (Large)**: `gap-8` / `2rem` / `32px` (Featured content cards)
- **Grid Gap (Medium)**: `gap-6` / `1.5rem` / `24px` (Project cards)
- **Grid Gap (Small)**: `gap-4` / `1rem` / `16px` (Quick links)
- **Flex Gap (Large)**: `gap-4` / `1rem` / `16px` (Button groups)
- **Flex Gap (Medium)**: `gap-3` / `0.75rem` / `12px` (Icons, buttons)
- **Flex Gap (Small)**: `gap-2` / `0.5rem` / `8px` (Tech tags)
- **Vertical Spacing**: `space-y-6` / `1.5rem` / `24px` (Blog posts)
- **Vertical Spacing (Small)**: `space-y-4` / `1rem` / `16px` (Featured posts)
- **Vertical Spacing (Tiny)**: `space-y-1` / `0.25rem` / `4px` (Navigation items)

#### Margins
- **Section Bottom (Large)**: `mb-20` / `5rem` / `80px` (Hero section)
- **Section Bottom (Medium)**: `mb-16` / `4rem` / `64px` (Featured sections)
- **Section Bottom (Standard)**: `mb-6` / `1.5rem` / `24px` (Standard sections)
- **Section Bottom (Small)**: `mb-4` / `1rem` / `16px` (Card headers)
- **Section Bottom (Tiny)**: `mb-3` / `0.75rem` / `12px` (Card elements)
- **Section Bottom (Micro)**: `mb-2` / `0.5rem` / `8px` (Titles)

### Sidebar Dimensions
- **Width**: `w-64` / `16rem` / `256px` (Desktop)
- **Mobile**: Full width overlay (`fixed inset-0`)

---

## Borders & Shadows

### Border Colors

#### Primary Borders
- **Violet 50%**: `border-violet/50` / `rgba(127, 0, 255, 0.5)`
  - Usage: Sidebar right border, prominent borders

- **Violet 30%**: `border-violet/30` / `rgba(127, 0, 255, 0.3)`
  - Usage: Card borders, input borders, default state

- **Violet 20%**: `border-violet/20` / `rgba(127, 0, 255, 0.2)`
  - Usage: Glass morphism borders, subtle borders

#### Accent Borders
- **Electric Pink**: `border-electric-pink` / `#FF0080`
  - Usage: Secondary buttons, focus states, hover states

- **Magenta**: `border-magenta` / `#FF00FF`
  - Usage: Hover states, interactive elements

- **Neon Green**: `border-neon-green` / `#39FF14`
  - Usage: Status badges

- **Purple 500/30**: `border-purple-500/30` / `rgba(168, 85, 247, 0.3)`
  - Usage: Music section cards

- **Orange 500/30**: `border-orange-500/30` / `rgba(249, 115, 22, 0.3)`
  - Usage: Food section cards

### Border Radius

#### Rounded Corners
- **Extra Large**: `rounded-xl` / `0.75rem` / `12px`
  - Usage: Cards, main containers, buttons

- **Large**: `rounded-lg` / `0.5rem` / `8px`
  - Usage: Navigation buttons, filter buttons, nested cards, inputs

- **Full**: `rounded-full` / `9999px`
  - Usage: Badges, tech tags, status indicators, logo

#### Inline Styles
- **Border Radius 12**: `borderRadius: 12` (JavaScript style)
  - Usage: Spotify iframe, embedded content

### Border Width
- **Standard**: `1px` (default)
- **Thick**: `border-2` / `2px`
  - Usage: Secondary buttons, prominent borders

### Neon Border Effect

#### `.neon-border` Class
```css
.neon-border {
  border: 2px solid transparent;
  background: linear-gradient(var(--bg), var(--bg)) padding-box,
              linear-gradient(135deg, #7F00FF, #FF00FF, #FF0080) border-box;
  box-shadow: 0 0 20px rgba(127, 0, 255, 0.3);
}
```

**Components:**
- **Gradient Border**: Violet → Magenta → Electric Pink (135deg diagonal)
- **Default Glow**: `0 0 20px rgba(127, 0, 255, 0.3)` (violet glow)
- **Hover Glow**: `0 0 30px rgba(255, 0, 128, 0.5), 0 0 50px rgba(255, 0, 255, 0.3)` (intensified pink/magenta glow)

**Usage**: Cards, containers, featured sections

### Shadows

#### Box Shadows

**Violet Glow**:
- `shadow-[0_0_20px_rgba(127,0,255,0.3)]` - Default card glow
- `shadow-[0_0_30px_rgba(127,0,255,0.5)]` - Button hover, active states
- `shadow-[0_0_15px_rgba(127,0,255,0.4)]` - Filter buttons

**Pink/Magenta Glow**:
- `shadow-[0_0_30px_rgba(255,0,128,0.5)]` - Electric pink hover
- `shadow-[0_0_15px_rgba(255,0,128,0.4)]` - Link hover
- `shadow-[0_0_10px_rgba(255,0,128,0.3)]` - Focus states

**Combined Glows**:
- `shadow-[0_0_30px_rgba(255,0,128,0.4)]` - Card hover (pink)
- Multiple shadow layers for depth

---

## Effects & Animations

### Backdrop Blur
- **Implementation**: `backdrop-blur-sm` to `backdrop-blur-md`
- **Usage**: 
  - Sticky header (`bg-black/90 backdrop-blur-sm`)
  - Sidebar (`bg-profound-blue/90 backdrop-blur-sm`)
  - Footer (`bg-black/80 backdrop-blur-sm`)
- **Effect**: Creates frosted glass effect

### Transitions

#### Standard Transitions
- **All Properties**: `transition-all duration-300`
  - Usage: Cards, buttons, interactive elements
  - Duration: 300ms (0.3s)

- **Colors**: `transition-colors`
  - Usage: Links, hover states
  - Duration: Default (150ms)

- **Transform**: `transition-transform`
  - Usage: Scale effects, icon animations
  - Duration: Default or 300ms

#### Transition Examples
- **Navigation Hover**: `hover:bg-violet/20 hover:text-violet hover:shadow-[0_0_10px_rgba(127,0,255,0.3)]`
- **Link Hover**: `hover:text-magenta` or `hover:text-electric-pink`
- **Card Hover**: `hover:shadow-[0_0_30px_rgba(255,0,128,0.4)]`
- **Button Hover**: `hover:scale-105 hover:shadow-[0_0_30px_rgba(127,0,255,0.5)]`
- **Icon Hover**: `hover:scale-110` or `hover:scale-110 transform`

### Framer Motion Animations

**Library**: `framer-motion` (v11.3.31)

#### Hero Title Animation
```tsx
<motion.h1 
  initial={{ opacity: 0, scale: 0.9 }} 
  animate={{ opacity: 1, scale: 1 }} 
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

**Properties:**
- **Initial State**: 
  - `opacity: 0` (invisible)
  - `scale: 0.9` (slightly smaller)
- **Animate To**:
  - `opacity: 1` (fully visible)
  - `scale: 1` (full size)
- **Transition**: `duration: 0.8` seconds, `delay: 0.2` seconds
- **Effect**: Fade in with scale-up

#### Staggered Content Animation
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 1.2 }}
>
```

**Properties:**
- **Initial State**: 
  - `opacity: 0` (invisible)
  - `x: -20` (20px to the left)
- **Animate To**:
  - `opacity: 1` (fully visible)
  - `x: 0` (final position)
- **Effect**: Fade in with slide from left

**Usage**: Featured content cards, sections with staggered delays

### CSS Animations

#### Gradient Animation
```css
@keyframes gradient {
  0%, 100% { transform: translate(0%, 0%) rotate(0deg); }
  33% { transform: translate(-10%, -10%) rotate(120deg); }
  66% { transform: translate(10%, 10%) rotate(240deg); }
}
```

**Properties:**
- **Duration**: `20s`
- **Timing**: `ease`
- **Iteration**: `infinite`
- **Effect**: Slow, smooth movement and rotation of background gradients

**Usage**: Animated background overlay (`.animated-bg::before`)

#### Gradient Text Shift
```css
@keyframes gradient-text-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Properties:**
- **Duration**: `4s`
- **Timing**: `ease-in-out`
- **Iteration**: `infinite`
- **Effect**: Smooth color shift in gradient text

**Usage**: `.gradient-text-purple` and `.gradient-text-pink` classes

### Transform Effects

#### Scale Transforms
- **Hover Scale**: `hover:scale-105` (5% larger)
  - Usage: Buttons, cards, interactive elements

- **Icon Scale**: `hover:scale-110` (10% larger)
  - Usage: Icons, social links

- **Group Hover Scale**: `group-hover:scale-110`
  - Usage: Icons within hoverable containers

### Glow Effects

#### Text Glow
- **Purple Glow**: `.text-glow-purple`
  - `text-shadow: 0 0 10px rgba(127, 0, 255, 0.5), 0 0 20px rgba(127, 0, 255, 0.3)`

- **Pink Glow**: `.text-glow-pink`
  - `text-shadow: 0 0 10px rgba(255, 0, 128, 0.5), 0 0 20px rgba(255, 0, 128, 0.3)`

- **Magenta Glow**: `.text-glow-magenta`
  - `text-shadow: 0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)`

#### Box Shadow Glows
- **Violet Glow**: `0 0 20px rgba(127, 0, 255, 0.3)` to `0 0 30px rgba(127, 0, 255, 0.5)`
- **Pink Glow**: `0 0 30px rgba(255, 0, 128, 0.5)`
- **Magenta Glow**: `0 0 50px rgba(255, 0, 255, 0.3)`
- **Combined**: Multiple shadow layers for depth

### Visual Effects Summary

**Current Effects:**
1. ✅ Gradient text (violet → magenta → electric pink)
2. ✅ Animated radial gradient background
3. ✅ Backdrop blur (glass morphism)
4. ✅ Smooth transitions (colors, transforms, shadows)
5. ✅ Fade-in animations (Framer Motion)
6. ✅ Hover state transformations (scale, glow, color)
7. ✅ Neon border effects (gradient borders with glow)
8. ✅ Text glow effects (purple, pink, magenta)
9. ✅ Box shadow glows (violet, pink, magenta)

---

## Component Styles

### Sidebar

#### Structure
- **Background**: `bg-profound-blue/90 backdrop-blur-sm`
- **Border**: `border-r border-violet/50`
- **Layout**: Flex column
- **Width**: `w-64` (256px)

#### Logo/Brand Header
- **Padding**: `p-6`
- **Border**: `border-b border-violet/30`
- **Layout**: `flex justify-center`
- **Logo**: VKLogo component with gradient background

#### Navigation Items
- **Container**: `p-4`, `space-y-1`
- **Item Style**: 
  - Default: `text-gray-300 hover:bg-violet/20 hover:text-violet hover:shadow-[0_0_10px_rgba(127,0,255,0.3)]`
  - Active: `bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_20px_rgba(127,0,255,0.5)]`
- **Padding**: `px-4 py-3`
- **Border Radius**: `rounded-lg`
- **Icon Size**: `20px`
- **Transition**: `transition-all duration-300`
- **Font**: `font-medium`

#### Footer (Social Links)
- **Border**: `border-t border-violet/30`
- **Padding**: `p-4`
- **Layout**: Flex center, `gap-3`
- **Icon Style**: 
  - Default: `text-gray-400`
  - Hover: `hover:text-violet` or `hover:text-electric-pink`
  - Transform: `hover:scale-110 transform duration-300`
- **Icon Size**: `20px`

### Cards

#### Primary Cards (Glass Morphism)
- **Class**: `.glass`
- **Background**: `rgba(0, 0, 0, 0.4)` with `backdrop-filter: blur(10px)`
- **Border**: `.neon-border` (gradient border with glow)
- **Border Radius**: `rounded-xl`
- **Padding**: `p-6`
- **Hover**: `hover:shadow-[0_0_30px_rgba(255,0,128,0.4)] transition-all`
- **Spacing**: `space-y-6` (between cards)

#### Nested Cards
- **Background**: `bg-black/30`
- **Border**: `border border-violet/30` or `border-electric-pink`
- **Border Radius**: `rounded-lg`
- **Padding**: `p-4`
- **Hover**: `hover:border-electric-pink transition-all duration-300`

### Buttons

#### Primary Buttons
- **Background**: `bg-gradient-to-r from-violet to-magenta`
- **Text**: `text-white`
- **Padding**: `px-8 py-4`
- **Border Radius**: `rounded-lg`
- **Font**: `font-heading font-semibold`
- **Hover**: 
  - `hover:shadow-[0_0_30px_rgba(127,0,255,0.5)]`
  - `hover:scale-105`
  - `transition-all duration-300`
- **Transform**: `transform`

#### Secondary Buttons
- **Background**: Transparent
- **Border**: `border-2 border-electric-pink`
- **Text**: `text-electric-pink`
- **Padding**: `px-8 py-4`
- **Border Radius**: `rounded-lg`
- **Font**: `font-heading font-semibold`
- **Hover**: 
  - `hover:bg-electric-pink hover:text-black`
  - `hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]`
  - `hover:scale-105`
  - `transition-all duration-300`

#### Action Buttons (Quick Preview, View Details)
- **Background**: `bg-gradient-to-r from-violet to-magenta`
- **Text**: `text-white`
- **Padding**: `px-4 py-2`
- **Border Radius**: `rounded-lg`
- **Hover**: 
  - `hover:from-electric-pink hover:to-magenta`
  - `hover:shadow-[0_0_20px_rgba(127,0,255,0.5)]`
  - `hover:scale-105`
  - `transform`

#### Outline Buttons
- **Background**: Transparent
- **Border**: `border border-electric-pink` or `border-violet`
- **Text**: `text-electric-pink` or `text-violet`
- **Padding**: `px-4 py-2`
- **Border Radius**: `rounded-lg`
- **Hover**: 
  - `hover:border-magenta`
  - `hover:text-magenta`
  - `hover:shadow-[0_0_15px_rgba(255,0,128,0.4)]`
  - `hover:scale-105`

### Hero & Portrait

- **Layout**: `flex flex-col lg:flex-row lg:items-center lg:gap-12`. Text column stays `flex-1`; portrait column is `hidden lg:flex flex-shrink-0`.
- **Portrait Slot**:
  - Wrapper: `relative w-full flex items-center justify-center lg:max-w-[450px]`.
  - Image: `max-h-[650px] object-contain`.
  - Default asset `13.png` (new illustrated full body). Alternates: `19.png` (legacy full body), `3.png` (till thigh), `5.jpeg` (half body). Update the `PORTRAIT_IMAGE` constant in `HomePage` to switch.
  - Glow stack:
    ```
    drop-shadow(0 0 20px rgba(127, 0, 255, 0.45))
    drop-shadow(0 0 40px rgba(255, 0, 128, 0.4))
    drop-shadow(0 0 60px rgba(255, 90, 0, 0.35))
    drop-shadow(0 0 110px rgba(255, 120, 0, 0.15))
    ```
  - Use transparent PNGs to keep the animated background visible (JPEGs will display checkerboards).
- **Text Column**: `text-center lg:text-left space-y-6`, hero gradient h1 (`text-4xl sm:text-5xl md:text-7xl lg:text-8xl`) plus subtitle/body copy and CTA buttons following patterns above.

### Badges & Tags

#### Tech Tags
- **Background**: `bg-violet/20`
- **Text**: `text-violet`
- **Padding**: `px-2 py-1` to `px-3 py-1`
- **Border Radius**: `rounded` or `rounded-full`
- **Size**: `text-xs` to `text-sm`

#### Category Badges
- **Background**: `bg-electric-pink/20`
- **Text**: `text-electric-pink`
- **Border**: `border border-electric-pink/30`
- **Padding**: `px-3 py-1`
- **Border Radius**: `rounded-full`
- **Size**: `text-sm`

#### Status Badges
- **Background**: `bg-neon-green/20`
- **Text**: `text-neon-green`
- **Border**: `border border-neon-green/30`
- **Padding**: `px-3 py-1`
- **Border Radius**: `rounded-full`
- **Size**: `text-sm`

### Input Fields

#### Search/Text Inputs
- **Background**: `bg-black/40`
- **Border**: `border border-violet/30`
- **Border Radius**: `rounded-lg`
- **Padding**: `px-4 py-2`
- **Text**: `text-gray-200`
- **Placeholder**: `placeholder-gray-500`
- **Focus**: 
  - `focus:outline-none`
  - `focus:border-electric-pink`
  - `focus:shadow-[0_0_10px_rgba(255,0,128,0.3)]`
  - `transition-all`

### Header

#### Sticky Header
- **Background**: `bg-black/90 backdrop-blur-sm`
- **Border**: `border-b border-violet/50`
- **Position**: `sticky top-0 z-30`
- **Padding**: `px-6 py-4`
- **Text**: `text-2xl font-heading font-bold text-violet text-glow-purple`

#### Mobile Header
- **Background**: `bg-black/90 backdrop-blur-sm`
- **Border**: `border-b border-violet/30`
- **Position**: `fixed top-0 left-0 right-0 z-40`
- **Padding**: `px-4 py-3`
- **Layout**: Flex justify-between

### Footer

#### Main Footer
- **Background**: `bg-black/80 backdrop-blur-sm`
- **Border**: `border-t border-violet/30`
- **Padding**: `py-6 px-6`
- **Text**: `text-gray-400 text-sm` (primary), `text-gray-500 text-xs` (secondary)
- **Layout**: Centered, `max-w-6xl mx-auto`
- **Z-index**: `relative z-10`

### Special Sections

#### Music Section
- **Background**: `bg-gradient-to-br from-purple-900/30 to-pink-900/30`
- **Border**: `border border-purple-500/30`
- **Padding**: `p-8`
- **Border Radius**: `rounded-xl`
- **Icon**: `text-purple-400`, size `28px`

#### Food Section
- **Background**: `bg-gradient-to-br from-orange-900/30 to-red-900/30`
- **Border**: `border border-orange-500/30`
- **Padding**: `p-8`
- **Border Radius**: `rounded-xl`
- **Icon**: `text-orange-400`, size `28px`

#### Embedded Content (Spotify)
- **Container**: `aspect-video bg-black rounded-lg overflow-hidden`
- **Iframe**: `borderRadius: 12` (inline style)

### Quick Links Section

#### Quick Link Cards
- **Class**: `.glass`
- **Border Radius**: `rounded-xl`
- **Padding**: `p-6`
- **Layout**: `text-center`
- **Hover**: 
  - `hover:scale-105`
  - `transition-all duration-300`
  - Border color changes based on section
- **Icon Size**: `32px`
- **Icon Hover**: `group-hover:scale-110 transition-transform`

---

## Interactive States

### Hover States

#### Navigation
- **Item**: 
  - `hover:bg-violet/20`
  - `hover:text-violet`
  - `hover:shadow-[0_0_10px_rgba(127,0,255,0.3)]`
- **Link**: `hover:text-magenta` or `hover:text-electric-pink`
- **Social Icon**: 
  - `hover:text-violet` or `hover:text-electric-pink`
  - `hover:scale-110 transform duration-300`

#### Cards
- **Border**: `hover:border-electric-pink`
- **Shadow**: `hover:shadow-[0_0_30px_rgba(255,0,128,0.4)]`
- **Text**: `group-hover:text-electric-pink`
- **Transition**: `transition-all duration-300`

#### Buttons
- **Primary**: 
  - `hover:shadow-[0_0_30px_rgba(127,0,255,0.5)]`
  - `hover:scale-105`
  - `hover:from-electric-pink hover:to-magenta` (gradient shift)
- **Secondary**: 
  - `hover:bg-electric-pink hover:text-black`
  - `hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]`
  - `hover:scale-105`

#### Input Fields
- **Focus**: 
  - `focus:border-electric-pink`
  - `focus:shadow-[0_0_10px_rgba(255,0,128,0.3)]`

### Active States

#### Navigation
- **Active Item**: 
  - `bg-gradient-to-r from-violet to-magenta`
  - `text-white`
  - `shadow-[0_0_20px_rgba(127,0,255,0.5)]`

#### Filter Buttons
- **Active**: 
  - `bg-gradient-to-r from-violet to-magenta`
  - `text-white`
  - `shadow-[0_0_15px_rgba(127,0,255,0.4)]`

### Focus States

#### Focus Visible
```css
:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 2px;
}
```

**Note**: Current focus uses cyan (`#22d3ee`), but should ideally match the purple/pink theme. Consider updating to `electric-pink` or `violet`.

#### Input Focus
- **Border**: `focus:border-electric-pink`
- **Shadow**: `focus:shadow-[0_0_10px_rgba(255,0,128,0.3)]`
- **Outline**: `focus:outline-none` (removes default outline)

### Disabled States

**Note**: No disabled states currently implemented. Consider adding:
- Reduced opacity
- Grayed out colors
- Cursor not-allowed

---

## Responsive Design

### Breakpoints

#### Large (Desktop)
- **Breakpoint**: `lg:` prefix (1024px+)
- **Sidebar**: Visible (`hidden lg:flex`) - hover-based expansion
- **Mobile Menu**: Hidden
- **Header**: Desktop header visible (`hidden lg:block`)

#### Medium (Tablet)
- **Breakpoint**: `md:` prefix (768px+)
- **Grid**: 2 columns (`md:grid-cols-2`)
- **Text**: Responsive sizes (`md:text-7xl`, `md:text-4xl`, `md:text-2xl`)

#### Small (Mobile)
- **Breakpoint**: `sm:` prefix (640px+)
- **Text**: Intermediate sizes (`sm:text-5xl`, `sm:text-2xl`, `sm:text-xl`)

#### Mobile (Phone)
- **Breakpoint**: Below `lg` (< 1024px)
- **Sidebar**: Hidden, replaced with mobile hamburger menu
- **Mobile Menu**: Full-screen overlay (`fixed inset-0 z-50`)
- **Header**: Fixed top bar with logo and hamburger toggle (`lg:hidden fixed z-50`)

### Responsive Utilities

#### Visibility
- **Desktop Only**: `hidden lg:flex` or `hidden lg:block`
- **Mobile Only**: `lg:hidden`

#### Spacing Adjustments
- **Top Padding**: `pt-16 lg:pt-0` (accounts for mobile header)
- **Horizontal Padding**: `px-4 sm:px-6` (smaller on mobile)
- **Vertical Padding**: `py-12 sm:py-16 md:py-20` (responsive vertical spacing)

#### Layout
- **Flex Direction**: Responsive flex layouts (`flex-col sm:flex-row`)
- **Grid**: Responsive grid for cards (`grid-cols-2 md:grid-cols-4`)
- **Overflow**: `overflow-x-hidden` on containers to prevent horizontal scrolling

#### Text Sizes
- **Hero Title**: `text-4xl sm:text-5xl md:text-7xl lg:text-8xl`
- **Section Titles**: `text-xl sm:text-2xl md:text-4xl`
- **Body Text**: `text-lg sm:text-xl md:text-2xl`

### Mobile-Specific Styles

#### Mobile Header
- Fixed position, full width (`fixed top-0 left-0 right-0`)
- Logo (left) + hamburger menu toggle (right)
- Z-index: `z-50` (above content, below modals)
- Background: `bg-black/90 backdrop-blur-sm`
- Border: `border-b border-violet/30`
- Padding: `px-4 py-3`

#### Mobile Menu
- Full-screen overlay (`fixed inset-0 z-50`)
- Background: `bg-profound-blue/90 backdrop-blur-sm` (matches desktop sidebar)
- Flexbox layout (`flex flex-col`)
- Close button in header (right-aligned)
- Sidebar component fills remaining space (`flex-1 overflow-hidden`)
- Body scroll locked when open

#### Mobile Navigation
- Touch targets: Minimum `44×44px` (`min-h-[44px] min-w-[44px]`)
- Navigation items: `px-4 py-3` with `min-h-[44px]`
- Social icons: `size={24}` with `p-3` padding for adequate touch area
- Active states: `active:bg-violet/30` for touch feedback
- Focus states: `focus-visible:outline` for accessibility

### Responsive Patterns

#### Grid Layouts
```tsx
// 2 columns on mobile, 4 on desktop
className="grid grid-cols-2 md:grid-cols-4 gap-4"

// 1 column on mobile, 2 on desktop
className="grid md:grid-cols-2 gap-8"
```

#### Text Responsiveness
```tsx
// Hero text: smaller on mobile, larger on desktop
className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl"

// Section titles: responsive sizing
className="text-xl sm:text-2xl md:text-4xl"

// Body text: responsive sizing
className="text-lg sm:text-xl md:text-2xl"
```

#### Button Groups
```tsx
// Stack on mobile, row on desktop
className="flex flex-col md:flex-row gap-4"
```

---

## Quick Reference

### Color Swatches

```
Primary Background: #000000
Violet:            #7F00FF  ⭐ PRIMARY BRAND
Magenta:           #FF00FF  ⭐ PRIMARY ACCENT
Electric Pink:     #FF0080  ⭐ HIGH-IMPACT
Profound Blue:     #1E007E  (Atmospheric)
Neon Green:        #39FF14  (Status)
```

### Common Class Combinations

**Gradient Text (Hero)**:
```tsx
className="bg-gradient-to-r from-violet via-magenta to-electric-pink bg-clip-text text-transparent text-glow-purple"
```

**Primary Button**:
```tsx
className="px-8 py-4 bg-gradient-to-r from-violet to-magenta rounded-lg font-heading font-semibold text-white hover:shadow-[0_0_30px_rgba(127,0,255,0.5)] transition-all duration-300 transform hover:scale-105"
```

**Secondary Button**:
```tsx
className="px-8 py-4 border-2 border-electric-pink rounded-lg font-heading font-semibold text-electric-pink hover:bg-electric-pink hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]"
```

**Card Style**:
```tsx
className="glass rounded-xl p-6 neon-border hover:shadow-[0_0_30px_rgba(255,0,128,0.4)] transition-all"
```

**Active Navigation**:
```tsx
className="bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_20px_rgba(127,0,255,0.5)]"
```

**Link Style**:
```tsx
className="text-electric-pink hover:text-magenta transition-colors"
```

**Badge Style**:
```tsx
className="px-3 py-1 rounded-full text-sm bg-electric-pink/20 text-electric-pink border border-electric-pink/30"
```

---

## Version History

- **2025-01-XX**: Initial style guide creation
  - Documented current styling system based on latest codebase
  - Extracted colors, typography, effects, and components
  - Established design principles and guidelines

---

**Last Updated**: 2025-01-XX  
**Maintained By**: Keerthan Venkata 
**Purpose**: Ensure consistent styling across portfolio website


