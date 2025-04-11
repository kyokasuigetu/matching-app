export interface OutputCategory {
  [key: string]: OutputSubCategory[];
}

export interface OutputSubCategory {
  id: number; // SubCategoryのID
  name: string; // SubCategoryの名前
}
