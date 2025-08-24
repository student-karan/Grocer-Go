export type ResponseType = {
    status: number,
    message: string
}
export type CloudinaryParams = {
    folder: string;
    allowedFormat: string[];
    resource_type?: string;
    public_id?: (req: any, file: any) => string;
}
export type productinStock = {
    inStock: boolean
}
