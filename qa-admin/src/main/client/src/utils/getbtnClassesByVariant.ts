export const getBtnClassesByVariant = (variant: "safe" | "danger" | "default", type: "primary" | "secondary") => {
    if (type === "secondary")
        switch (variant) {
            case "danger":
                return " text-danger-foreground border-danger hover:bg-danger/80 hover:text-btn-foreground hover:border-danger/5"
            case "safe":
                return " text-safe-foreground border-safe hover:bg-safe/80 hover:text-btn-foreground hover:border-safe/5"
            default:
                return " text-accent-foreground border-accent hover:bg-accent/80 hover:text-btn-foreground hover:border-accent/5"
        }

    switch (variant) {
        case "danger":
            return " bg-danger hover:bg-danger/80 border-danger hover:border-danger/5"
        case "safe":
            return " bg-safe hover:bg-safe/80 border-safe hover:border-safe/5"
        default:
            return " bg-accent hover:bg-accent/80 border-accent hover:border-accent/5"
    }
}