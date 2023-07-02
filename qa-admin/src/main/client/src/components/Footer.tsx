import {FC} from "react"

export const Footer: FC = () => {
    return (
        <footer className={"bg-primary mt-36 border-t border-border/50"}>
            <div className={"container mx-auto py-3 flex justify-end text-pale-foreground"}>
                Developed by&nbsp;
                <span className={"text-contrast-foreground"}>@Andrew-Sem</span>
                &nbsp;&&nbsp;
                <span className={"text-contrast-foreground"}>@l3r8yJ</span>
            </div>
        </footer>
    );
};