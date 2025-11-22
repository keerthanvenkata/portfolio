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

1. **Dark-First Philosophy**: The design is built for dark mode, creating a comfortable, modern viewing experience
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
- **Supporting Colors**: Deep blue-purple for atmosphere, neon green for status, orange for special sections
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

#### Logo Placement
- **Sidebar**: Centered in header section (`flex justify-center`)
- **Mobile Header**: Left side with menu toggle on right
- **Mobile Menu**: Same placement as mobile header

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
- **Mobile First**: Default styles for mobile, add `md:` or `lg:` for larger screens
- **Sidebar**: `hidden lg:flex` (hidden on mobile, visible on desktop)
- **Text Sizes**: `text-7xl md:text-8xl` (responsive scaling)
- **Grids**: `grid-cols-2 md:grid-cols-4` (responsive columns)

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

*[Continue with Backgrounds & Gradients section in next update]*


