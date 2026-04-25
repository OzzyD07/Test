# 01-ui-guidelines.md

## Design Direction
Overall style:
Modern / Minimal / Premium / Soft

Emotional tone:
Calm / Trustworthy / Friendly

## Layout Principles
- Prefer clean layouts.
- Use generous spacing.
- Avoid crowded screens.
- Keep important actions visible.
- Keep strong visual hierarchy.
- Prioritize financial clarity over decoration.
- Make income, expense, and balance information easy to scan.
- Keep tab screens consistent with each other.
- Use dashboard cards to separate important financial metrics.
- Use simple empty states for missing transaction data.

## Color Direction
Primary color:
Deep Blue / Indigo

Secondary color:
Soft Green

Background style:
Light

Accent usage:
Accents should be used for financial meaning and important UI feedback:
- Green for income, positive balance, and successful actions.
- Red or coral for expenses, negative values, and warnings.
- Blue or indigo for primary actions, active tabs, and key highlights.
- Neutral gray tones for secondary text, borders, and inactive elements.

Avoid using too many accent colors on the same screen.

## Typography
Heading style:
Large / Bold / Strong

Body text style:
Clean / Soft / High readability

Button text style:
Clear / Short / Action-oriented

Typography rules:
- Use large headings for screen titles and major dashboard values.
- Use medium-weight labels for categories and transaction names.
- Use smaller muted text for dates, descriptions, and secondary metadata.
- Use clear numeric formatting for currency values.
- Avoid overly decorative typography.

## Component Style
Buttons:
- Use rounded buttons with clear action labels.
- Primary buttons should be visually strong and easy to tap.
- Secondary buttons should be lighter but still readable.
- Destructive actions should use warning colors carefully.
- Keep touch targets comfortable for mobile usage.

Cards:
- Use rounded cards with subtle shadows or soft borders.
- Cards should group related financial information clearly.
- Dashboard cards should highlight key values such as balance, income, and expense.
- Transaction cards should show title, category, date, and amount clearly.
- Avoid overly dense cards with too much text.

Inputs:
- Use rounded input fields with clear labels or placeholders.
- Keep form fields readable and easy to complete.
- Show validation or error states clearly.
- Use appropriate keyboard types for amount fields.
- Keep forms visually calm and not overloaded.

Icons:
- Use icons to support meaning, not replace text completely.
- Use consistent icon sizes across tabs, cards, and actions.
- Icons for categories should be simple and easy to recognize.
- Active tab icons should have a clear selected state.

## Screen Behavior
Preferred spacing:
Generous

Preferred corner radius:
Rounded

Preferred shadow usage:
Subtle

Animation preference:
Subtle

Animation rules:
- Use Reanimated for smooth entrance animations, card transitions, list item animations, and feedback states.
- Animations should feel lightweight and useful.
- Avoid slow, distracting, or excessive motion.
- Prefer subtle scale, opacity, and translate animations.
- Keep animations consistent across similar components.

## Do
- Use a clean dashboard with clear income, expense, and balance sections.
- Use consistent spacing, radius, and typography across all screens.
- Use category-based visual indicators for transactions.
- Keep transaction lists easy to scan.
- Make important actions such as adding a transaction easy to find.
- Use meaningful animations to improve perceived quality.
- Keep the interface Expo Go friendly and performant.

## Avoid
- Avoid cluttered dashboards with too many competing elements.
- Avoid using too many colors without financial meaning.
- Avoid complex charts in the first MVP unless explicitly requested.
- Avoid inconsistent card styles across screens.
- Avoid hiding primary actions too deeply.
- Avoid excessive animations that make navigation feel slow.
- Avoid UI patterns that require native-only dependencies.

## References
Reference style examples:
- Modern fintech mobile apps with clean dashboard cards.
- Apple Wallet-style financial clarity and simple hierarchy.
- Notion-style minimal spacing and readable structure.
- Linear-style subtle polish, calm colors, and premium feel.