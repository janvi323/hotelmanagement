const shadcnConfig = {
    darkMode: ["class"],
    content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  
  module.exports = {
    darkMode: shadcnConfig.darkMode,
    content: ["./index.html", "./**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}", ...shadcnConfig.content],
    theme: {
      ...shadcnConfig.theme,
      extend: {
        ...shadcnConfig.theme.extend,
        colors: {
          ...shadcnConfig.theme.extend.colors,
          red: {
            700: "#B91C1C",
            800: "#991B1B",
            900: "#7F1D1D",
          },
          orange: {
            600: "#EA580C",
          },
          yellow: {
            200: "#FEF08A",
            500: "#EAB308",
            600: "#CA8A04",
          },
          blue: {
            800: "#1E40AF",
          },
          sidebar: {
            DEFAULT: "hsl(var(--sidebar-background))",
            foreground: "hsl(var(--sidebar-foreground))",
            primary: "hsl(var(--sidebar-primary))",
            "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
            accent: "hsl(var(--sidebar-accent))",
            "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
            border: "hsl(var(--sidebar-border))",
            ring: "hsl(var(--sidebar-ring))",
          },
          // Indian flag inspired colors
          saffron: "#FF9933",
          "white-india": "#FFFFFF",
          "green-india": "#138808",
          "navy-india": "#000080",
          "chakra-blue": "#000080",
        },
        fontFamily: {
          sans: ["Poppins", "sans-serif"],
        },
        backgroundImage: {
          "hero-pattern": "url('/placeholder.svg?height=400&width=1200')",
          "indian-pattern":
            "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C40.493 5 49 13.507 49 24C49 34.493 40.493 43 30 43C19.507 43 11 34.493 11 24C11 13.507 19.507 5 30 5ZM30 0C17.85 0 8 9.85 8 22C8 34.15 17.85 44 30 44C42.15 44 52 34.15 52 22C52 9.85 42.15 0 30 0Z' fill='%23D97706' fill-opacity='0.1'/%3E%3C/svg%3E')",
        },
        boxShadow: {
          custom: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: [...shadcnConfig.plugins],
  }
  
  