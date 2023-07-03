export const getBtnClassesByVariant = (variant: "safe" | "danger" | "default", type: "primary" | "secondary") => {
    if (type === "secondary")
        switch (variant) {
            case "danger":
                return " text-danger-foreground hover:bg-danger hover:text-btn-foreground"
            case "safe":
                return " text-safe-foreground hover:bg-safe hover:text-btn-foreground"
            default:
                return " text-accent-foreground hover:bg-accent hover:text-btn-foreground"
        }

    switch (variant) {
        case "danger":
            return " bg-danger hover:bg-danger/80"
        case "safe":
            return " bg-safe hover:bg-safe/80"
        default:
            return " bg-accent hover:bg-accent/80"
    }
}