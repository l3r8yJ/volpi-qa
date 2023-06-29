import {FC} from "react"

type SkeletonProps = {
    className: string
}

export const Skeleton: FC<SkeletonProps> = ({className}) => {
    return (
        <div className={`bg-skeleton animate-pulse rounded-lg ${className}`}>

        </div>
    );
};