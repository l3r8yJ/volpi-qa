export enum LoaderSize {
    small,
    medium,
    large
}

export const getLoaderSizeByName = (size: LoaderSize): string => {
    switch (size) {
        case LoaderSize.small:
            return "w-5 h-5"
        case LoaderSize.medium:
            return "w-10 h-10"
        case LoaderSize.large:
            return "w-20 h-20"
        default:
            return "w-5 h-5"
    }
}