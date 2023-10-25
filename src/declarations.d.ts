declare module "*.jpeg"

declare module "*.png"

declare module "*.svg" {
    const value: import("react-native").ImageSourcePropType;
    export default value;
}

declare module "*.sass" {
    const content: Record<string, string>;
    export default content;
}

declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}