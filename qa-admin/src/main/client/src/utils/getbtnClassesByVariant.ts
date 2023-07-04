export const getBtnClassesByVariant = (variant: "safe" | "danger" | "default", type: "primary" | "secondary") => {
    if (type === "secondary")
        switch (variant) {
            case "danger":
                return " text-danger-foreground enabled:hover:bg-danger hover:text-btn-foreground disabled:text-danger-foreground/50 "
            case "safe":
                return " text-safe-foreground enabled:hover:bg-safe hover:text-btn-foreground disabled:text-danger-foreground/50"
            default:
                return " text-accent-foreground enabled:hover:bg-accent hover:text-btn-foreground disabled:text-danger-foreground/50"
        }

    switch (variant) {
        case "danger":
            return " bg-danger hover:bg-danger/80 disabled:bg-danger/50"
        case "safe":
            return " bg-safe hover:bg-safe/80 disabled:bg-safe/50"
        default:
            return " bg-accent hover:bg-accent/80 disabled:bg-accent/50"
    }
}