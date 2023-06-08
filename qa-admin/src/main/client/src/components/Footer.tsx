import {FC} from "react"

export const Footer: FC = () => {
    return (
        <footer className={"bg-pale/5 mt-28 border-t border-base/50"}>
            <div className={"container mx-auto py-3 flex justify-end text-pale"}>
                Developed by&nbsp;
                <span className={"text-contrast"}>@Andrew-Sem</span>
                &nbsp;&&nbsp;
                <span className={"text-contrast"}>@l3r8yJ</span>
            </div>
        </footer>
    );
};