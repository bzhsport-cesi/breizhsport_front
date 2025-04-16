// COMPONENTS //

export interface IAttribute {
    value: string,
    name: string
}

export interface IVariant {
    sku: string,
    price: number,
    stock: number,
    attributes: IAttribute[],
    images: IStrapiImage[]
}

// BASIC COLLECTIONS //

export interface IProduct {
    id: number,
    documentId: string,
    name: string,
    slug: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    locale: string | null,
}

export interface ICategory {
    id: number,
    documentId: string,
    name: string,
    description: string,
    slug: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    locale: string | null
    depth: number
}

export interface IUser {
    id: number,
    documentId: string,
    email: string,
    username: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    publishedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

// EXTENTED COLLECTIONS //

export interface IExtendedCategory extends ICategory {
    products: IProduct[]
}

export interface IExtendedProduct extends IProduct {
    defaultVariant: IVariant,
    variants: IVariant[],
    category: ICategory,
}


// STRAPI API TYPES //

export interface IStrapiAPIResponse<T> {
    data: T[],
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

// STRAPI TYPES //
export interface IStrapiImage {
    id: number,
    documentId: string,
    name: string,
    alternativeText: string | null,
    caption: string | null,
    width: number,
    height: number,
    formats: {
        thumbnail: {
            name: string,
            hash: string,
            ext: string,
            mime: string,
            path: string | null,
            width: number,
            height: number,
            size: number,
            sizeInBytes: number,
            url: string,
        },
        medium: {
            name: string,
            hash: string,
            ext: string,
            mime: string,
            path: string | null,
            width: number,
            height: number,
            size: number,
            sizeInBytes: number,
            url: string
        },
        small: {
            name: string,
            hash: string,
            ext: string,
            mime: string
            path: string | null,
            width: number,
            height: number,
            size: number,
            sizeInBytes: number,
            url: string,
        }
    },
    hash: string,
    ext: string,
    mime: string,
    size: number,
    url: string,
    previewUrl: string | null,
    provider: string,
    provider_metadata: string | null,
    folderPath: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    locale: string | null,
}