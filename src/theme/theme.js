
// Spacing:- Common margins and paddings
const spacing = {
    borderRadius: 16,
    layoutPaddingH: 16,
    containerPaddingV: 22,
    cardMarginB: 16,
};

// Type Sizes:- Font sizes and weights
const typeSizes = {
    FONT_SIZE_SMALL: 12,
    FONT_SIZE_MEDIUM: 14,
    FONT_SIZE_LARGE: 16,
    FONT_WEIGHT_LIGHT: 200,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_HEAVY: 800,
};
const typeVariants = {
    titleLarge: {
        fontFamily: 'Poppins-Bold',
        fontSize: typeSizes.FONT_SIZE_LARGE,
    },
    titleSmall: {
        fontFamily: 'Poppins-Bold',
        fontSize: typeSizes.FONT_SIZE_SMALL,
    },
    bodyMedium: {
        fontFamily: 'Poppins-Regular',
        fontSize: typeSizes.FONT_SIZE_MEDIUM,
    },
    bodySmall: {
        fontFamily: 'Poppins-Regular',
        fontSize: typeSizes.FONT_SIZE_SMALL,
    },
};

// Themes:- Can alter values here. Can only be consumed through Context (see useTheme.js file)
const themes = {
    light: {
        name: 'light',
        color: '#695D5D',
        primary: '#2bbca2',
        layoutBg: '#e0eeec',
        cardBg: '#ffffff',
        cardBorderColor: '#EEECEC',
        accent: '#0071ff',
        error: '#B00020',
    },
    dark: {
        name: 'dark',
        color: '#D1D1D1',       // Lighter text color for dark backgrounds
        primary: '#2bbca2',      // Keeping the primary color the same
        layoutBg: '#121212',     // Dark background for the layout
        cardBg: '#1E1E1E',       // Darker background for cards
        cardBorderColor: '#333333', // Darker card border color for subtle contrast
        accent: '#4a90e2',       // Slightly muted accent color to blend with the dark theme
        error: '#CF6679',        // Softer error color for better readability on dark backgrounds

    },
};

export { spacing, typeSizes, typeVariants, themes };
