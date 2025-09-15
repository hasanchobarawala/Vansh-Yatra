export interface FamilyMember {
  id: string;
  name: string;
  birthYear: string;
  deathYear?: string;
  imageUrl: string;
  imageHint: string;
  story: string;
  spouseId?: string;
  parents: string[];
}
